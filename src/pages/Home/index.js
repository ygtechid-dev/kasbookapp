import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Divider } from 'react-native-paper'
import Logo from '../../assets/ladjulogo.png';
import Maintenance from '../../assets/logomaintenance.png';
import LogoAccess from '../../assets/logoaccess.png';
import LogoSystem from '../../assets/logosystem.png';
import LogoShop from '../../assets/logoshop.png';



const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#2c94df'}}>
      <View style={{   marginHorizontal: 30,
    marginTop: 30,}}>
      <View style={{flexDirection: 'row'}}>
      
      <Text style={styles.txtDesc}>LadjuRepair.</Text>
         </View>
       
         <Divider style={{marginTop: 20, width: '100%', color: 'white'}} bold={true}/>
         <View style={{alignItems: 'center', marginTop: 20,}}>
        <Image source={Logo} style={{ width: 150, height: 150 }} />
       
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
          <TouchableOpacity style={{borderRadius:20}} onPress={() => navigation.push('Maintenance')}>
        <Image source={Maintenance} style={{ width: 125, height: 125, borderRadius: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{borderRadius:20}} onPress={() => navigation.push('Access')}>
        <Image source={LogoAccess} style={{ width: 125, height: 125, borderRadius: 20 }} />
          </TouchableOpacity>

        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30}}>
        <TouchableOpacity style={{borderRadius:20}} onPress={() => navigation.push('System')}>
        <Image source={LogoSystem} style={{ width: 125, height: 125, borderRadius: 20 }} />
          </TouchableOpacity>

          <TouchableOpacity style={{borderRadius:20}} onPress={() => navigation.push('Shop')}>
        <Image source={LogoShop} style={{ width: 125, height: 125, borderRadius: 20 }} />
          </TouchableOpacity>

        </View>
      </View>
       
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  txtDesc: {
    color: 'white',
    marginLeft: 0, 
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2
  },
})