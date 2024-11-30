import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const getIndonesianMonth = (month) => {
  const months = [
    'Januari',  
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  return months[month];
};

const Home = ({ navigation }) => {
  const [dataKirim, setDataKirim] = useState([]);
  const [dataSetting, setDataSetting] = useState({});

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage] = useState(10); // Adjust rows per page as needed
  const [filterMonth, setFilterMonth] = useState(moment().format('YYYY-MM'));
  const [activeButton, setActiveButton] = useState('KASBOOK');
  const [activeButtonBottom, setActiveButtonBottom] = useState('NOTA');
  const [selectedMonth, setSelectedMonth] = useState('JAN');
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];


useEffect(async () => {
 const getDataHistory = await AsyncStorage.getItem('dataHistory')
 const parsingDataHistory = JSON.parse(getDataHistory)
 console.log('dataHistory', parsingDataHistory);
 
}, [])


  return (
    <View style={styles.container}>
      
      <View style={{ backgroundColor: 'red', width: '100%', height: 80, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 12, paddingVertical: 10 }}>
      
      <TouchableOpacity
        style={{
          backgroundColor: activeButton === 'KASBOOK' ? 'white' : 'red', 
          borderRadius: 10,
          width: 80,
          height: 30,
        }}
        onPress={() => setActiveButton('KASBOOK')}
      >
        <Text style={{
          fontFamily: 'Poppins-Bold',
          color: activeButton === 'KASBOOK' ? 'red' : 'white', 
          fontSize: 12,
          textAlign: 'center',
          marginTop: 5
        }}>
          KASBOOK
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: activeButton === 'PPOB' ? 'white' : 'red', 
          borderRadius: 10,
          width: 80,
          height: 30,
        }}
        onPress={() => setActiveButton('PPOB')}
      >
        <Text style={{
          fontFamily: 'Poppins-Bold',
          color: activeButton === 'PPOB' ? 'red' : 'white', 
          fontSize: 12,
          textAlign: 'center',

          marginTop: 5
        }}>
          PPOB
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: activeButton === 'MARKET' ? 'white' : 'red', 
          borderRadius: 10,
          width: 80,
          height: 30,
        }}
        onPress={() => setActiveButton('MARKET')}
      >
        <Text style={{
          fontFamily: 'Poppins-Bold',
          color: activeButton === 'MARKET' ? 'red' : 'white', 
          fontSize: 12,
          textAlign: 'center',

          marginTop: 5
        }}>
          MARKET
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: activeButton === 'SETTING' ? 'white' : 'red', 
          borderRadius: 10,
          width: 80,
          height: 30,
        }}
        onPress={() => setActiveButton('SETTING')}
      >
        <Text style={{
          fontFamily: 'Poppins-Bold',
          color: activeButton === 'SETTING' ? 'red' : 'white', 
          fontSize: 12,
          textAlign: 'center',

          marginTop: 5
        }}>
          SETTING
        </Text>
      </TouchableOpacity>

    </View>

    <View style={{flex:1, backgroundColor: '#F5F5F5', marginTop: -30, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
        <View style={{flexDirection: 'row', width: '100%', height: 100, justifyContent: 'space-evenly', marginTop: 20, }}>
        <TouchableOpacity
        style={{
          backgroundColor: activeButtonBottom == 'NOTA' ? 'red' : 'transparent', 
          borderRadius: 10,
          width: 80,
          height: 30,
        }}
        onPress={() => setActiveButtonBottom('NOTA')}
      >
        <Text style={{
          fontFamily: 'Poppins-Bold',
          color: activeButtonBottom == 'NOTA' ? 'white' : 'red', 
          fontSize: 12,
          textAlign: 'center',
          marginTop: 5
        }}>
          NOTA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          backgroundColor: activeButtonBottom == 'REKAP' ? 'red' : 'transparent', 
          borderRadius: 10,
          marginLeft: 20,
          width: 80,
          height: 30,
        }}
        onPress={() => setActiveButtonBottom('REKAP')}
      >
        <Text style={{
          fontFamily: 'Poppins-Bold',
          color: activeButtonBottom == 'REKAP' ? 'white' : 'red', 
          fontSize: 12,
          textAlign: 'center',
          marginTop: 5
        }}>
          REKAP PPOB
        </Text>
      </TouchableOpacity>

        </View>
        <View style={styles.containerLagi}>
      {/* Icon Kalender */}
      <TouchableOpacity style={styles.iconContainer}>
        <FontAwesome5Icon name="calendar" size={20} color="white" />
      </TouchableOpacity>

      {/* Tombol Panah Kiri */}
      <TouchableOpacity>
        <FontAwesome5Icon name="chevron-left" size={20} color="white" />
      </TouchableOpacity>

      {/* List Bulan */}
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.monthList}>
        {months.map((month) => (
          <TouchableOpacity
            key={month}
            style={[
              styles.monthContainer,
              selectedMonth === month && styles.selectedMonthContainer,
            ]}
            onPress={() => setSelectedMonth(month)}
          >
            <Text style={[styles.monthText, selectedMonth === month && styles.selectedMonthText]}>
              {month}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tombol Panah Kanan */}
      <TouchableOpacity>
        <FontAwesome5Icon name="chevron-right" size={20} color="white" />
      </TouchableOpacity>
    </View>

    </View>
      
    <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          // Aksi saat FAB diklik
          console.log('FAB clicked');
          navigation.push('PenjualanScreen')
        }}
      >
        <FontAwesome5Icon name="plus" size={20} color="white" />
      </TouchableOpacity>
    
    </View> 
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'orange',
  },
  inputButton: {
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  exportButton: {
    height: 50,
    backgroundColor: 'orange',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterInput: {
    margin: 20,
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 12,
    color: 'black',
  },
  text: {
    fontSize: 12,
    color: 'black',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  paginationText: {
    fontSize: 16,
    color: 'orange',
  },
  containerLagi: {
    backgroundColor: 'red',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: -50
  },
  iconContainer: {
    marginRight: 10,
  },
  monthList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  monthContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  selectedMonthContainer: {
    backgroundColor: 'white',
  },
  monthText: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  selectedMonthText: {
    color: 'red',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: 'red',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // for shadow on iOS
    shadowOpacity: 0.8, // for shadow on iOS
    shadowRadius: 2, // for shadow on iOS
  },
});
