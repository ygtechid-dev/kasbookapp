import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../../assets/harumpeduli.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  const getToken = async () => {
    const getStorage = await AsyncStorage.getItem('@token');
    console.log('getstorsplash', getStorage);

    // Menggunakan clearTimeout untuk membatalkan timeout jika sudah ada navigasi
    const timeoutId = setTimeout(() => {
      if (getStorage) {

   
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);

    // Mengembalikan fungsi cleanup untuk membatalkan timeout
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    getToken()
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <Image source={Logo} style={{ width: 300, height: 200 }} />
        <View style={{ marginTop: -10, alignItems: 'center' }}>
          {/* Jika ada teks tambahan, bisa ditambahkan di sini */}
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
