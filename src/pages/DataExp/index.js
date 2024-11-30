import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import { DataTable, Modal } from 'react-native-paper';
import HeaderSecond from '../../component/Header/HeaderSecond';
import Fire from '../../config/Fire';
import moment from 'moment';
import 'moment/locale/id'; // Import locale bahasa Indonesia
import MonthPicker from 'react-native-month-year-picker'; // Import MonthPicker

const DataExp = ({ route, navigation }) => {
  const [dataBarang, setDataBarang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false); // Kontrol untuk menampilkan picker
  const [date, setDate] = useState(new Date());
  const [timeF, setTimeF] = useState(""); // Untuk menyimpan bulan yang dipilih
  const [dataExp, setDataExp] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State untuk menyimpan nilai pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(10); // Jumlah item per halaman

  // Set locale bahasa Indonesia
  moment.locale('id');

  // Handle ketika bulan dipilih
  const handleTimeF = (event, selectedDate) => {
    setShowMonthPicker(false); // Sembunyikan modal setelah memilih bulan
    if (selectedDate) {
      const monthYear = moment(selectedDate).format("MM-YYYY");
      setTimeF(monthYear); // Simpan bulan yang dipilih
      filterDataByMonth(monthYear);
    }
  };

  // Ambil data dari Firebase
  const getData = async () => {
    setLoading(true);
    Fire.database()
      .ref('dataExpired/')
      .once('value')
      .then((resDB) => {
        const datled = [];
        const value = resDB.val();
        if (value) {
          Object.keys(value).map((item) => {
            datled.push(value[item]);
          });
          setDataExp(datled);
          setFilteredData(datled); // Tampilkan semua data pada awalnya
        }
        setLoading(false);
      });
  };

  // Filter data berdasarkan bulan
  const filterDataByMonth = (monthYear) => {
    const filtered = dataExp.filter((item) => {
      const itemMonthYear = moment(item.exp_date, "DD-MMMM-YYYY").format("MM-YYYY");
      return itemMonthYear === monthYear; // Filter data yang tanggalnya sesuai dengan bulan yang dipilih
    });
    setFilteredData(filtered); // Update data yang akan ditampilkan
  };

  // Fungsi untuk menghandle pencarian
  const handleSearch = (text) => {
    setSearchTerm(text);
    const filtered = dataExp.filter(item =>
      item.nama_barang.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset halaman ke 1 saat melakukan pencarian
  };

  // Pagination: ambil data untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (indexOfLastItem < filteredData.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <HeaderSecond title="Data Expired" desc={"Data Detail Expired"} onPressed={() => navigation.goBack()} />
<ScrollView>
<View style={styles.container}>
          {/* Tombol untuk pilih bulan */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowMonthPicker(true)}
          >
            <Text style={styles.buttonText}>
              {timeF ? `Selected Month: ${timeF}` : "Pick Month"}
            </Text>
          </TouchableOpacity>

          {/* Search Bar */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by item name"
            value={searchTerm}
            onChangeText={handleSearch}
          />

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Nama Barang</DataTable.Title>
              <DataTable.Title numeric>Tanggal Expired</DataTable.Title>
              <DataTable.Title numeric>User</DataTable.Title>
            </DataTable.Header>

            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={styles.cell}>
                    <Text style={styles.namaBarang}>{item.nama_barang}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cell}>
                    <Text style={styles.smallText}>{item.exp_date}</Text>
                  </DataTable.Cell>
                  <DataTable.Cell numeric style={styles.cell}>
                    <Text style={styles.smallText}>{item.nama_user}</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              ))
            ) : (
              <DataTable.Row>
                <DataTable.Cell colSpan={3} style={{ justifyContent: 'center' }}>
                  No data available for the selected month
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </DataTable>

          {/* Pagination Controls */}
          <View style={styles.pagination}>
            <TouchableOpacity onPress={handlePreviousPage} disabled={currentPage === 1}>
              <Text style={[styles.pageButton, currentPage === 1 && styles.disabled]}>Previous</Text>
            </TouchableOpacity>
            <Text style={styles.pageInfo}>Page {currentPage} of {Math.ceil(filteredData.length / itemsPerPage)}</Text>
            <TouchableOpacity onPress={handleNextPage} disabled={indexOfLastItem >= filteredData.length}>
              <Text style={[styles.pageButton, indexOfLastItem >= filteredData.length && styles.disabled]}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
</ScrollView>
       
      </View>

      {/* Loading Indicator */}
      <Modal visible={loading}>
        <ActivityIndicator size="large" color="black" />
      </Modal>

      {/* MonthYearPicker untuk memilih bulan */}
      {showMonthPicker && (
        <MonthPicker
          onChange={handleTimeF}
          value={date}
          minimumDate={new Date(2000, 1)}
          maximumDate={new Date(2050, 12)}
          locale="id" // Locale Indonesia
        />
      )}
    </>
  );
};

export default DataExp;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cell: {
    paddingVertical: 8, // Padding vertikal untuk sel
  },
  namaBarang: {
    fontSize: 7, // Ukuran font lebih kecil untuk nama barang
    lineHeight: 12, // Tinggi baris untuk meningkatkan keterbacaan
    maxWidth: 150, // Batas lebar untuk membiarkan teks membungkus
    flexWrap: 'wrap', // Memastikan teks membungkus jika panjang
  },
  smallText: {
    fontSize: 8, // Ukuran font kecil untuk exp_date dan nama_user
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: 'black'
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 20
  },
  pageButton: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  pageInfo: {
    fontSize: 16,
  },
  disabled: {
    color: 'lightgray',
  },
});
