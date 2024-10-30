import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title == 'Beranda') {
      return active ?  <FontAwesomeIcon5 name="home" size={30} color="#ff6f00" /> :  <FontAwesomeIcon5 name="home" size={30} color="grey" />;
    }
    if (title == 'Peta Navigasi') {
        return active ?   <FontAwesomeIcon5 name="book" size={30} color="#ff6f00" /> :  <FontAwesomeIcon5 name="book" size={30} color="grey" />;
      }
      if (title == 'Profil') {
        return active ?   <FontAwesomeIcon5 name="cog" size={30} color="#ff6f00" /> :  <FontAwesomeIcon5 name="cog" size={30} color="grey" />
      }
      // if (title == 'Setting') {
      //   return active ?   <FontAwesomeIcon5 name="user" size={25} color="#3E67F4" /> :  <FontAwesomeIcon5 name="user" size={25} color="grey" />
      // }
    return  <Icon name='area-chart' color="#ff6f00" size={20} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon />
    </TouchableOpacity>
  );
}

export default TabItem;

const styles = StyleSheet.create({
  container: {alignItems: 'center', },
  text: (active) => ({
    fontSize: 10,
    marginTop: 3,
    color: active ? '#ff6f00' : 'grey',


  
  }),
})