import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransaksiKeuangan = ({ navigation }) => {
  const [data, setData] = useState([]);

  // Fungsi untuk mengambil data dari AsyncStorage
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dataKeuangan');
      console.log('XXX', storedData);
      
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setData(parsedData); // Set the parsed array directly
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Mengambil data saat komponen dipasang
  useEffect(() => {
    loadData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.tanggal}>{item.tanggal}</Text>
      <Text style={[styles.transaksi, item.transaksi === 'Pendapatan' ? styles.pendapatan : styles.biaya]}>
        {item.transaksi}
      </Text>
      <Text style={styles.akun}>{item.akun}</Text>
      <Text style={styles.nominal}>{item.nominal}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TRANSAKSI KEUANGAN</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Cari" />
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.push('InputKeuangan')}>
          <Text style={styles.addButtonText}>+ Transaksi</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Tanggal</Text>
        <Text style={styles.tableHeaderText}>Transaksi</Text>
        <Text style={styles.tableHeaderText}>Akun</Text>
        <Text style={styles.tableHeaderText}>Nominal</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Menggunakan index sebagai key
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { backgroundColor: 'red', padding: 15, alignItems: 'center' },
  headerText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  searchContainer: { flexDirection: 'row', paddingHorizontal: 10, alignItems: 'center', paddingVertical: 10 },
  searchInput: { flex: 1, borderColor: '#ccc', borderWidth: 1, borderRadius: 10, padding: 8, marginRight: 10 },
  addButton: { backgroundColor: 'red', padding: 10, borderRadius: 10 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  tableHeader: { flexDirection: 'row', paddingHorizontal: 10, backgroundColor: 'black', paddingVertical: 8 },
  tableHeaderText: { flex: 1, color: 'white', fontWeight: 'bold', textAlign: 'center' },
  itemContainer: { flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  tanggal: { flex: 1, textAlign: 'center' },
  transaksi: { flex: 1, textAlign: 'center', fontWeight: 'bold' },
  akun: { flex: 1, textAlign: 'center' },
  nominal: { flex: 1, textAlign: 'center', color: 'red' },
  pendapatan: { color: 'blue' },
  biaya: { color: 'red' },
});

export default TransaksiKeuangan;
