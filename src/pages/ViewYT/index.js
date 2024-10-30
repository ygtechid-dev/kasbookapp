import { FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5'
import { Modal, Searchbar } from 'react-native-paper';
import { Alert } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Fire from '../../config/Fire';



const ViewYT = ({route, navigation}) => {
    const [playing, setPlaying] = useState(false);

    const [loading, setLoading] = useState(false);
    const [dataVideo, setDataVideo] = useState([]);
  

    
    const onStateChange = useCallback(state => {
        if (state === 'ended') {
          setPlaying(false);
          Alert.alert('video has finished playing!');
        }
      }, []);



      const togglePlaying = useCallback(() => {
        setPlaying(prev => !prev);
      }, []);


      const getData = async () => {
        setLoading(true);
        Fire.database()
          .ref('listkajian/')
          .once('value')
          .then((resDB) => {
            const datled = [];
            const value = resDB.val();
            if (value) {
              Object.keys(value).map((item) => {
                datled.push(value[item]);
              });
              setDataVideo(datled);
            }
            setLoading(false);
          });
      };

      useEffect(() => {
        getData()
      }, [])


  return (
    <>
    <View style={{flex: 1, backgroundColor: 'white'}}>

    <TouchableOpacity onPress={() => navigation.goBack()} style={{flexDirection: 'row', width: '100%', height: 100, paddingHorizontal: 16, paddingTop: 10, justifyContent: 'space-between'}}> 
    <FontAwesomeIcon5 name="chevron-left" size={24} color="black" style={{marginTop: 10}} />
    <Text style={[styles.title, {
        marginTop: 8
    }]}>{"Video Kajian"}</Text>
    <FontAwesomeIcon5 name="ellipsis-h" size={24} color="black" style={{marginTop: 10}} />

    </TouchableOpacity>
 
 <ScrollView>
 <View style={{marginHorizontal: 16}}>

<View>
  {dataVideo.length > 0 &&
    dataVideo.map((i, index) => {
      return (
<YoutubePlayer
          height={250}
          play={playing}
          videoId={i.uri}
          onChangeState={onStateChange}
        />
      )

    })
  }


        
</View>
{/* 

<View style={{marginTop: -50}}>
<YoutubePlayer
          height={300}
          play={playing}
          videoId={'MTr8vvqQbLI'}
          onChangeState={onStateChange}
        />
</View>

<View style={{marginTop: -50}}>
<YoutubePlayer
          height={300}
          play={playing}
          videoId={'izYUMrsvVDQ'}
          onChangeState={onStateChange}
        />
</View> */}

</View>
 </ScrollView>
 

  

   
    </View>

    <Modal visible={loading}>
      <ActivityIndicator size="large" color="orange" />
    </Modal>
    
    </>
  )
}

export default ViewYT

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
