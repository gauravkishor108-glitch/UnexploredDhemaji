import React, { createContext, useContext, useState, useEffect } from 'react';
import { CultureItem } from '../types/culture';
import { INITIAL_CULTURE } from '../data/initialCulture';
import { db } from '../firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs
} from 'firebase/firestore';

interface CultureContextType {
  cultureItems: CultureItem[];
  approvedCultureItems: CultureItem[];
  pendingCultureItems: CultureItem[];
  rejectedCultureItems: CultureItem[];
  userCultureSubmissions: CultureItem[];
  isLoadingCulture: boolean;
  addCultureItem: (
    itemData: Omit<CultureItem, 'id' | 'createdAt' | 'status'>
  ) => Promise<{ success: boolean; id?: string; error?: string }>;
  updateCultureStatus: (cultureId: string, status: 'approved' | 'rejected') => Promise<boolean>;
  updateCultureItem: (
    cultureId: string,
    updatedFields: Partial<CultureItem>
  ) => Promise<{ success: boolean; error?: string }>;
  deleteCultureItem: (cultureId: string) => Promise<boolean>;
  deleteCultureImage: (cultureId: string, imageIndex: number) => Promise<boolean>;
  getCultureById: (id: string) => CultureItem | undefined;
}

const CultureContext = createContext<CultureContextType | undefined>(undefined);

// Helper to seed initial items directly to Firestore if collection is empty
const seedCultureToFirestore = async () => {
  try {
    for (const item of INITIAL_CULTURE) {
      const docRef = doc(db, 'culture', item.id);
      await setDoc(docRef, {
        title: item.title,
        category: item.category,
        description: item.description,
        images: item.images,
        coverImage: item.coverImage,
        community: item.community,
        villageOrArea: item.villageOrArea,
        language: item.language || '',
        latitude: item.latitude,
        longitude: item.longitude,
        history: item.history || '',
        significance: item.significance || '',
        howPracticed: item.howPracticed || '',
        relatedFestivals: item.relatedFestivals || [],
        videoUrl: item.videoUrl || '',
        contributorId: item.contributorId || 'official_culture',
        contributorName: item.contributorName || 'Dhemaji District Cultural Affairs',
        contributorEmail: item.contributorEmail || 'culture@dhemaji.gov.in',
        createdAt: item.createdAt || new Date().toISOString(),
        status: 'approved'
      });
    }
  } catch (err) {
    console.warn('[CultureContext] Auto-seed warning:', err);
  }
};

