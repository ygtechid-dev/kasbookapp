import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import Fire from '../../config/Fire'; // Import konfigurasi Firebase Anda
import AsyncStorage from '@react-native-async-storage/async-storage';

const Payment = ({ route, navigation }) => {
  // Ambil data cartItems dan totalPrice dari params
  const { cartItems, totalPrice } = route.params || { cartItems: [], totalPrice: 0 };

  const handleConfirmTransfer = async () => {
    try {
        const uid = await AsyncStorage.getItem('@token')

      // Simpan data pembelian ke Realtime Database
      await Fire.database().ref('dataPembelian').push({
        items: cartItems,
        totalPrice: totalPrice,
        accountNumber: '02000000000',
        accountName: 'Enggita Salsabilla',
        timestamp: new Date().toISOString(),
        uid: uid // Menyimpan timestamp saat ini
      });

      alert('Data pembelian berhasil disimpan. Anda akan mendapatkan WhatsApp dari Tim kami untuk konfirmasi selanjutnya ');
      navigation.replace('Home') // Kembali ke halaman sebelumnya setelah penyimpanan
    } catch (error) {
      console.error('Error saving purchase data:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.paymentCard}>
        <Image source={{uri: 'https://buatlogoonline.com/wp-content/uploads/2022/10/Logo-Bank-BRI.png'}} style={styles.bankLogo} />
        <Text style={styles.title}>Informasi Pembayaran</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Rekening BRI: </Text>02000000000
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Atas Nama: </Text>Enggita Salsabilla
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Total Pembayaran: </Text>Rp {totalPrice}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTransfer}>
        <Text style={styles.confirmButtonText}>Sudah Transfer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0f7fa',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginVertical: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bankLogo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c94df',
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#004d40',
  },
  label: {
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#2c94df',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '90%',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
