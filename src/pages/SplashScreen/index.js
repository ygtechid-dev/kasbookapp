import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const SplashScreen = ({ navigation }) => {

  const getToken = async () => {
    const getStorage = await AsyncStorage.getItem('@token');
    console.log('getstorsplash', getStorage);

    const timeoutId = setTimeout(() => {
      if (getStorage) {

   
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);

    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    getToken()
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center' }}>
        <View style={{ marginTop: -10, alignItems: 'center' }}>
          {/* Jika ada teks tambahan, bisa ditambahkan di sini */}
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
