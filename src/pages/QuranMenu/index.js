import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import { Searchbar } from 'react-native-paper';



const QuranMenu = ({route, navigation}) => {

    const {dataList} = route.params;

    console.log('helllo', dataList);
    
      // State untuk menyimpan kata pencarian
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fungsi untuk memfilter surah berdasarkan input pencarian
  const filteredData = dataList.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

    const renderItem = ({ item }) => (

        
        <TouchableOpacity style={styles.listItem}  onPress={() => navigation.push('MenuQuran', {
            data: item
          })}>
          <Text style={styles.number}>{item.value}</Text>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.ayat}>{item.number_of_verses + " Ayat"}</Text>
          </View>

          
          <TouchableOpacity style={styles.downloadButton}>
            <FontAwesomeIcon5 name="chevron-right" size={24} color="#ff6f00" />
          </TouchableOpacity>
        </TouchableOpacity>
      );


     


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>

    <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', width: '100%', height: 100, paddingHorizontal: 16, paddingTop: 10, justifyContent: 'space-between'}}> 
    <FontAwesomeIcon5 name="chevron-left" size={24} color="black" style={{marginTop: 10}} />
    <Text style={[styles.title, {
        marginTop: 8
    }]}>{"List Surah"}</Text>
    <FontAwesomeIcon5 name="ellipsis-h" size={24} color="black" style={{marginTop: 10}} />

    </TouchableOpacity>
    <Searchbar
        placeholder="Cari surah..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

    <FlatList
      data={filteredData}
      keyExtractor={(item) => item.value.toString()}
      renderItem={renderItem}
    />
    </View>
  )
}

export default QuranMenu

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
      },
      listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      number: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
        color: 'grey'
      },
      labelContainer: {
        flex: 1,
      },
      label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
      },
      ayat: {
        fontSize: 14,
        color: '#666',
      },
      downloadButton: {
        padding: 10,
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
      searchbar: {
       marginTop: -10,
       marginBottom: 16,
        borderRadius: 8,  // Optional: untuk membuat sudut lebih bulat
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
