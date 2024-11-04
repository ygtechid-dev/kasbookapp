/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLogo from '../../assets/harumpeduli.jpeg';
import Logo from '../../assets/ladjulogo.png';

import Fire from '../../config/Fire';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-paper';

const Login = ({navigation}) => {
  const [inputan, setInput] = useState({
    email: "",
    password: "",
    
  })
  const [loading, setLoading]= useState(false)
  const [visibleIklan, setVisibleIklan]= useState(true)

  const [hidePassword, setHidePassword] = useState(true);
  const [dataSetting, setDataSetting] = useState({});

  console.log('inputan', inputan);



  
  const handleLogin = async () => {
    setLoading(true);
  
 
  // AsyncStorage.setItem('@token', token)
    
  if(inputan.email == "") {
    setLoading(false)

    alert('Silahkan input email')

   } else if(inputan.password == "") {
    setLoading(false)

    alert('Silahkan input password')

   } else {

    Fire.auth()
      .signInWithEmailAndPassword(inputan.email, inputan.password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Simpan token (atau UID user) ke AsyncStorage
        try {
          await AsyncStorage.setItem('@token', user.uid); // UID sebagai token
          Alert.alert('Login Success', `Welcome, ${user.email}`);
          navigation.replace('Home'); // Navigasi ke halaman Home
        } catch (error) {
          Alert.alert('Storage Error', 'Failed to save token');
        }

      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Login Error', error.message);
      });
  }
}
  
   


   
   
 
    
      

    

     


  // if(inputan.email == "admin@gmail.com" && inputan.password == "admin") {
  //     navigation.navigate('Home')
  
  //     console.log('token', token);
  // } else {
  //     alert('Email dan Password Salah!')
  // }
  
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const handleRegister = async () => {
    
       navigation.navigate('Register')
      
   }
  
  return (
    <>
    <View style={styles.container}>
      <View
        style={styles.wrapper}>
        <>
         
         <View style={{flexDirection: 'row'}}>
         <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
      
      <Text style={styles.txtDesc}>Sign In</Text>
         </View>
       
         <Divider style={{marginTop: 20, width: '100%', color: 'white'}} bold={true}/>
        
        <View style={{alignItems: 'center', marginTop: 20,}}>
        <Image source={Logo} style={{ width: 130, height: 130 }} />
        <Text style={[styles.txtDesc, {
          marginTop: 14,
          marginLeft: -5
        }]}>Ladju Repair</Text>

        </View>
        <View style={{marginTop: 40, paddingHorizontal: 10}}>
          
        <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.txtInput}
            placeholderTextColor="grey" 
            placeholder="Email Address"
            onChangeText={(e) => setInput({ ...inputan, email: e })}  
          />
            <View style={styles.formInput}>
            <TextInput
           
           style={styles.txtInput}
           placeholderTextColor="grey" 
           placeholder="Password"
           onChangeText={(e) => setInput({ ...inputan, password: e })}  
           secureTextEntry={hidePassword}
         />
 <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggleButton}>
              <Text style={styles.toggleText}>{hidePassword ? 'Lihat' : 'Tutup'}</Text>
            </TouchableOpacity>
           
            </View>
         
       
        </View>
        
       


       {loading ? 
       <ActivityIndicator size="large" color="black" />
       :
       <>

<TouchableOpacity style={styles.btn} 
             onPress={handleLogin}
              >
        <Text style={styles.txtBtn} >Login</Text>
    </TouchableOpacity>
    <Text
        style={styles.link}
        onPress={() => handleRegister()}
      >
   Don't have an account? Register Here
      </Text>
       </>
      }
         
   

   
     

        </>
      </View>
    </View>
  
   
    
    </>
    
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#2c94df', },
  wrapper: {
    // alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 30,
  },
wrapHeader: {flexDirection: 'row', justifyContent: 'space-between'},
txtHead: {color: 'black', fontWeight: 'bold', fontSize: 24,  marginTop: 10,},
descHead: {color: '#8D92A3',  fontSize: 16, marginBottom: 30, marginTop: 10,},
txtDesc: {
  color: 'white',
  marginLeft: 16, 
  fontSize: 20,
  marginTop: -2
},
txtInput: {
  backgroundColor: 'white',
  borderRadius: 12,
  marginBottom: 8,

  paddingHorizontal: 20,
  width: '100%',
  color: 'black'
},
link: {
  marginTop: 10,
  textAlign: 'center',
  marginLeft: 0,
  marginBottom: -20,
  color: 'white',
},
toggleButton: {
  position: 'absolute',
  right: 10,
  top: 40,
},
toggleText: {
  color: '#005B8F',
  fontSize: 14,
  fontWeight: '600',
  marginRight: 10,
  marginTop: -27
},
formInput: {
  marginVertical: 5
},
// txtInput: {
//   height: 50,
//   borderColor: '#020202',
//   borderWidth: 1,
//   borderRadius: 10,
//   paddingLeft: 10
// },
btn: {backgroundColor: 'white', width: '90%', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 30, alignSelf: 'center'},
txtBtn: {textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'black', fontWeight: 'bold'}
});
