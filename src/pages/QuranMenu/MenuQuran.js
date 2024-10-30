import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { Modal } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuQuran = ({route, navigation}) => {

  const {data} = route.params;
    const [surahList, setSurahList] = useState([]); // List of surah from API
    const [selectedSurah, setSelectedSurah] = useState(null); // Selected Surah number
    const [ayatList, setAyatList] = useState([]); // List of Ayat from API
    const [loading, setLoading] = useState(false);

    console.log('dd', data.value);
    

    useEffect(() => {
   

      fetchAyat()
      }, []);


      const fetchAyat = async (surahNumber, totalAyat) => {
        setLoading(true);
        console.log('Total Ayat:', totalAyat);
    
      
        const jsonValue = await AsyncStorage.getItem(`@${data.label}`);
          if (jsonValue != null) {
            const parsingData =  JSON.parse(jsonValue);
          setAyatList(parsingData);
          setLoading(false);

          } else {
        try {
          // Memanggil API untuk batch ini
          const response = await axios.get(`https://equran.id/api/v2/surat/${data.value}`);
          // const jsonValue = JSON.stringify(data);

         
  const allAyat = response.data.data.ayat
          const jsonValue = JSON.stringify(allAyat);
            await AsyncStorage.setItem(`@${data.label}`, jsonValue);
            alert('Surah berhasil diunduh Offline. Sekarang anda bisa membuka surah ini tanpa jaringan :)')
            setAyatList(allAyat);
          setLoading(false);

          

          // Cek jika response.data.data tersedia
          
        
         
        // console.log('Total Ayat Fetched:', allAyat.length);
    
      } catch (err) {
        alert('ERROR')
    }
    
        // Setelah semua batch diambil, simpan hasilnya ke state
     
    };
  }

    
  return (
    <>
     <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text style={[styles.title, {
          marginTop: 16
        }]}>{data.label}</Text>
      
    
  <ScrollView >
          {ayatList ? (
            ayatList.map((ayat, index) => (
              <View key={index} style={styles.ayatBox}>
                  <Text style={styles.ayatNumber}>Ayat {ayat.nomorAyat}</Text>
                <Text style={styles.ayatText}>{ayat.teksArab}</Text>
                <Text style={styles.translationText}>{ayat.teksIndonesia}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noAyatText}>Pilih Surah untuk menampilkan ayat.</Text>
          )}
        </ScrollView>
    </View>

    <Modal visible={loading}>
        <ActivityIndicator size="large" color="orange" />
    </Modal>
    
    </>
   
  )
}

export default MenuQuran

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'white',
      },
       ayatBox: {
        backgroundColor: '#f2f2f2',
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 20
      },
      ayatNumber: {
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
      },
      ayatText: {
        fontSize: 24,
        color: '#000',
        textAlign: 'right',
        marginBottom: 8,
      },
      translationText: {
        fontSize: 16,
        color: '#555',
      },
      noAyatText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginTop: 20,
      },
      title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: 'black'
      },
      subtitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 16,
      },
      prayerTimeBox: {
        backgroundColor: '#ff6f00',
        padding: 20,
        borderRadius: 10,
        marginTop: 20,
      },
      prayerName: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
      },
      prayerTime: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
      },
      timeLeft: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
      },
    });
    const pickerSelectStyles = {
      inputIOS: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
      },
      inputAndroid: {
        fontSize: 16,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
      },
    };
