import { StyleSheet, Text, View, BackHandler, ActivityIndicator, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import HeaderSecond from '../../component/Header/HeaderSecond';
import { conversiDateTimeIDN, getDate, getTimeOnly } from '../../context/DateTimeServices';
import moment from 'moment';
import { Modal } from 'react-native-paper';
import Fire from '../../config/Fire';
import DatePicker from 'react-native-date-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ScanManual = ({ route, navigation }) => {
  
  const [loading, setLoading] = useState(false);
  const [openTimeF, setOpenTimeF] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timeF, setTimeF] = useState("");

  const [inputan, setInput] = useState({
    tglexpired: "",
    stok: "",
    barcode: "",
    namabarang: "",
    kode_plu: ""
  });

  const handleTimeF = (dates) => {
    const conversi = getDate(dates);
    setTimeF(conversi);
  };

  const getDataBarang = async (barcode) => {
    setLoading(true);
    let limit = 100; 
    let lastKey = null; 
    let found = false; 
    let allData = []; 

    try {
        console.log('Mencari barcode:', barcode); // Debug barcode yang dicari
        
        const loadMoreData = async () => {
            let query = Fire.database().ref('dataBarang').limitToFirst(limit);
            
            if (lastKey) {
                query = Fire.database().ref('dataBarang').orderByKey().startAt(lastKey).limitToFirst(limit + 1);
            }

            const snapshot = await query.once('value');
            const value = snapshot.val();

            if (value) {
                const datled = Object.values(value);
                console.log('Data dari database:', datled); // Debug data yang diterima dari database

                if (lastKey) {
                    datled.shift();
                }

                allData = [...allData, ...datled];

                const filteredData = datled.find(item => item.barcode == barcode);
                console.log('Filtered Data:', filteredData); // Debug data yang difilter

                if (filteredData) {
                    setInput({
                        ...inputan,
                        namabarang: filteredData.nama_barang,
                        kode_plu: filteredData.kode_plu
                    });
                    found = true; 
                    alert('Data ditemukan! Silahkan isi Stok dan Expired Date')
                    console.log("Data ditemukan:", filteredData); 
                    return true; 
                }

                if (datled.length > 0) {
                    lastKey = Object.keys(value)[Object.keys(value).length - 1];
                }

                if (datled.length < limit) {
                    console.log("Tidak ada data lebih lanjut untuk diambil."); 
                    return false; 
                }

                return await loadMoreData(); 
            } else {
                console.log("Value adalah null, tidak ada data."); 
                return false;
            }
        };

        const isDataFound = await loadMoreData();
        setLoading(false);
        return isDataFound;
    } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
        return false;
    }
};


  const handleBarcodeInput = (barcode) => {
    setInput({ ...inputan, barcode }); // Mengupdate input barcode
  };

  const handlePeriksa = async () => {
    const { barcode } = inputan; // Ambil barcode dari inputan
    if (barcode) {
      const barcodeExists = await getDataBarang(barcode); // Cek keberadaan barcode
      if (!barcodeExists) {
        Alert.alert('Data Barang tidak valid', 'Silakan masukkan barcode yang benar.');
      }
    } else {
      Alert.alert('Input barcode', 'Silakan masukkan barcode sebelum memeriksa.');
    }
  };

  const handleSimpan = async () => {
    const prefix = "IB";
    const uniquenumber = Math.floor(Math.random() * 1000000);
    const idOrder = prefix + uniquenumber;
    const dataSelf = await AsyncStorage.getItem('@dataSelf');
    const parsingData = JSON.parse(dataSelf);
    
    const jsObj = {
      nama_barang: inputan.namabarang,  // Ambil nama_barang dari inputan
      kode_plu: inputan.kode_plu,        // Ambil kode_plu dari inputan
      exp_date: timeF,
      nama_user: parsingData[0].nama_user,
      stok: inputan.stok,
      tanggal_cek: moment().format('YYYY-MM-DD'),
     jam_cek: moment().format('HH:mm:ss')

    };
    console.log('JSOCCCC', jsObj);
    

    setLoading(true);
    Fire.database()
      .ref('dataExpired/' + idOrder + '/')
      .set(jsObj)
      .then((resDB) => {
        console.log('rrr', resDB);
        setLoading(false);
        Alert.alert('Berhasil Simpan Data');
        navigation.replace('Home');
      })
      .catch(error => {
        console.error('Error saving data:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderSecond title="Detail QR" desc={"Data Detail QR"} onPressed={() => navigation.goBack()} />
        <View style={{ marginHorizontal: 16 }}>
          <View>
            <Text style={styles.label}>Nama Barang</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor="grey"
              value={inputan.namabarang}
              editable={false} // Nonaktifkan edit jika ingin menampilkan nama dari database
            />
          </View>
          <View>
            <Text style={styles.label}>KODE PLU</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor="grey"
              value={inputan.kode_plu}
              editable={false} // Nonaktifkan edit jika ingin menampilkan kode dari database
            />
            <Text style={styles.label}>STOK</Text>
            <TextInput
              style={styles.txtInput}
              placeholderTextColor="grey"
              value={inputan.stok}
              onChangeText={(e) => setInput({ ...inputan, stok: e })}
            />
          </View>
          <View>
            <Text style={styles.label}>Barcode</Text>
            <View style={styles.barcodeContainer}>
              <TextInput
                style={styles.txtInputBarcode}
                placeholderTextColor="grey"
                value={inputan.barcode}
                onChangeText={handleBarcodeInput} // Ganti handler untuk input barcode
              />
              <TouchableOpacity style={styles.btnPeriksa} onPress={handlePeriksa}>
                <Text style={styles.txtPeriksa}>Periksa</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Expired Date</Text>
            <TouchableOpacity onPress={() => setOpenTimeF(true)} style={styles.datePicker}>
              <Text style={[styles.txtHead, {
                marginTop: 15,
                fontSize: 16,
                marginLeft: 12,
                marginBottom: 5,
                color: 'black',
                fontFamily: 'Poppins-Light'
              }]}>{timeF !== "" ? timeF : 'Tap To Select'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn} onPress={handleSimpan}>
              <Text style={styles.txtBtn}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal visible={loading}>
        <ActivityIndicator size="large" color="black" />
      </Modal>
      <DatePicker
        modal
        open={openTimeF}
        date={date}
        mode="date"
        onConfirm={(date) => {
          setOpenTimeF(false);
          handleTimeF(date);
        }}
        onCancel={() => {
          setOpenTimeF(false);
        }}
      />
    </>
  );
};

export default ScanManual;

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    marginTop: 20,
    fontFamily: 'Poppins-Bold',
    color: 'black',
    textAlign: 'justify'
  },
  txtInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    color: 'black',
  },
  txtInputBarcode: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    backgroundColor: '#fff',
    color: 'black',

  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnPeriksa: {
    backgroundColor: 'green', // Ganti warna tombol
    borderRadius: 5,
    padding: 10,
    marginLeft: 10,
  },
  txtPeriksa: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  datePicker: {
    width: '100%',
    height: 60,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#7F6000'
  },
  btn: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  txtBtn: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
