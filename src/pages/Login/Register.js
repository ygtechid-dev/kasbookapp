import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import Fire from '../../config/Fire';
import MainLogo from '../../assets/harumpeduli.jpeg'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Divider } from 'react-native-paper';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nomor, setNomor] = useState('');

  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading]= useState(false)

  const [inputan, setInput] = useState({
    name: "",
    phonenumber: "",
    email: "",
    password: "",
    
  })

  
  const togglePasswordVisibility = () => {
    setHidePassword(!hidePassword);
  };


  const handleRegister = () => {
    Fire.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save additional user data in Firebase Realtime Database
        Fire.database().ref('dataUser/' + user.uid).set({
          name,
          email,
          nomor,
        });
        Alert.alert('Registration Success', `Welcome, ${name}`);
        navigation.navigate('Login'); // Redirect to login after registration
      })
      .catch((error) => {
        Alert.alert('Registration Error', error.message);
      });
  };

  return (
    <>
    <View style={styles.container}>
      <View
        style={styles.wrapper}>
        <>
         
         <View style={{flexDirection: 'row'}}>
         <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
      
      <Text style={styles.txtDesc}>Sign Up</Text>
         </View>
       
         <Divider style={{marginTop: 20, width: '100%', color: 'white'}} bold={true}/>
        
        <View style={{alignItems: 'center', marginTop: 20,}}>
        <Text style={[styles.txtDesc, {
          marginTop: 14,
          marginLeft: -5
        }]}>Create New Account</Text>

        </View>
        <View style={{marginTop: 40, paddingHorizontal: 10}}>
        <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.txtInput}
            placeholderTextColor="grey" 
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
            <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.txtInput}
            placeholderTextColor="grey" 
            placeholder="Phone Number"
            value={nomor}
            onChangeText={setNomor}
          />
        <TextInput
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.txtInput}
            placeholderTextColor="grey" 
            placeholder="Email Address"
            value={email}
        onChangeText={setEmail}
          />
            <View style={styles.formInput}>
            <TextInput
           
           style={styles.txtInput}
           placeholderTextColor="grey" 
           placeholder="Password"
           value={password}
           onChangeText={setPassword}
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
             onPress={handleRegister}
              >
        <Text style={styles.txtBtn} >Sign Up</Text>
    </TouchableOpacity>
    <Text
        style={styles.link}
        onPress={() => handleRegister()}
      >
    Already Have a Account? Sign In
      </Text>
       </>
      }
         
   

   
     

        </>
      </View>
    </View>
  
   
    
    </>
    
  );
};

export default Register;

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
  marginBottom: 16,

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
