import React, { useState, useEffect, useCallback } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

// Map component that renders the actual Google Map
const MapComponent = ({ center, zoom, onLocationSelect, selectedLocation }) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  const ref = React.useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  useEffect(() => {
    if (map) {
      // Add click listener to map
      const clickListener = map.addListener('click', (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        
        // Update marker position
        if (marker) {
          marker.setPosition({ lat, lng });
        } else {
          const newMarker = new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: 'Selected Location',
          });
          setMarker(newMarker);
        }

        // Reverse geocode to get address
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === 'OK' && results[0]) {
            onLocationSelect({
              lat,
              lng,
              address: results[0].formatted_address,
              placeId: results[0].place_id,
            });
          } else {
            onLocationSelect({
              lat,
              lng,
              address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
              placeId: null,
            });
          }
        });
      });

      return () => {
        window.google.maps.event.removeListener(clickListener);
      };
    }
  }, [map, marker, onLocationSelect]);

  // Update marker when selectedLocation changes
  useEffect(() => {
    if (map && selectedLocation) {
      if (marker) {
        marker.setPosition({ lat: selectedLocation.lat, lng: selectedLocation.lng });
      } else {
        const newMarker = new window.google.maps.Marker({
          position: { lat: selectedLocation.lat, lng: selectedLocation.lng },
          map: map,
          title: 'Selected Location',
        });
        setMarker(newMarker);
      }
      map.setCenter({ lat: selectedLocation.lat, lng: selectedLocation.lng });
    }
  }, [map, selectedLocation, marker]);

  return <div ref={ref} style={{ width: '100%', height: '400px' }} />;
};

// Loading component
const MapLoading = ({ status }) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="map-loading">
          <div className="loading-spinner"></div>
          <p>Loading Google Maps...</p>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="map-error">
          <p>❌ Error loading Google Maps</p>
          <p>Please check your API key configuration</p>
        </div>
      );
    default:
      return null;
  }
};

const LocationPicker = ({ onLocationChange, initialLocation, className = '' }) => {
  const [selectedLocation, setSelectedLocation] = useState(initialLocation || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');

  // Default map center (San Francisco)
  const defaultCenter = { lat: 37.7749, lng: -122.4194 };
  const mapCenter = selectedLocation || userLocation || defaultCenter;

  // Get user's current location
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      return;
    }

    setLocationPermission('requesting');
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        setUserLocation(location);
        setLocationPermission('granted');
        
        // Reverse geocode to get address
        if (window.google && window.google.maps) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ location }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const locationWithAddress = {
                ...location,
                address: results[0].formatted_address,
                placeId: results[0].place_id,
              };
              setUserLocation(locationWithAddress);
            }
          });
        }
      },
      (error) => {
        console.warn('Error getting user location:', error);
        setLocationPermission('denied');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }, []);

  // Search for places
  const searchPlaces = useCallback(async (query) => {
    if (!query.trim() || !window.google || !window.google.maps) return;

    setIsSearching(true);
    setSearchResults([]);

    try {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div')
      );

      const request = {
        query: query,
        fields: ['place_id', 'name', 'formatted_address', 'geometry'],
      };

      service.textSearch(request, (results, status) => {
        setIsSearching(false);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const formattedResults = results.slice(0, 5).map(place => ({
            placeId: place.place_id,
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          }));
          setSearchResults(formattedResults);
        } else {
          setSearchResults([]);
        }
      });
    } catch (error) {
      console.error('Error searching places:', error);
      setIsSearching(false);
      setSearchResults([]);
    }
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      if (query.length > 2) {
        searchPlaces(query);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  // Handle location selection
  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location);
    setSearchResults([]);
    setSearchQuery(location.address || '');
    onLocationChange && onLocationChange(location);
  }, [onLocationChange]);

  // Handle search result selection
  const handleSearchResultSelect = (result) => {
    handleLocationSelect(result);
    setShowMap(true);
  };

  // Use current location
  const useCurrentLocation = () => {
    if (userLocation) {
      handleLocationSelect(userLocation);
      setShowMap(true);
    } else {
      getCurrentLocation();
    }
  };

  // Clear location
  const clearLocation = () => {
    setSelectedLocation(null);
    setSearchQuery('');
    setSearchResults([]);
    onLocationChange && onLocationChange(null);
  };

  // Get Google Maps API key from environment
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className={`location-picker ${className}`}>
        <div className="location-picker-error">
          <p>⚠️ Google Maps API key not configured</p>
          <p>Please add REACT_APP_GOOGLE_MAPS_API_KEY to your environment variables</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`location-picker ${className}`}>
      <div className="location-picker-header">
        <h3>📍 Select Location</h3>
        <p>Choose your location to find skills and teachers nearby</p>
      </div>

      {/* Search Input */}
      <div className="location-search">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for a city, address, or landmark..."
            className="location-search-input"
          />
          {isSearching && <div className="search-loading">🔍</div>}
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <button
                key={result.placeId}
                className="search-result-item"
                onClick={() => handleSearchResultSelect(result)}
              >
                <div className="result-name">{result.name}</div>
                <div className="result-address">{result.address}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Location Actions */}
      <div className="location-actions">
        <button
          className="btn btn-outline location-btn"
          onClick={useCurrentLocation}
          disabled={locationPermission === 'requesting'}
        >
          {locationPermission === 'requesting' ? (
            <>
              <span className="loading-spinner small"></span>
              Getting location...
            </>
          ) : (
            <>
              📍 Use Current Location
            </>
          )}
        </button>

        <button
          className="btn btn-outline location-btn"
          onClick={() => setShowMap(!showMap)}
        >
          {showMap ? '🗺️ Hide Map' : '🗺️ Show Map'}
        </button>

        {selectedLocation && (
          <button
            className="btn btn-outline location-btn clear-btn"
            onClick={clearLocation}
          >
            ❌ Clear Location
          </button>
        )}
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="selected-location">
          <div className="location-info">
            <div className="location-icon">📍</div>
            <div className="location-details">
              <div className="location-address">{selectedLocation.address}</div>
              <div className="location-coords">
                {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Google Map */}
      {showMap && (
        <div className="map-container">
          <Wrapper apiKey={apiKey} render={MapLoading} libraries={['places']}>
            <MapComponent
              center={mapCenter}
              zoom={selectedLocation ? 15 : 10}
              onLocationSelect={handleLocationSelect}
              selectedLocation={selectedLocation}
            />
          </Wrapper>
        </div>
      )}

      {/* Location Tips */}
      <div className="location-tips">
        <h4>💡 Tips:</h4>
        <ul>
          <li>Click on the map to select a precise location</li>
          <li>Use the search to find specific addresses or landmarks</li>
          <li>Allow location access for automatic detection</li>
          <li>Your location helps us show relevant skills nearby</li>
        </ul>
      </div>
    </div>
  );
};

export default LocationPicker;
