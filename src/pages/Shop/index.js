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

import Akses from '../../assets/akses.png';
import PatchBand from '../../assets/mpatchban.png';
import { AirbnbRating } from 'react-native-ratings'



const Shop = ({navigation}) => {

  const [visibleModal, setVisibleModal] = useState(false)

  const handlePress = () => {
    setVisibleModal(false)
    alert('Terima kasih. Anda sudah memberikan penilaian')
  }
  return (
    <>
    <View style={{flex: 1, backgroundColor: '#2c94df'}}>
        <ScrollView>
        <View style={{   marginHorizontal: 30,
    marginTop: 30,}}>
      <TouchableOpacity  onPress={() => navigation.goBack()} style={{flexDirection: 'row'}}>
        
      <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
      
      <Text style={[styles.txtDesc, {
        marginLeft: 10
      }]}>Shop Sparepart | LadjuRepair.</Text>
         </TouchableOpacity>
       
         <Divider style={{marginTop: 20, width: '100%', color: 'white'}} bold={true}/>
         <View style={{alignItems: 'center', marginTop: 20,}}>
       
       
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
          <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Image source={BanMaxis} style={{ width: 125, height: 125, borderRadius: 16 }} />
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black'}}>Ban Maxxis Ring 17</Text>
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'black'}}>Rp 213.900,-</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <MaterialIcon name="star" size={20} color={'gold'} />
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'grey', fontSize: 10}}>5.0 (1444 Penilaian)</Text>
     


        </View>
        <Text onPress={() => setVisibleModal(true)} style={{textAlign: 'center', marginTop: 5,  color: 'blue', fontSize: 10, fontWeight: 'bold'}}>Beri Penilaian</Text>

          </TouchableOpacity>
          

          <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Image source={BanCorsa} style={{ width: 125, height: 125, borderRadius: 16 }} />
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black'}}>Ban Corsa Ring 14</Text>
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'black'}}>Rp 239.000,-</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <MaterialIcon name="star" size={20} color={'gold'} />
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'grey', fontSize: 10}}>5.0 (537 Penilaian)</Text>
     


        </View>
        <Text onPress={() => setVisibleModal(true)} style={{textAlign: 'center', marginTop: 5,  color: 'blue', fontSize: 10, fontWeight: 'bold'}}>Beri Penilaian</Text>

          </TouchableOpacity>

          



        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
        <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Image source={BanFdr} style={{ width: 125, height: 125, borderRadius: 16 }} />
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black'}}>Ban FDR Ring 17</Text>
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'black'}}>Rp 153.000,-</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <MaterialIcon name="star" size={20} color={'gold'} />
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'grey', fontSize: 10}}>5.0 (1789 Penilaian)</Text>
     


        </View>
        <Text onPress={() => setVisibleModal(true)} style={{textAlign: 'center', marginTop: 5,  color: 'blue', fontSize: 10, fontWeight: 'bold'}}>Beri Penilaian</Text>

          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Image source={OliYamalube} style={{ width: 125, height: 125, borderRadius: 16 }} />
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black'}}>Oli Yamalube Matic</Text>
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'black'}}>Rp 48.900,-</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <MaterialIcon name="star" size={20} color={'gold'} />
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'grey', fontSize: 10}}>5.0 (2537 Penilaian)</Text>
     


        </View>
        <Text onPress={() => setVisibleModal(true)} style={{textAlign: 'center', marginTop: 5,  color: 'blue', fontSize: 10, fontWeight: 'bold'}}>Beri Penilaian</Text>

          </TouchableOpacity>


          



        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
        <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Image source={OliEnduro} style={{ width: 125, height: 125, borderRadius: 16 }} />
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black'}}>Oli Enduro Matic</Text>
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'black'}}>Rp 38.000,-</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <MaterialIcon name="star" size={20} color={'gold'} />
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'grey', fontSize: 10}}>5.0 (5001 Penilaian)</Text>
     


        </View>
        <Text onPress={() => setVisibleModal(true)} style={{textAlign: 'center', marginTop: 5,  color: 'blue', fontSize: 10, fontWeight: 'bold'}}>Beri Penilaian</Text>

          </TouchableOpacity>

          

          <TouchableOpacity style={{backgroundColor: 'white', padding: 10, borderRadius: 10}}>
        <Image source={Vbeltnmax} style={{ width: 125, height: 125, borderRadius: 16 }} />
        <Text style={{textAlign: 'center', marginTop: 10, fontWeight: 'bold', color: 'black'}}>V-Belt Nmax</Text>
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'black'}}>Rp 189.900,-</Text>
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <MaterialIcon name="star" size={20} color={'gold'} />
        <Text style={{textAlign: 'center', marginTop: 5,  color: 'grey', fontSize: 10}}>5.0 (102 Penilaian)</Text>
     


        </View>
        <Text onPress={() => setVisibleModal(true)} style={{textAlign: 'center', marginTop: 5,  color: 'blue', fontSize: 10, fontWeight: 'bold'}}>Beri Penilaian</Text>

          </TouchableOpacity>


          



        </View>
        {/* <Text style={[styles.txtDesc, {
            textAlign: 'center',
            width: 200,
            marginLeft: 70,
        }]}>Layanan Darurat
Untuk Perjalanan Anda</Text> */}
        
      </View>
        </ScrollView>
      
       
    </View>
    <Modal visible={visibleModal}>
      <View style={{backgroundColor: 'white',  width: 300, padding: 16, borderRadius: 12, alignSelf: 'center'}}>
      <AirbnbRating
  count={5}
  reviews={["Tidak Baik", "Kurang Baik", "Cukup", "Baik", "Sangat Baik"]}
  defaultRating={5}
  size={30}
/>

<Button 
mode="contained"
style={{marginTop: 20, width: 200, alignSelf: 'center'}}
   buttonColor="#2c94df" onPress={handlePress}
   
   >
    Simpan
  </Button>
      </View>
    </Modal>
    
    </>
  )
}

export default Shop

const styles = StyleSheet.create({
  txtDesc: {
    color: 'white',
    marginLeft: 0, 
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2
  },
})