import { useState } from 'react';
import { useTripStore } from '../store/useTripStore';
import { pois } from '../data';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Video, Navigation, Map as MapIcon } from 'lucide-react';
import { YouTubeModal } from '../components/ui/YouTubeModal';
import { parseISO, format } from 'date-fns';

// Fix for default Leaflet icon in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to recenter map when selected day changes
function MapUpdater({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export function MapView() {
  const { itinerary } = useTripStore();
  const [selectedDate, setSelectedDate] = useState<string>(itinerary[0].date);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');

  const currentDay = itinerary.find(d => d.date === selectedDate) || itinerary[0];
  
  // Get POIs for current day
  const dayPois = currentDay.pois.map((poiId: number) => pois.find(p => p.id === poiId)).filter(Boolean) as typeof pois;
  
  // Default center (Tokyo) or first POI of the day
  const center: [number, number] = dayPois.length > 0 
    ? [dayPois[0].lat, dayPois[0].lng] 
    : [35.6762, 139.6503]; // Tokyo
    
  const zoom = dayPois.length > 0 ? 13 : 10;

  const openVideo = (query: string) => {
    setCurrentSearchQuery(query);
    setVideoModalOpen(true);
  };

  const getGoogleMapsUrl = (lat: number, lng: number, name: string) => {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodeURIComponent(name)}`;
  };

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)] animate-in fade-in duration-300">
      {/* Date Selector */}
      <div className="bg-card border-b border-border shadow-sm p-3 z-20">
        <select 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {itinerary.map(day => (
            <option key={day.date} value={day.date}>
              {format(parseISO(day.date), 'MMM d, yyyy')} - {day.title} ({day.city})
            </option>
          ))}
        </select>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative z-10">
        {dayPois.length === 0 && (
          <div className="absolute top-4 left-4 right-4 bg-background/90 backdrop-blur border border-border p-3 rounded-lg z-[1000] shadow-md flex items-center gap-3">
            <MapIcon className="text-muted-foreground w-5 h-5" />
            <p className="text-sm text-foreground">No mapped locations for this day.</p>
          </div>
        )}
        
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={center} zoom={zoom} />
          
          {dayPois.map((poi) => (
            <Marker key={poi.id} position={[poi.lat, poi.lng]}>
              <Popup className="rounded-xl custom-popup">
                <div className="p-1 min-w-[200px]">
                  <h3 className="font-bold text-base mb-1">{poi.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{poi.desc}</p>
                  
                  <div className="flex flex-col gap-2">
                    <button 
                      onClick={() => openVideo(poi.youtubeSearchQuery)}
                      className="w-full bg-red-100 text-red-600 hover:bg-red-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Video className="w-4 h-4" /> Watch Video
                    </button>
                    <a 
                      href={getGoogleMapsUrl(poi.lat, poi.lng, poi.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200 px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <Navigation className="w-4 h-4" /> Google Maps
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <YouTubeModal 
        isOpen={videoModalOpen} 
        onClose={() => setVideoModalOpen(false)} 
        searchQuery={currentSearchQuery} 
      />
    </div>
  );
}
