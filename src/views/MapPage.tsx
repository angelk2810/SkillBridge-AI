import { GoogleMap } from '../components/GoogleMap';

export function MapPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Google Maps</h1>
      <GoogleMap />
    </div>
  );
}