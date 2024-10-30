import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Alert, Image } from 'react-native';
import Fire from '../../config/Fire';
import MainLogo from '../../assets/harumpeduli.jpeg'

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nomorHandphone, setNomorHandphone] = useState('');
  const [lokasiDefault, setLokasiDefault] = useState('Jakarta');


  const handleRegister = () => {
    Fire.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save additional user data in Firebase Realtime Database
        Fire.database().ref('dataUser/' + user.uid).set({
          name,
          email,
          nomorHandphone,
          lokasiDefault
        });
        Alert.alert('Registration Success', `Welcome, ${name}`);
        navigation.navigate('Login'); // Redirect to login after registration
      })
      .catch((error) => {
        Alert.alert('Registration Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
        <Image source={MainLogo} style={{width: 130, height: 70,  marginTop: 10, alignSelf: 'center'}} />

      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
       <TextInput
        style={styles.input}
        placeholder="Nomor Handphone"
        value={nomorHandphone}
        onChangeText={setNomorHandphone}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button color={'#005B8F'} title="Register" onPress={handleRegister} />
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Login')}
      >
        Already have an account? Login here
      </Text>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    textColor: 'black'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#005B8F',
  },
});
