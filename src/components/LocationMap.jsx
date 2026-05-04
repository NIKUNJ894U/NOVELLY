import React, { useEffect, useRef, useState } from 'react';
import { Loader2, MapPin, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (!apiKey) {
      return reject(new Error('Missing Google Maps API key. Set VITE_GOOGLE_MAPS_API_KEY in .env.'));
    }

    if (window.google?.maps) {
      return resolve(window.google);
    }

    const existingScript = document.querySelector('script[data-google-maps]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.google));
      existingScript.addEventListener('error', () => reject(new Error('Google Maps script failed to load.')));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-google-maps', 'true');
    script.onload = () => {
      if (window.google?.maps) {
        resolve(window.google);
      } else {
        reject(new Error('Google Maps did not initialize correctly.'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load Google Maps script.'));
    document.head.appendChild(script);
  });
};

const calculateDistance = (a, b) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const sinLat = Math.sin(dLat / 2);
  const sinLng = Math.sin(dLng / 2);
  const haversine = sinLat * sinLat + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * sinLng * sinLng;
  const distance = 2 * earthRadius * Math.asin(Math.sqrt(haversine));
  return Math.round(distance * 10) / 10;
};

const getLocationFromGeometry = (geometry) => {
  if (!geometry) return null;
  if (geometry.location?.toJSON) {
    return geometry.location.toJSON();
  }
  return { lat: geometry.location.lat, lng: geometry.location.lng };
};

const LocationMap = ({ user, lastLocation, onLocationUpdate }) => {
  const mapRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('Waiting for location permission...');
  const [coords, setCoords] = useState(lastLocation?.coords || null);
  const [libraries, setLibraries] = useState(lastLocation?.libraries || []);
  const [nearestLibrary, setNearestLibrary] = useState(lastLocation?.nearestLibrary || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const statusRef = useRef(status);

  // Keep statusRef updated
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const saveLocationState = (updated) => {
    const updatedWithTime = { ...updated, savedAt: new Date().toISOString() };
    if (user?.email) {
      localStorage.setItem(`novelly_user_${user.email}`, JSON.stringify(updatedWithTime));
    }

    if (onLocationUpdate) {
      onLocationUpdate(updatedWithTime);
    }
  };

  const renderMap = (google, userCoords, places) => {
    if (!mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: userCoords,
      zoom: 14,
      disableDefaultUI: true,
    });

    new google.maps.Marker({
      position: userCoords,
      map,
      title: 'Your location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#4361ee',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 8,
      },
    });

    places.forEach((place, index) => {
      const placePos = getLocationFromGeometry(place.geometry);
      if (!placePos) return;

      const marker = new google.maps.Marker({
        position: placePos,
        map,
        title: place.name,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="font-family: Inter, sans-serif; max-width:240px;">
            <strong>${place.name}</strong><br />
            <span style="font-size:0.9rem;color:#777">${place.vicinity || place.formatted_address || ''}</span><br />
            <span style="font-size:0.9rem;color:#4361ee">${place.distance} km away</span>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      if (index === 0) {
        infoWindow.open(map, marker);
      }
    });
  };

  const updateNearbyLibraries = async (position) => {
    const currentCoords = { lat: position.coords.latitude, lng: position.coords.longitude };
    setCoords(currentCoords);
    setStatus('loading');
    setMessage('Searching nearby libraries...');
    setLoading(true);
    setError(null);

    try {
      const google = await loadGoogleMapsScript(apiKey);

      const dummyMap = new google.maps.Map(document.createElement('div'));
      const service = new google.maps.places.PlacesService(dummyMap);
      const request = {
        location: currentCoords,
        radius: 6000,
        type: ['library'],
        keyword: 'library',
      };

      service.nearbySearch(request, (results, placeStatus) => {
        if (placeStatus !== google.maps.places.PlacesServiceStatus.OK || !results || !results.length) {
          setStatus('ready'); // Keep ready but show empty
          setMessage('NO LIBRARY FOUND NEARBY');
          setLibraries([]);
          setNearestLibrary(null);
          setLoading(false);
          saveLocationState({ coords: currentCoords, libraries: [], nearestLibrary: null, status: 'ready' });
          return;
        }

        const enriched = results.map((place) => {
          const location = getLocationFromGeometry(place.geometry);
          const distance = location ? calculateDistance(currentCoords, location) : null;
          return {
            id: place.place_id,
            name: place.name,
            address: place.vicinity || place.formatted_address || 'Address not available',
            rating: place.rating || null,
            location,
            distance,
          };
        }).filter((place) => place.location !== null);

        const sorted = enriched.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
        const nearest = sorted[0] || null;

        setLibraries(sorted);
        setNearestLibrary(nearest);
        setStatus('ready');
        setMessage(nearest ? `Nearest library: ${nearest.name}` : 'Found nearby libraries.');
        saveLocationState({ coords: currentCoords, libraries: sorted, nearestLibrary: nearest, status: 'ready' });
        setLoading(false);

        renderMap(google, currentCoords, sorted.slice(0, 6));
      });
    } catch (scriptError) {
      setStatus('error');
      setError(scriptError.message);
      setMessage('Map service failed to load.');
      setLoading(false);
    }
  };

  // Initial search and watch
  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not supported in this browser.');
      setMessage('Enable location permissions in your browser.');
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      updateNearbyLibraries,
      (geoError) => {
        setStatus('error');
        setError(geoError.message || 'Unable to access location.');
        setMessage('Grant permission to use real-time location.');
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  // 30-second timeout logic
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (statusRef.current === 'loading' || statusRef.current === 'idle') {
        setStatus('error');
        setMessage('Unable to find nearby libraries.');
        setLoading(false);
      }
    }, 30000);

    return () => clearTimeout(timeoutId);
  }, []);

  const refreshLocation = () => {
    if (!navigator.geolocation) return;
    setMessage('Refreshing location...');
    setStatus('loading');
    setLoading(true);
    navigator.geolocation.getCurrentPosition(updateNearbyLibraries, (error) => {
      setStatus('error');
      setError(error.message);
      setLoading(false);
    }, { enableHighAccuracy: true, maximumAge: 0, timeout: 15000 });
  };

  return (
    <div className="glass rounded-[3rem] border border-glass-border overflow-hidden shadow-[0_20px_50px_-30px_rgba(0,0,0,0.45)]">
      <div className="p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-accent uppercase tracking-[0.35em] text-xs font-bold mb-3">Library Locator</p>
            <h2 className="text-4xl serif mb-3">Find the nearest library in real-time</h2>
            <p className="text-text-secondary max-w-xl">
              Use your current location to discover local libraries nearby. Sign in with Google to save your location and keep your results linked to your account.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-right">
            <button
              onClick={refreshLocation}
              className="inline-flex items-center justify-center gap-2 btn-primary px-6 py-3"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <span className="text-sm text-text-secondary">{user ? `Signed in as ${user.given_name || user.name}` : 'Sign in to save your location.'}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
          <div className="rounded-[2rem] overflow-hidden border border-glass-border min-h-[420px] relative group bg-[#09090a]">
            {/* Real Map Container */}
            <div 
              ref={mapRef} 
              className={`w-full h-full min-h-[420px] transition-opacity duration-1000 ${coords ? 'opacity-100' : 'opacity-0'}`} 
            />
            
            {/* Doodle Overlay */}
            {(!coords || status === 'loading' || status === 'idle' || status === 'error') && (
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 bg-white`}>
                <img 
                  src="/user_map_doodle.png" 
                  alt="Map Doodle" 
                  className="w-full h-full object-contain p-12"
                />
                
                {status === 'error' && (
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">
                    <Button 
                      onClick={refreshLocation}
                      variant="default"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-6 text-lg shadow-2xl"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Retry Search
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-[2rem] border border-glass-border">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.35em] text-accent font-bold">Status</p>
                  <p className="mt-2 text-base text-text-primary">{status === 'loading' ? 'Updating location...' : status === 'error' ? 'Location Needed' : 'Live Tracking Active'}</p>
                </div>
                {loading ? <Loader2 className="w-6 h-6 text-accent animate-spin" /> : <MapPin className="w-6 h-6 text-accent" />}
              </div>
              <p className="text-sm text-text-secondary">{error || message}</p>
            </div>

            {nearestLibrary && (
              <div className="glass p-6 rounded-[2rem] border border-glass-border">
                <h3 className="text-xl font-semibold mb-3">Nearest Library</h3>
                <p className="text-text-primary text-lg font-semibold">{nearestLibrary.name}</p>
                <p className="text-text-secondary mb-2">{nearestLibrary.address}</p>
                <p className="text-sm text-text-secondary">{nearestLibrary.distance} km from your current location.</p>
              </div>
            )}

            <div className="glass p-6 rounded-[2rem] border border-glass-border">
              <h3 className="text-xl font-semibold mb-4">Nearby Libraries</h3>
              <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2">
                {libraries.length === 0 && !loading && status === 'ready' && (
                  <p className="text-text-secondary text-sm">No nearby libraries available yet. Allow location access and refresh.</p>
                )}
                {loading && libraries.length === 0 && (
                  <p className="text-text-secondary text-sm italic animate-pulse">Searching for hubs...</p>
                )}
                {libraries.map((library) => (
                  <div key={library.id} className="rounded-3xl p-4 bg-[#0d0d11] border border-glass-border">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-semibold text-lg">{library.name}</h4>
                        <p className="text-text-secondary text-sm">{library.address}</p>
                      </div>
                      <span className="text-accent font-semibold">{library.distance} km</span>
                    </div>
                    {library.rating && <p className="text-text-secondary text-xs mt-3">Rating: {library.rating.toFixed(1)} / 5</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
