import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Divider } from 'react-native-paper'
import Logo from '../../assets/ladjulogo.png';
import Maintenances from '../../assets/logomaintenance.png';
import OilChange from '../../assets/moilchange.png';
import Akses from '../../assets/akses.png';
import PatchBand from '../../assets/mpatchban.png';



const Access = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#2c94df'}}>
      <View style={{   marginHorizontal: 30,
    marginTop: 30,}}>
      <TouchableOpacity  onPress={() => navigation.goBack()} style={{flexDirection: 'row'}}>
        
      <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
      
      <Text style={[styles.txtDesc, {
        marginLeft: 10
      }]}>Access | LadjuRepair.</Text>
         </TouchableOpacity>
       
         <Divider style={{marginTop: 20, width: '100%', color: 'white'}} bold={true}/>
         <View style={{alignItems: 'center', marginTop: 20,borderRadius: 20}}>
        <Image source={Logo} style={{ width: 150, height: 150, }} />
       
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
          <TouchableOpacity onPress={() => navigation.push('LokasiBengkel')}>
        <Image source={Akses} style={{ width: 175, height: 175,  borderRadius: 20 }} />
          </TouchableOpacity>
          

        </View>
        <Text style={[styles.txtDesc, {
            textAlign: 'center',
            width: 200,
            marginLeft: 70,
            marginTop: 20
        }]}>Layanan Darurat
Untuk Perjalanan Anda</Text>
        
      </View>
       
    </View>
  )
}

export default Access

const styles = StyleSheet.create({
  txtDesc: {
    color: 'white',
    marginLeft: 0, 
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2
  },
})