import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import Logo from '../../assets/ladjulogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {

  const getToken = async () => {
    const getStorage = await AsyncStorage.getItem('@token');
    console.log('getstorsplash', getStorage);
    if (getStorage) {

   
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
    // Menggunakan clearTimeout untuk membatalkan timeout jika sudah ada navigasi
    // const timeoutId = setTimeout(() => {
     
    // }, 2000);

    // // Mengembalikan fungsi cleanup untuk membatalkan timeout
    // return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    getToken()
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#2c94df', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginTop: -50 }}>
        <Image source={Logo} style={{ width: 300, height: 300 }} />
        <View style={{ marginTop: -10, alignItems: 'center' }}>
      <Text style={styles.txtHead}>Ladju Repair</Text>

      <Text style={styles.txtDesc}>Welcome to Ladju Repair</Text>
      <Text style={[styles.txtDesc, {
        textAlign: 'center',
        fontSize: 16,
        width: 300,
        flexWrap: 'wrap',
        marginTop: 10
      }]}>Dengan aplikasi ini, Anda dapat mengatur jadwal perawatan motor dan mobil, mendapatkan reminder untuk ganti oli, dan menemukan bengkel terdekat.</Text>

      
        <TouchableOpacity  onPress={() => navigation.replace('Login')} style={{width: 200, height: 60, borderRadius: 30, backgroundColor: 'black', marginTop: 24}}>
      <Text style={[styles.txtDesc, {
        color: 'white',
        textAlign: 'center',
        fontWeight: '400',
        marginTop: 16
      }]}>Get Started</Text>
            
          </TouchableOpacity>     
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  txtHead: {color: 'black', fontWeight: 'bold', fontSize: 24,  marginTop: 16,},
  txtDesc: {color: 'black', fontWeight: '', fontSize: 18,  marginTop: 20,},

});
