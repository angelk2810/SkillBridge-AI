import { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

export function GoogleMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadMap() {
      const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

      if (!key || !mapRef.current) {
        console.error('Google Maps API key is missing.');
        return;
      }

      setOptions({ key, v: 'weekly' });

      const { Map } = await importLibrary('maps');

      if (!mapRef.current) return;

      new Map(mapRef.current, {
        center: { lat: 10.7905, lng: 78.7047 },
        zoom: 7,
      });
    }

    loadMap().catch(error => console.error('Map loading failed:', error));
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '500px' }}
    />
  );
}