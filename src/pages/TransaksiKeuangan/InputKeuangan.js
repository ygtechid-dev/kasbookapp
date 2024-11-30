import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InputKeuangan = ({ navigation }) => {
  const [transaksi, setTransaksi] = useState('');
  const [tanggal, setTanggal] = useState(new Date());
  const [akun, setAkun] = useState('');
  const [nominal, setNominal] = useState('');
  const [keterangan, setKeterangan] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Fungsi untuk menyimpan data ke AsyncStorage
  const saveData = async () => {
    try {
      const newData = {
        transaksi,
        tanggal: tanggal.toISOString().split('T')[0], // Format tanggal YYYY-MM-DD
        akun,
        nominal,
        keterangan,
      };
  
      console.log('Data baru:', newData);
      
      // Ambil data yang sudah ada dari AsyncStorage
      const existingData = await AsyncStorage.getItem('dataKeuangan');
      let dataKeuangan = existingData ? JSON.parse(existingData) : [];
  
      // Pastikan dataKeuangan adalah array sebelum melakukan push
      if (!Array.isArray(dataKeuangan)) {
        dataKeuangan = []; // Inisialisasi sebagai array jika bukan array
      }
  
      // Tambahkan data baru ke array
      dataKeuangan.push(newData);
      console.log('Data yang akan disimpan:', dataKeuangan);
  
      // Simpan kembali ke AsyncStorage
      await AsyncStorage.setItem('dataKeuangan', JSON.stringify(dataKeuangan));
      alert('Data berhasil disimpan');
      navigation.goBack();
    } catch (error) {
      console.error('Error menyimpan data:', error);
    }
  };
  

  // Fungsi untuk menghapus semua input
  const clearInputs = () => {
    setTransaksi('');
    setTanggal(new Date());
    setAkun('');
    setNominal('');
    setKeterangan('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>TRANSAKSI KEUANGAN</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text>Transaksi</Text>
          <Picker
            selectedValue={transaksi}
            onValueChange={(itemValue) => setTransaksi(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Pilih Transaksi" value="" />
            <Picker.Item label="Biaya" value="Biaya" />
            <Picker.Item label="Pendapatan" value="Pendapatan" />
          </Picker>
        </View>

        <View style={styles.inputContainer}>
          <Text>Tanggal</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
            <Text>{tanggal.toISOString().split('T')[0]}</Text>
          </TouchableOpacity>
          <Modal
            transparent={true}
            animationType="slide"
            visible={showDatePicker}
            onRequestClose={() => setShowDatePicker(false)}
          >
            <View style={styles.modalContainer}>
              <DatePicker
                date={tanggal}
                mode="date"
                onDateChange={setTanggal}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.buttonText}>Konfirmasi</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>

        <View style={styles.inputContainer}>
          <Text>Akun</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Akun"
            value={akun}
            onChangeText={setAkun}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Nominal</Text>
          <TextInput
            style={styles.input}
            placeholder="Nominal"
            keyboardType="numeric"
            value={nominal}
            onChangeText={setNominal}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text>Keterangan</Text>
          <TextInput
            style={styles.input}
            placeholder="Keterangan"
            value={keterangan}
            onChangeText={setKeterangan}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={clearInputs}>
          <Text style={styles.buttonText}>HAPUS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={saveData}>
          <Text style={styles.buttonText}>SIMPAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  header: { backgroundColor: 'red', padding: 15, alignItems: 'center' },
  headerText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  formContainer: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 10,
    marginHorizontal: 16
  },
  inputContainer: { marginBottom: 15 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
    marginTop: 5,
  },
  picker: {
    height: 40,
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});

export default InputKeuangan;
