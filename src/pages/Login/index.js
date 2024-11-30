/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

const Login = ({navigation}) => {
  const [inputan, setInput] = useState({
    email: "",
    password: "",
    
  })
  const [loading, setLoading]= useState(false)
  const [hidePassword, setHidePassword] = useState(true);

  console.log('inputan', inputan);

  const handleLogin = async () => {

    const prefix = "KBOOK-";
    const uniquenumber = Math.floor(Math.random() * 1000000);
    const tokz = prefix + uniquenumber
    AsyncStorage.setItem('@token', tokz)

navigation.push('Home');

}
  
   


   
   
 
    
      

    

     


  
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };
  const handleRegister = async () => {
    
       navigation.navigate('Register')
      
   }
  
  return (
    <View style={styles.container}>
      <View
        style={styles.wrapper}>
        <>
         
      
      
      <View style={styles.wrapHeader}>
      <View>
      <Text style={styles.txtHead}>Selamat Datang,</Text>
        <Text style={styles.descHead}>di Aplikasi Kasbook</Text>
      </View>
      <View>
      <FontAwesomeIcon5 name="wallet" size={30} color="red" style={{marginTop: 30, marginRight: 30}} />
    

      </View>
      </View>
     
        
        {/* <View style={{marginTop: 40}}>
          
        <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.txtInput}
            placeholderTextColor="grey" 
            placeholder="Username"
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
         
       
        </View> */}
        
       


       {loading ? 
       <ActivityIndicator size="large" color="black" />
       :
       <>

<TouchableOpacity style={styles.btn} 
             onPress={handleLogin}
              >
        <Text style={styles.txtBtn} >Masuk</Text>
    </TouchableOpacity>

       </>
      }
         
   

   
     

        </>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', },
  wrapper: {
    // alignItems: 'center',

    marginLeft: 30,
    marginTop: 30,
  },
wrapHeader: {flexDirection: 'row', justifyContent: 'space-between'},
txtHead: {color: 'black', fontWeight: 'bold', fontSize: 24,  marginTop: 10,},
descHead: {color: '#8D92A3',  fontSize: 16, marginBottom: 30, marginTop: 10,},
txtInput: {
  backgroundColor: 'white',
  borderRadius: 12,
  marginBottom: 8,
  borderWidth: 0.5,
  borderColor: 'black',
  width: '90%',
  color: 'black'
},
toggleButton: {
  position: 'absolute',
  right: 10,
  top: 40,
},
toggleText: {
  color: 'green',
  fontSize: 14,
  fontWeight: '600',
  marginRight: 40,
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
btn: {backgroundColor: 'red', width: '90%', height: 40,  marginBottom: 10, borderRadius: 8, marginTop: 10},
txtBtn: {textAlign: 'center', marginTop:3, fontSize: 14, fontFamily: 'Poppins-Light', paddingVertical: 5, color: 'white', fontWeight: 'bold'}
});
