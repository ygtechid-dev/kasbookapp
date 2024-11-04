import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const List = ({ navigation }) => {
  const handleEditProfile = () => {
    // Navigate to Edit Profile screen (you need to implement this screen)
    navigation.navigate('EditProfile');
  };

  const handleAboutUs = () => {
    // Show About Us information (you can implement a modal or navigate to another screen)
    // Alert.alert('About Us', 'This is the about us section of the application.');
    navigation.navigate('TentangKami');

  };

  const handleLogout = () => {
    // Handle Logout (you can clear async storage and navigate to login screen)
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => {
          // Clear async storage and navigate to login screen
         AsyncStorage.clear(); 
         navigation.navigate('Login');
          console.log('User logged out');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesome5Icon name="chevron-left" size={22} color={'white'} />
        </TouchableOpacity>
        <Text style={styles.header}>Settings</Text>
      </View>

<View style={{marginTop: 20}}>
<TouchableOpacity style={styles.option} onPress={handleEditProfile}>
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option} onPress={handleAboutUs}>
        <Text style={styles.optionText}>Tentang Kami</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.option, {
        backgroundColor: 'red'
      }]} onPress={handleLogout}>
        <Text style={[styles.optionText, {
          color: 'white',
          fontWeight: 'bold',
          textAlign: 'center'
        }]}>Logout</Text>
      </TouchableOpacity>
</View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#2c94df',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
    textAlign: 'center',
    marginLeft: -20
  },
  option: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    color: '#333',
  },
});

export default List;
