import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';

const TabItem = ({title, active, onPress, onLongPress}) => {
  const Icon = () => {
    if (title == 'Penjualan') {
      return active ?  <FontAwesomeIcon5 name="shopping-bag" size={25} color="red" /> :  <FontAwesomeIcon5 name="shopping-bag" size={25} color="grey" />;
    }
    if (title == 'Keuangan') {
        return active ?   <FontAwesomeIcon5 name="money-bill-wave" size={25} color="red" /> :  <FontAwesomeIcon5 name="money-bill-wave" size={25} color="grey" />;
      }
      if (title == 'Produk') {
        return active ?   <FontAwesomeIcon5 name="box-open" size={25} color="red" /> :  <FontAwesomeIcon5 name="box-open" size={25} color="grey" />
      }
      if (title == 'Laporan') {
        return active ?   <FontAwesomeIcon5 name="file" size={25} color="red" /> :  <FontAwesomeIcon5 name="file" size={25} color="grey" />
      }
      // if (title == 'Setting') {
      //   return active ?   <FontAwesomeIcon5 name="user" size={25} color="#3E67F4" /> :  <FontAwesomeIcon5 name="user" size={25} color="grey" />
      // }
    return  <Icon name='area-chart' color="#1A5D98" size={20} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
}

export default TabItem;

const styles = StyleSheet.create({
  container: {alignItems: 'center', },
  text: (active) => ({
    fontSize: 10,
    marginTop: 3,
    color: active ? 'red' : 'grey',


  
  }),
})