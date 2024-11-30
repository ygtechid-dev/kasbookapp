import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import moment from 'moment';
import { Divider } from 'react-native-paper';
import RNPrint from 'react-native-print'; // Import react-native-print

const PenjualanScreen = ({navigation}) => {
  const [tanggal, setTanggal] = useState('');
  const [nomor, setNomor] = useState('');
  const [pelanggan, setPelanggan] = useState('');
  const [barangList, setBarangList] = useState([]);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [printModalVisible, setPrintModalVisible] = useState(false);
  const [namaBarang, setNamaBarang] = useState('');
  const [hargaSatuan, setHargaSatuan] = useState('');
  const [jumlah, setJumlah] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const storedItems = await AsyncStorage.getItem('itemjual');
      if (storedItems) {
        const parsedItems = JSON.parse(storedItems);
        setBarangList(parsedItems);
        const calculatedTotal = parsedItems.reduce((sum, item) => sum + item.totalHarga, 0);
        setTotal(calculatedTotal);
      }
    };

    const datenow = moment().format('YYYY-MM-DD');
    setTanggal(datenow);

    const randomNumber = Math.floor(Math.random() * 100000);
    setNomor("ID" + randomNumber);
  }, []);

  const handleTambahBarang = async () => {
    const hargaSatuanNum = parseInt(hargaSatuan, 10);
    const jumlahNum = parseInt(jumlah, 10);

    if (isNaN(hargaSatuanNum) || isNaN(jumlahNum)) {
      Alert.alert('Error', 'Harga Satuan dan Jumlah harus berupa angka');
      return;
    }

    const newBarang = {
      namaBarang,
      hargaSatuan: hargaSatuanNum,
      jumlah: jumlahNum,
      totalHarga: hargaSatuanNum * jumlahNum,
    };

    const newBarangList = [...barangList, newBarang];
    setBarangList(newBarangList);
    setTotal(total + newBarang.totalHarga);

    // Save new data to AsyncStorage
    await AsyncStorage.setItem('itemjual', JSON.stringify(newBarangList));

    // Clear modal fields
    setNamaBarang('');
    setHargaSatuan('');
    setJumlah('');
    setModalVisible(false);
  };

  const handleHapusBarang = async () => {
    setBarangList([]);
    setTotal(0);
    await AsyncStorage.removeItem('itemjual');
  };

  const handleSimpanData = async () => {
    try {
      const getData = await AsyncStorage.getItem('itemjual');
      const newData = JSON.parse(getData);
    
      const flattenedData = newData.flat();
  
      // Tambahkan nomor, tanggal, pelanggan, barang, dan total ke objek yang akan disimpan
      const dataToSave = {
        nomor,       // Simpan nomor transaksi
        tanggal,     // Simpan tanggal transaksi
        pelanggan,   // Simpan nama pelanggan
        items: flattenedData, // Simpan barang yang telah ditambahkan
        total,       // Simpan total harga
      };
  
      const existingHistory = await AsyncStorage.getItem('dataHistory');
      let updatedHistory = [];
    
      if (existingHistory) {
        updatedHistory = JSON.parse(existingHistory);
        updatedHistory.push(dataToSave); // Tambahkan data pelanggan, barang, nomor, dan tanggal ke riwayat
      } else {
        updatedHistory = [dataToSave];
      }
    
      // Simpan data yang telah diperbarui ke AsyncStorage
      await AsyncStorage.setItem('dataHistory', JSON.stringify(updatedHistory));
  
      // Reset form setelah data berhasil disimpan
      setBarangList([]);
      setTotal(0);
      setPelanggan('');
      setTanggal(moment().format('YYYY-MM-DD'));
      setNomor("ID" + Math.floor(Math.random() * 100000));
  
      alert('Data berhasil Disimpan');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data');
      console.error(error);
    }
  };

  const handlePrint = async () => {
    try {
      // Konversi tampilan menjadi HTML untuk dicetak
      const htmlContent = `
        <html>
          <head>
            <style>
              body {
                font-family: 'Courier New', Courier, monospace;
                margin: 0;
                padding: 10px;
              }
              h1, p {
                text-align: center;
                margin: 0;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              th, td {
                border-bottom: 1px dashed #000;
                padding: 8px 0;
                text-align: center;
                font-size: 12px;
              }
              th {
                font-weight: bold;
                border-bottom: 1px solid black;
              }
              .total {
                font-weight: bold;
              }
              .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 12px;
                color: grey;
              }
            </style>
          </head>
          <body>
            <h1>NAMA OUTLET</h1>
            <p>Jl. Artowijoyo no.9 Tangerang Selatan Banten</p>
            <p>Tanggal: ${tanggal}</p>
            <p>Nota No: ${nomor}</p>
            <p>Pelanggan: ${pelanggan}</p>
            <table>
              <thead>
                <tr>
                  <th>Barang</th>
                  <th>Jumlah</th>
                  <th>Harga</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${barangList.map(barang => `
                  <tr>
                    <td>${barang.namaBarang}</td>
                    <td>${barang.jumlah} pcs</td>
                    <td>${barang.hargaSatuan.toLocaleString()}</td>
                    <td>${barang.totalHarga.toLocaleString()}</td>
                  </tr>
                `).join('')}
                <tr class="total">
                  <td colspan="3">Total Pembelian</td>
                  <td>${total.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div class="footer">Tulisan Footer Tulisan Footer</div>
          </body>
        </html>
      `;
      
      // Fungsi untuk mencetak
      await RNPrint.print({ html: htmlContent });
    } catch (error) {
      Alert.alert('Error', 'Gagal mencetak');
      console.error(error);
    }
  };
  
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>PENJUALAN</Text>
          <View style={styles.iconContainer}>
            <FontAwesome5Icon name="share-alt" size={20} color="white" />
            <FontAwesome5Icon name="print" size={20} color="white" style={{ marginLeft: 15 }} onPress={handlePrint} />
          </View>
        </View>

        {/* Form Input */}
        <View style={styles.formContainer}>
          <View style={{flexDirection: 'row',}}>
            <Text style={styles.label}>Tanggal                   : </Text>
            <Text style={styles.isian}>{tanggal}</Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Text style={styles.label}>Nomor                     : </Text>
            <Text style={styles.isian}>{nomor}</Text>
          </View>

          <View style={{flexDirection: 'row',}}>
            <Text style={styles.label}>Nama Pelanggan   : </Text>
            <Text style={styles.isian}>{pelanggan}</Text>
          </View>
        </View>

        {/* Daftar Barang */}
        <View style={styles.tableContainer}>
          <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
            <FontAwesome5Icon name="plus-circle" size={20} color="white" />
            <Text style={styles.addButtonText}>Tambah Barang</Text>
          </TouchableOpacity>
          {barangList.length > 0 ? barangList.map((barang, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableText}>{barang.namaBarang}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                <Text style={styles.tableText}>{barang.jumlah + " pcs"}</Text>
                <Text style={styles.tableText}>{barang.hargaSatuan.toLocaleString()}</Text>
                <Text style={styles.tableText}>{barang.totalHarga.toLocaleString()}</Text>
              </View>
            </View>
          )) : null}

          {barangList.length > 0 &&
            <View style={styles.totalRow}>
              <Text style={styles.tableTextTotal}>Total</Text>
              <Text style={styles.tableTextTotal}>{total.toLocaleString()}</Text>
            </View>
          }
        </View>

        {/* Tombol Hapus dan Simpan */}
        {barangList.length > 0 &&
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleHapusBarang}>
              <FontAwesome5Icon name="trash" size={20} color="white" />
              <Text style={styles.buttonText}>HAPUS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSimpanData}>
              <FontAwesome5Icon name="save" size={20} color="white" />
              <Text style={styles.buttonText}>SIMPAN</Text>
            </TouchableOpacity>
          </View>
        }
      </ScrollView>

      {/* Modal Tambah Barang dan Nama Pelanggan */}
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Tambah Barang dan Nama Pelanggan</Text>

          {/* Input Nama Pelanggan */}
          <TextInput
            style={styles.input}
            placeholder="Nama Pelanggan"
            value={pelanggan}
            onChangeText={setPelanggan}
          />

          {/* Input Barang */}
          <TextInput
            style={styles.input}
            placeholder="Nama Barang"
            value={namaBarang}
            onChangeText={setNamaBarang}
          />
          <TextInput
            style={styles.input}
            placeholder="Harga Satuan"
            keyboardType="numeric"
            value={hargaSatuan}
            onChangeText={setHargaSatuan}
          />
          <TextInput
            style={styles.input}
            placeholder="Jumlah"
            keyboardType="numeric"
            value={jumlah}
            onChangeText={setJumlah}
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={handleTambahBarang}>
              <Text style={styles.modalButtonText}>Tambah</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default PenjualanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'red',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    marginLeft: 130,
    marginTop: 5
  },
  iconContainer: {
    flexDirection: 'row',
  },
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'red',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black'
  },
  isian: {
    fontSize: 14,
    marginBottom: 5,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
    color: 'black',
  },
  tableContainer: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 10,
  },
  tableRow: {
    marginBottom: 10,
    marginTop: 20
  },
  tableText: {
    fontSize: 14,
    width: '25%',
    fontWeight: 'bold',
    color: 'black'
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    borderTopWidth: 1,
    borderColor: 'black',
    paddingTop: 10,
    backgroundColor: 'black'
  },
  tableTextTotal: {
    fontSize: 14,
    width: '25%',
    fontWeight: 'bold',
    color: 'white',
    marginTop: -10,
    marginLeft: 10
  },
  addButton: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    width: 170,
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignSelf: 'center',
    width: 300,
  },
  deleteButton: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  printContainer: {
    padding: 20,
    flex: 1,
    backgroundColor: 'red',
  },
  outletTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black'
  },
  printInfo: {
    marginVertical: 20,
  },
  printInfoText: {
    fontSize: 13,
    color: 'black',
    marginBottom: 5,
  },
  printTable: {
    borderTopWidth: 0.5,
    borderColor: '#ccc',
    padding: 10,
    marginHorizontal: -12
  },
  printTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  printTableText: {
    fontSize: 14,
    width: '25%',
    textAlign: 'center',
    color: 'black'
  },
  printTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    paddingTop: 10,
    borderColor: 'grey',
    marginHorizontal: -13
  },
  printTotalText: {
    fontSize: 14,
    color: 'black',
    width: '50%',
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
  },
  printCloseButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  printCloseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalView: {
    width: 300, 
    height: 400,
    borderRadius: 14,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'black',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'gray',
  },
});