export const CultureProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Direct Firestore state: no stale local storage or mock arrays overriding Firestore
  const [cultureItems, setCultureItems] = useState<CultureItem[]>([]);
  const [isLoadingCulture, setIsLoadingCulture] = useState<boolean>(true);

  // Derived filtered lists based directly on live Firestore status
  const approvedCultureItems = cultureItems.filter(c => c.status === 'approved');
  const pendingCultureItems = cultureItems.filter(c => c.status === 'pending');
  const rejectedCultureItems = cultureItems.filter(c => c.status === 'rejected');
  const userCultureSubmissions = cultureItems.filter(
    c => c.contributorId && c.contributorId !== 'official_culture'
  );

  // Real-time Firestore synchronization using onSnapshot()
  useEffect(() => {
    let unsubscribe = () => {};

    try {
      const cultureCollection = collection(db, 'culture');

      unsubscribe = onSnapshot(
        cultureCollection,
        (snapshot) => {
          if (snapshot.empty) {
            // Auto-seed initial curated culture entries to Firestore once if collection is empty
            seedCultureToFirestore();
            return;
          }

          const liveItems: CultureItem[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            const imagesList: string[] = Array.isArray(data.images) ? data.images : [];
            const coverImg: string =
              data.coverImage ||
              (imagesList.length > 0 ? imagesList[0] : '') ||
              'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';

            return {
              id: docSnap.id,
              title: data.title || '',
              category: data.category || 'Folk Dance & Music',
              description: data.description || '',
              images: imagesList.length > 0 ? imagesList : [coverImg],
              coverImage: coverImg,
              community: data.community || '',
              villageOrArea: data.villageOrArea || '',
              language: data.language || '',
              latitude: typeof data.latitude === 'number' ? data.latitude : Number(data.latitude) || 27.48,
              longitude: typeof data.longitude === 'number' ? data.longitude : Number(data.longitude) || 94.58,
              history: data.history || '',
              significance: data.significance || '',
              howPracticed: data.howPracticed || '',
              relatedFestivals: Array.isArray(data.relatedFestivals) ? data.relatedFestivals : [],
              videoUrl: data.videoUrl || '',
              contributorId: data.contributorId || '',
              contributorName: data.contributorName || 'Community Contributor',
              contributorEmail: data.contributorEmail || '',
              createdAt: data.createdAt || new Date().toISOString(),
              status: (data.status === 'approved' || data.status === 'rejected') ? data.status : 'pending'
            };
          });

          // Sort by creation date descending (newest first)
          liveItems.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

          setCultureItems(liveItems);
          setIsLoadingCulture(false);
        },
        (error) => {
          console.error('[CultureContext] Firestore onSnapshot error:', error);
          setIsLoadingCulture(false);
        }
      );
    } catch (err) {
      console.error('[CultureContext] Setup listener error:', err);
      setIsLoadingCulture(false);
    }

    return () => unsubscribe();
  }, []);

  // Submit new cultural story / item to Firestore
  const addCultureItem = async (
    itemData: Omit<CultureItem, 'id' | 'createdAt' | 'status'>
  ): Promise<{ success: boolean; id?: string; error?: string }> => {
    try {
      const newCultureId = 'culture_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      const createdAt = new Date().toISOString();

      const newCultureItem: CultureItem = {
        ...itemData,
        id: newCultureId,
        createdAt,
        status: 'pending' // New submissions start as pending moderation
      };

      // Optimistic state update for instant UI feedback
      setCultureItems(prev => [newCultureItem, ...prev]);

      // Direct write to Firestore collection 'culture'
      const docRef = doc(db, 'culture', newCultureId);
      const sanitized: Record<string, any> = {};
      Object.entries(newCultureItem).forEach(([key, val]) => {
        if (val !== undefined) {
          sanitized[key] = val;
        } else {
          sanitized[key] = '';
        }
      });

      await setDoc(docRef, sanitized);
      return { success: true, id: newCultureId };
    } catch (err: any) {
      console.error('[CultureContext] Error adding culture story to Firestore:', err);
      return { success: false, error: err.message || 'Failed to submit cultural story' };
    }
  };

  // Admin: Update culture status (approve / reject)
  const updateCultureStatus = async (cultureId: string, status: 'approved' | 'rejected'): Promise<boolean> => {
    try {
      // Optimistic update in React state so admin UI and public page reflect change immediately
      setCultureItems(prev =>
        prev.map(c => (c.id === cultureId ? { ...c, status } : c))
      );

      // Real persistence in Firestore document
      const cultureRef = doc(db, 'culture', cultureId);
      await setDoc(
        cultureRef,
        {
          status,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );

      return true;
    } catch (e) {
      console.error('[CultureContext] Failed to update culture status in Firestore:', e);
      return false;
    }
  };

  // Admin: Edit culture details
  const updateCultureItem = async (
    cultureId: string,
    updatedFields: Partial<CultureItem>
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Sanitize fields: strip undefined values so Firestore setDoc does not throw
      const sanitized: Record<string, any> = {
        updatedAt: new Date().toISOString()
      };

      Object.entries(updatedFields).forEach(([key, val]) => {
        if (val !== undefined) {
          sanitized[key] = val;
        } else {
          sanitized[key] = '';
        }
      });

      // Optimistic update in React state
      setCultureItems(prev =>
        prev.map(c => (c.id === cultureId ? { ...c, ...updatedFields } : c))
      );

      // Direct write to Firestore document
      const cultureRef = doc(db, 'culture', cultureId);
      await setDoc(cultureRef, sanitized, { merge: true });

      return { success: true };
    } catch (e: any) {
      console.error('[CultureContext] Failed to update culture item in Firestore:', e);
      return {
        success: false,
        error: e?.message || 'Failed to update culture item in Firestore'
      };
    }
  };

  // Admin: Delete culture item
  const deleteCultureItem = async (cultureId: string): Promise<boolean> => {
    try {
      // Optimistic removal from React state
      setCultureItems(prev => prev.filter(c => c.id !== cultureId));

      // Direct deletion from Firestore collection 'culture'
      const cultureRef = doc(db, 'culture', cultureId);
      await deleteDoc(cultureRef);

      return true;
    } catch (e) {
      console.error('[CultureContext] Failed to delete culture item from Firestore:', e);
      return false;
    }
  };

  // Admin: Delete single image from culture entry
  const deleteCultureImage = async (cultureId: string, imageIndex: number): Promise<boolean> => {
    const target = cultureItems.find(c => c.id === cultureId);
    if (!target || !target.images) return false;

    const newImages = target.images.filter((_, idx) => idx !== imageIndex);
    const newCover =
      newImages.length > 0
        ? target.coverImage === target.images[imageIndex]
          ? newImages[0]
          : target.coverImage
        : 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80';

    const res = await updateCultureItem(cultureId, {
      images: newImages,
      coverImage: newCover
    });
    return res.success;
  };

  const getCultureById = (id: string): CultureItem | undefined => {
    return cultureItems.find(c => c.id === id);
  };

  return (
    <CultureContext.Provider
      value={{
        cultureItems,
        approvedCultureItems,
        pendingCultureItems,
        rejectedCultureItems,
        userCultureSubmissions,
        isLoadingCulture,
        addCultureItem,
        updateCultureStatus,
        updateCultureItem,
        deleteCultureItem,
        deleteCultureImage,
        getCultureById
      }}
    >
      {children}
    </CultureContext.Provider>
  );
};

export const useCulture = () => {
  const context = useContext(CultureContext);
  if (!context) {
    throw new Error('useCulture must be used within a CultureProvider');
  }
  return context;
};
