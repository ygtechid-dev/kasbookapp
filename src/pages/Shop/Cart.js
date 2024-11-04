import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Fire from '../../config/Fire';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation, route }) => {
  const { cartItems } = route.params || { cartItems: [] };
  console.log('CART', cartItems);

  // State untuk memilih metode pengiriman
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // 'pickup' atau 'delivery'
  const [address, setAddress] = useState('');

  // Hitung total harga
  const totalPrice = cartItems.reduce((total, item) => {
    if (!item.price) {
      return total;
    }
  
    const priceNumber = Number(item.price.replace(/[^0-9.-]+/g, ''));
    return total + (isNaN(priceNumber) ? 0 : priceNumber);
  }, 0);

  const formattedTotalPrice = totalPrice.toFixed(3);

  // Simpan data pengiriman ke Firebase
  const handleSaveAddress = async () => {
    if (deliveryOption === 'delivery' && address.trim() === '') {
      alert('Harap isi alamat pengiriman');
      return;
    }

    try {
        const uid = await AsyncStorage.getItem('@token')
        await Fire.database().ref(`dataUser/${uid}`).set({
          deliveryOption,
          address: deliveryOption === 'delivery' ? address : 'Ambil Sendiri',
        });
        // alert('Data Alamat berhasil disimpan');
    
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Terjadi kesalahan saat menyimpan data');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#2c94df' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
          <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
          <Text style={styles.headerText}>Keranjang Belanja</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ marginTop: 20 }}>
        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Keranjang Anda kosong</Text>
          </View>
        ) : (
          cartItems.map((item, index) => (
            <View key={index} style={styles.cartItemContainer}>
              <View>
                <Text style={styles.itemText}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
              <TouchableOpacity
                onPress={() => alert(`${item.name} dihapus dari keranjang (implementasi penghapusan diperlukan)`)}
                style={styles.removeButton}
              >
                <Text style={styles.removeButtonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {/* Opsi Pengiriman */}
      <View style={styles.deliveryContainer}>
        <Text style={styles.deliveryText}>Metode Pengiriman:</Text>
        <TouchableOpacity
          style={[styles.deliveryOption, deliveryOption === 'pickup' && styles.selectedOption]}
          onPress={() => setDeliveryOption('pickup')}
        >
          <Text style={styles.optionText}>Ambil Sendiri</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.deliveryOption, deliveryOption === 'delivery' && styles.selectedOption]}
          onPress={() => setDeliveryOption('delivery')}
        >
          <Text style={styles.optionText}>Kirim ke Alamat</Text>
        </TouchableOpacity>
      </View>

      {deliveryOption === 'delivery' && (
        <TextInput
          style={styles.input}
          placeholder="Masukkan Alamat Pengiriman"
          placeholderTextColor="#ccc"
          value={address}
          onChangeText={setAddress}
        />
      )}

      {/* Total Price Display */}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: Rp {formattedTotalPrice}</Text>
        </View>
      )}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => {
            handleSaveAddress();
            navigation.navigate('Payment', { cartItems, totalPrice: formattedTotalPrice });
          }}
        >
          <Text style={styles.checkoutButtonText}>Lanjutkan ke Pembayaran</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    backgroundColor: '#2c94df',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyCartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCartText: {
    color: 'white',
    fontSize: 16,
  },
  cartItemContainer: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: 'grey',
    fontSize: 14,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  totalText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deliveryContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  deliveryText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  deliveryOption: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#00b894',
  },
  optionText: {
    color: 'black',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 20,
    color: 'black',
  },
  checkoutButton: {
    backgroundColor: '#00b894',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
