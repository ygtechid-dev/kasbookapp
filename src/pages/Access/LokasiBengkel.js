import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import haversine from 'haversine';
import Fire from '../../config/Fire'; // Import konfigurasi Firebase Anda

const NearbyOutlets = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [outlets, setOutlets] = useState([]);
  const [nearestOutlets, setNearestOutlets] = useState([]);

  useEffect(() => {
    // Ambil lokasi pengguna
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
      },
      (error) => {
        console.error('Error getting location:', error);
        setUserLocation({
          latitude: '-8.164994',
          longitude: '113.713317'
        })
        // Alert.alert('Error', 'Gagal mendapatkan lokasi Anda. Harap pastikan izin lokasi diaktifkan.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // Ambil data outlet dari Firebase
    const fetchOutlets = async () => {
      try {
        const snapshot = await Fire.database().ref('dataOutlet').once('value');
        if (snapshot.exists()) {
          const data = snapshot.val();
          const formattedData = Object.values(data).map((outlet, index) => ({
            ...outlet,
            id: index,
            latitude: parseFloat(outlet.latitude),
            longitude: parseFloat(outlet.longitude),
          }));
          setOutlets(formattedData);
        }
      } catch (error) {
        console.error('Error fetching outlets:', error);
      }
    };

    fetchOutlets();
  }, []);

  useEffect(() => {
    if (userLocation && outlets.length > 0) {
      // Hitung jarak dari lokasi pengguna ke setiap outlet
      const outletsWithDistance = outlets.map((outlet) => {
        const distance = haversine(userLocation, { latitude: outlet.latitude, longitude: outlet.longitude }, { unit: 'km' });
        return { ...outlet, distance };
      });

      // Urutkan outlet berdasarkan jarak
      const sortedOutlets = outletsWithDistance.sort((a, b) => a.distance - b.distance);
      setNearestOutlets(sortedOutlets);
    }
  }, [userLocation, outlets]);

  const handleOpenMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('Error opening maps:', err));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Rekomendasi Bengkel Terdekat</Text>
      {userLocation ? (
        nearestOutlets.length > 0 ? (
          nearestOutlets.map((outlet) => (
            <View key={outlet.id} style={styles.outletCard}>
              <Text style={styles.outletName}>{outlet.namalokasi}</Text>
              <Text style={styles.outletDistance}>Jarak: {outlet.distance.toFixed(2)} km</Text>
              <Text style={styles.outletLocation}>{outlet.lokasi}</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => handleOpenMaps(outlet.latitude, outlet.longitude)}
              >
                <Text style={styles.mapButtonText}>Buka di Google Maps</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.loadingText}>Memuat data outlet...</Text>
        )
      ) : (
        <Text style={styles.loadingText}>Mengambil lokasi Anda...</Text>
      )}
    </ScrollView>
  );
};

export default NearbyOutlets;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2c94df',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  outletCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  outletName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  outletDistance: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  outletLocation: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  mapButton: {
    backgroundColor: '#0288d1',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
