import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, Dimensions } from 'react-native';
// This library provides the MapView component for native map rendering
import MapView, { Marker } from 'react-native-maps';

// Get the device window dimensions for responsive layout
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// Define the initial map center (e.g., a starting point like San Francisco)
const INITIAL_LATITUDE = 37.78825;
const INITIAL_LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
// Adjust longitude delta dynamically
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// Main App Component
export default function App() {
  const [loading, setLoading] = useState(true);

  // Simple effect to show a loading screen briefly
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4285F4" />
        <Text style={styles.loadingText}>Loading Mobile Map...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.header}>
          <Text style={styles.headerText}>
              Mobile Service App Map View [Image of a location pin on a map]
          </Text>
      </View>

      <View style={styles.mapContainer}>
        {/* MapView is the core component that embeds the native Google Maps view.
          Setting provider="google" ensures consistency on both Android and iOS.
        */}
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: INITIAL_LATITUDE,
            longitude: INITIAL_LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          // Enable this to show the blue dot for the user's location (requires device permissions)
          showsUserLocation={true} 
          zoomEnabled={true}
          scrollEnabled={true}
        >
          {/* Example Marker: A sample location */}
          <Marker
            coordinate={{ latitude: 37.8021, longitude: -122.4184 }}
            title={"Key Location"}
            description={"This is a predefined service point."}
            pinColor="red"
          />
        </MapView>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Google Maps API successfully implemented.</Text>
      </View>
    </View>
  );
}

// React Native Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#4285F4',
    paddingTop: 50, // To avoid the device notch/status bar
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#4285F4',
  },
  mapContainer: {
    flex: 1, // Allows the map to fill the space between the header and footer
    width: '100%',
    padding: 10,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  footer: {
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  }
});