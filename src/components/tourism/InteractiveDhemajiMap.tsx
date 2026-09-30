import React, { useState, useRef, useEffect } from 'react';
import { Place } from '../../types/place';
import { MapPin, Navigation, ZoomIn, ZoomOut, RotateCcw, Check, ExternalLink } from 'lucide-react';

const DHEMAJI_MAP_SRC = '/src/assets/images/map1.jpg';

interface InteractiveDhemajiMapProps {
  places?: Place[];
  selectedPlaceId?: string;
  onSelectPlace?: (place: Place) => void;
  // For location picking in Add Place
  isPickerMode?: boolean;
  initialLat?: number;
  initialLng?: number;
  onLocationPicked?: (lat: number, lng: number, suggestedAddress?: string) => void;
}

// Bounding box for Dhemaji District, Assam
// Latitude: ~27.10 to ~27.90
// Longitude: ~94.10 to ~95.30
const MIN_LAT = 27.15;
const MAX_LAT = 27.95;
const MIN_LNG = 94.15;
const MAX_LNG = 95.35;

export const InteractiveDhemajiMap: React.FC<InteractiveDhemajiMapProps> = ({
  places = [],
  selectedPlaceId,
  onSelectPlace,
  isPickerMode = false,
  initialLat = 27.483,
  initialLng = 94.581,
  onLocationPicked
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // For picker mode
  const [pinLocation, setPinLocation] = useState<{ lat: number; lng: number }>({
    lat: initialLat,
    lng: initialLng
  });
  const [activePopupPlace, setActivePopupPlace] = useState<Place | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initial coordinates if changed
  useEffect(() => {
    if (initialLat && initialLng) {
      setPinLocation({ lat: initialLat, lng: initialLng });
    }
  }, [initialLat, initialLng]);

  // Coordinate to SVG (1000 x 600 viewport)
  const coordsToSvg = (lat: number, lng: number) => {
    const x = ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * 900 + 50;
    const y = ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * 500 + 50;
    return { x, y };
  };

  // SVG to Coordinate
  const svgToCoords = (x: number, y: number) => {
    const lng = MIN_LNG + ((x - 50) / 900) * (MAX_LNG - MIN_LNG);
    const lat = MAX_LAT - ((y - 50) / 500) * (MAX_LAT - MIN_LAT);
    return {
      lat: Number(lat.toFixed(4)),
      lng: Number(lng.toFixed(4))
    };
  };

  const handleMapClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isPickerMode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = (e.clientX - rect.left - pan.x) / zoom;
    const clickY = (e.clientY - rect.top - pan.y) / zoom;

    // Convert SVG view coords (scaled to 1000x600 viewBox)
    const scaleX = 1000 / rect.width;
    const scaleY = 600 / rect.height;

    const svgX = clickX * scaleX;
    const svgY = clickY * scaleY;

    const coords = svgToCoords(svgX, svgY);
    setPinLocation(coords);

    if (onLocationPicked) {
      onLocationPicked(coords.lat, coords.lng);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(z => Math.min(z + 0.3, 2.5));
  const handleZoomOut = () => setZoom(z => Math.max(z - 0.3, 0.8));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Geolocation trigger
  const handleUseMyLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = Number(position.coords.latitude.toFixed(4));
          const lng = Number(position.coords.longitude.toFixed(4));
          setPinLocation({ lat, lng });
          if (onLocationPicked) {
            onLocationPicked(lat, lng, 'Current Device Geolocation, Dhemaji');
          }
        },
        (error) => {
          alert('Could not access current location. Please tap/click on the map to pin.');
        }
      );
    }
  };

  const pickerPinSvg = coordsToSvg(pinLocation.lat, pinLocation.lng);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[460px] sm:h-[540px] bg-[#FAF8F2] rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xl select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Map HUD Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        <div className="bg-forest-900/90 backdrop-blur-md border border-gold/30 rounded-2xl p-1.5 flex flex-col gap-1 shadow-lg">
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold flex items-center justify-center transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold flex items-center justify-center transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleResetView}
            className="w-8 h-8 rounded-xl bg-forest-800 hover:bg-forest-700 text-gold flex items-center justify-center transition-colors cursor-pointer"
            title="Reset Map"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {isPickerMode && (
          <button
            type="button"
            onClick={handleUseMyLocation}
            className="px-3.5 py-2 rounded-xl bg-gold hover:bg-gold-hover text-forest-900 font-bold text-xs shadow-lg flex items-center gap-1.5 transition-all transform hover:scale-105 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Use My Location</span>
          </button>
        )}
      </div>

      {/* Top Right District Info HUD */}
      <div className="absolute top-4 right-4 z-20 bg-forest-900/90 backdrop-blur-md border border-gold/30 rounded-2xl px-4 py-2.5 text-right shadow-lg">
        <span className="text-[10px] font-bold text-gold uppercase tracking-[0.2em] block">
          Official Administrative Cartography
        </span>
        <h4 className="text-sm font-serif font-black text-white">
          Dhemaji District Map (Scale: NTS)
        </h4>
        <p className="text-[10px] text-stone-300">
          Dhemaji &amp; Jonai Sub-Divisions • NH-52 • Brahmaputra
        </p>
      </div>

      {/* SVG Canvas Map */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-75"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center'
        }}
      >
        <svg
          viewBox="0 0 1000 600"
          className="w-full h-full"
          onClick={handleMapClick}
        >
          <defs>
            {/* Pulse beacon filter */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Canvas */}
          <rect width="1000" height="600" fill="#FAF8F2" />

          {/* Official Attached Dhemaji District Map Image */}
          <image
            href={DHEMAJI_MAP_SRC}
            x="0"
            y="0"
            width="1000"
            height="600"
            preserveAspectRatio="none"
          />

          {/* Places Markers (in Explore / View mode) */}
          {!isPickerMode &&
            places.map((place) => {
              const { x, y } = coordsToSvg(place.latitude, place.longitude);
              const isSelected = selectedPlaceId === place.id;

              return (
                <g
                  key={place.id}
                  transform={`translate(${x}, ${y})`}
                  className="cursor-pointer group"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePopupPlace(place);
                    if (onSelectPlace) onSelectPlace(place);
                  }}
                >
                  {/* Outer pulse */}
                  <circle
                    r={isSelected ? '14' : '9'}
                    fill="#D99B26"
                    opacity={isSelected ? '0.45' : '0.25'}
                    className="animate-ping"
                  />
                  {/* Pin Circle */}
                  <circle
                    r={isSelected ? '9' : '7'}
                    fill={isSelected ? '#F3CF7A' : '#D99B26'}
                    stroke="#071811"
                    strokeWidth="2"
                    filter="url(#glow)"
                  />
                  {/* Icon or dot */}
                  <circle r="2.5" fill="#071811" />

                  {/* Label pill on hover or select */}
                  <g
                    transform="translate(12, -8)"
                    className={`${isSelected ? 'opacity-100' : 'opacity-85 group-hover:opacity-100'} transition-opacity`}
                  >
                    <rect
                      x="0"
                      y="-12"
                      width={place.placeName.length * 6.5 + 16}
                      height="20"
                      rx="10"
                      fill="#071811"
                      stroke="#D99B26"
                      strokeWidth="1"
                    />
                    <text x="8" y="2" fill="#FAF8F2" fontSize="9.5" fontWeight="bold">
                      {place.placeName}
                    </text>
                  </g>
                </g>
              );
            })}

          {/* Picker Mode Pin Marker */}
          {isPickerMode && (
            <g transform={`translate(${pickerPinSvg.x}, ${pickerPinSvg.y})`}>
              <circle r="20" fill="#E5AC39" opacity="0.3" className="animate-ping" />
              <path
                d="M 0 0 C -10 -20 -10 -35 0 -40 C 10 -35 10 -20 0 0 Z"
                fill="#C4161C"
                stroke="#FAF8F2"
                strokeWidth="2"
              />
              <circle cx="0" cy="-28" r="5" fill="#FAF8F2" />
              <g transform="translate(14, -34)">
                <rect x="0" y="-10" width="130" height="22" rx="11" fill="#071811" stroke="#D99B26" strokeWidth="1" />
                <text x="8" y="5" fill="#FAF8F2" fontSize="9.5" fontWeight="bold">
                  📍 Click map to set pin
                </text>
              </g>
            </g>
          )}
        </svg>
      </div>

      {/* Selected Location Pill for Picker Mode */}
      {isPickerMode && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-forest-900/95 backdrop-blur-md border border-gold/40 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-white shadow-2xl animate-fadeIn">
          <div>
            <span className="text-[10px] uppercase font-bold text-gold tracking-wider block">
              Selected Location Coordinates
            </span>
            <div className="flex items-center gap-3 text-xs sm:text-sm font-mono mt-0.5">
              <span><strong>Lat:</strong> {pinLocation.lat}° N</span>
              <span><strong>Lng:</strong> {pinLocation.lng}° E</span>
            </div>
            <p className="text-[11px] text-stone-300 mt-0.5">
              Click anywhere on the Dhemaji map above to position your place pin.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onLocationPicked) {
                onLocationPicked(pinLocation.lat, pinLocation.lng);
              }
            }}
            className="px-5 py-2.5 rounded-full bg-gold hover:bg-gold-hover text-forest-900 font-extrabold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-1.5 cursor-pointer transition-all transform hover:scale-105"
          >
            <Check className="w-4 h-4" />
            <span>CONFIRM LOCATION</span>
          </button>
        </div>
      )}

      {/* Place Detail Popup on Marker Click (Explore Mode) */}
      {!isPickerMode && activePopupPlace && (
        <div className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-30 w-full sm:w-80 bg-white rounded-2xl p-3.5 shadow-2xl border border-stone-200 animate-fadeIn text-stone-900">
          <button
            type="button"
            onClick={() => setActivePopupPlace(null)}
            className="absolute top-2 right-2 text-stone-400 hover:text-stone-700 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer"
          >
            ✕
          </button>

          <div className="flex gap-3">
            <img
              src={activePopupPlace.coverImage}
              alt={activePopupPlace.placeName}
              className="w-20 h-20 rounded-xl object-cover shrink-0 border border-stone-200"
            />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block truncate">
                {activePopupPlace.category}
              </span>
              <h5 className="font-serif font-bold text-forest-900 text-sm leading-tight truncate">
                {activePopupPlace.placeName}
              </h5>
              <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                {activePopupPlace.description}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
            <span className="text-[10px] text-stone-400 font-mono">
              {activePopupPlace.latitude}° N, {activePopupPlace.longitude}° E
            </span>
            <button
              type="button"
              onClick={() => {
                if (onSelectPlace) onSelectPlace(activePopupPlace);
              }}
              className="text-xs font-bold text-forest-900 hover:text-gold-dark flex items-center gap-1 cursor-pointer"
            >
              <span>View Details</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
