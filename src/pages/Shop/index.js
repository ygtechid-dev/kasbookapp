import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { Button, Divider, Modal } from 'react-native-paper'
import BanCorsa from '../../assets/ban_corsa.png';
import BanFdr from '../../assets/ban_fdr.jpg';
import BanMaxis from '../../assets/prod_banmaxis.jpg';
import OliYamalube from '../../assets/prod_oliyamalube.png';
import OliEnduro from '../../assets/oli_enduro.png';
import Vbeltnmax from '../../assets/prod_venbeltnmax.jpg';

import { AirbnbRating } from 'react-native-ratings'

const Shop = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const addToCart = (name, price) => {
    setCart([...cart, { name, price }]);
    alert(`${name} dengan harga ${price} telah ditambahkan ke keranjang.`);
  };
  
  const handlePress = () => {
    setVisibleModal(false);
    alert('Terima kasih. Anda sudah memberikan penilaian');
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#2c94df' }}>
        {/* Header with Cart and History Icons */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row' }}>
            <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
            <Text style={[styles.txtDesc, { marginLeft: 10 }]}>Shop Sparepart | LadjuRepair.</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => navigation.navigate('Cart', { cartItems: cart })} style={{ marginRight: 20 }}>
              <FontAwesome5Icon name="shopping-cart" size={22} color={'white'} />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('History')}>
              <FontAwesome5Icon name="history" size={22} color={'white'} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          <View style={{ marginHorizontal: 30, marginTop: 30 }}>
            <Divider style={{ marginTop: 20, width: '100%', color: 'white' }} bold={true} />

            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
  <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }} onPress={() => addToCart('Ban Maxxis Ring 17', 'Rp 213.900')}>
    <Image source={BanMaxis} style={{ width: 125, height: 125, borderRadius: 16 }} />
    <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>Ban Maxxis Ring 17</Text>
    <Text style={{ textAlign: 'center', marginTop: 5, color: 'black' }}>Rp 213.900,-</Text>
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <MaterialIcon name="star" size={20} color={'gold'} />
      <Text style={{ textAlign: 'center', marginTop: 5, color: 'grey', fontSize: 10 }}>5.0 (1444 Penilaian)</Text>
    </View>
    <Text onPress={() => setVisibleModal(true)} style={{ textAlign: 'center', marginTop: 5, color: 'blue', fontSize: 10, fontWeight: 'bold' }}>Beri Penilaian</Text>
    <Button mode="contained" onPress={() => addToCart('Ban Maxxis Ring 17', 'Rp 213.900')} style={{ marginTop: 10 }}>
      Add to Cart
    </Button>
  </TouchableOpacity>

  <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }} onPress={() => addToCart('Ban Corsa Ring 14', 'Rp 239.000')}>
    <Image source={BanCorsa} style={{ width: 125, height: 125, borderRadius: 16 }} />
    <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>Ban Corsa Ring 14</Text>
    <Text style={{ textAlign: 'center', marginTop: 5, color: 'black' }}>Rp 239.000,-</Text>
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <MaterialIcon name="star" size={20} color={'gold'} />
      <Text style={{ textAlign: 'center', marginTop: 5, color: 'grey', fontSize: 10 }}>5.0 (537 Penilaian)</Text>
    </View>
    <Text onPress={() => setVisibleModal(true)} style={{ textAlign: 'center', marginTop: 5, color: 'blue', fontSize: 10, fontWeight: 'bold' }}>Beri Penilaian</Text>
    <Button mode="contained" onPress={() => addToCart('Ban Corsa Ring 14', 'Rp 239.000')} style={{ marginTop: 10 }}>
      Add to Cart
    </Button>
  </TouchableOpacity>
</View>

<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
  <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }} onPress={() => addToCart('Oli Yamalube', 'Rp 43.900')}>
    <Image source={OliYamalube} style={{ width: 125, height: 125, borderRadius: 16 }} />
    <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>Oli Yamalube</Text>
    <Text style={{ textAlign: 'center', marginTop: 5, color: 'black' }}>Rp 43.900,-</Text>
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <MaterialIcon name="star" size={20} color={'gold'} />
      <Text style={{ textAlign: 'center', marginTop: 5, color: 'grey', fontSize: 10 }}>5.0 (244 Penilaian)</Text>
    </View>
    <Text onPress={() => setVisibleModal(true)} style={{ textAlign: 'center', marginTop: 5, color: 'blue', fontSize: 10, fontWeight: 'bold' }}>Beri Penilaian</Text>
    <Button mode="contained" onPress={() => addToCart('Oli Yamalube', 'Rp 43.900')} style={{ marginTop: 10 }}>
      Add to Cart
    </Button>
  </TouchableOpacity>

  <TouchableOpacity style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }} onPress={() => addToCart('Oli Enduoro', 'Rp 53.900')}>
    <Image source={OliEnduro} style={{ width: 125, height: 125, borderRadius: 16 }} />
    <Text style={{ textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black' }}>Oli Enduro</Text>
    <Text style={{ textAlign: 'center', marginTop: 5, color: 'black' }}>Rp 53.900,-</Text>
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <MaterialIcon name="star" size={20} color={'gold'} />
      <Text style={{ textAlign: 'center', marginTop: 5, color: 'grey', fontSize: 10 }}>5.0 (237 Penilaian)</Text>
    </View>
    <Text onPress={() => setVisibleModal(true)} style={{ textAlign: 'center', marginTop: 5, color: 'blue', fontSize: 10, fontWeight: 'bold' }}>Beri Penilaian</Text>
    <Button mode="contained" onPress={() => addToCart('Oli Enduoro', 'Rp 53.900')} style={{ marginTop: 10 }}>
      Add to Cart
    </Button>
  </TouchableOpacity>
</View>


            {/* Tambahkan produk lainnya dengan format yang sama */}
          </View>
        </ScrollView>
      </View>
      <Modal visible={visibleModal}>
        <View style={{ backgroundColor: 'white', width: 300, padding: 16, borderRadius: 12, alignSelf: 'center' }}>
          <AirbnbRating count={5} reviews={["Tidak Baik", "Kurang Baik", "Cukup", "Baik", "Sangat Baik"]} defaultRating={5} size={30} />
          <Button mode="contained" style={{ marginTop: 20, width: 200, alignSelf: 'center' }} buttonColor="#2c94df" onPress={handlePress}>
            Simpan
          </Button>
        </View>
      </Modal>
    </>
  );
}

export default Shop;

const styles = StyleSheet.create({
  txtDesc: {
    color: 'white',
    marginLeft: 0,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
  cartBadge: {
    position: 'absolute',
    right: -8,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 2,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
