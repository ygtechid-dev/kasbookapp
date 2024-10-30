import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, PermissionsAndroid, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Modal } from 'react-native-paper';
import FontAwesomeIcon5 from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Fire from '../../config/Fire';
import { TextInput } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { checkNotifications, openSettings } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Fungsi untuk menghitung modulus yang aman
const gmod = (n, m) => ((n % m) + m) % m;

// Nama-nama bulan Hijriah
const hijriMonths = [
  'Muharram', 'Safar', 'Rabiul Awwal', 'Rabiul Akhir', 'Jumadil Awwal', 'Jumadil Akhir',
  'Rajab', 'Sya’ban', 'Ramadhan', 'Syawal', 'Dzulqa’dah', 'Dzulhijjah'
];

// Algoritma untuk konversi kalender
const kuwaiticalendar = (date) => {
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  
  let m = month + 1;
  let y = year;
  
  if (m < 3) {
    y -= 1;
    m += 12;
  }
  
  let a = Math.floor(y / 100);
  let b = 2 - a + Math.floor(a / 4);
  
  if (y < 1583) b = 0;
  if (y == 1582 && m == 10 && day > 4) {
    b = -10;
  }
  
  let jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + b - 1524;
  
  b = 0;
  if (jd > 2299160) {
    a = Math.floor((jd - 1867216.25) / 36524.25);
    b = 1 + a - Math.floor(a / 4);
  }
  
  let bb = jd + b + 1524;
  let cc = Math.floor((bb - 122.1) / 365.25);
  let dd = Math.floor(365.25 * cc);
  let ee = Math.floor((bb - dd) / 30.6001);
  
  day = bb - dd - Math.floor(30.6001 * ee);
  month = ee - 1;
  if (ee > 13) {
    cc += 1;
    month = ee - 13;
  }
  year = cc - 4716;

  let wd = gmod(jd + 1, 7) + 1;
  
  let iyear = 10631 / 30;
  let epochastro = 1948084;
  let epochcivil = 1948085;
  let shift1 = 8.01 / 60;
  
  let z = jd - epochastro;
  let cyc = Math.floor(z / 10631);
  z = z - 10631 * cyc;
  let j = Math.floor((z - shift1) / iyear);
  let iy = 30 * cyc + j;
  z = z - Math.floor(j * iyear + shift1);
  let im = Math.floor((z + 28.5001) / 29.5);
  if (im == 13) im = 12;
  let id = z - Math.floor(29.5001 * im - 29);
  
  return [day, month, year, wd, id, im, iy];
};



const Home = ({navigation}) => {
  const [selectedCity, setSelectedCity] = useState({});
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dataBanner, setDataBanner] = useState([]);
  const [dataNotif, setDataNotif] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  
  const [visiblePilihCity, setVisiblePilihCity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nextPrayer, setNextPrayer] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
  const [hijriDate, setHijriDate] = useState('');
  const [surahList, setSurahList] = useState([]); // List of surah from API
  const [selectedSurah, setSelectedSurah] = useState(null); // Selected Surah number
  const [ayatList, setAyatList] = useState([]); // List of Ayat from API
  const [currentBatch, setCurrentBatch] = useState(1);
  const [userLogin, setUserLogin] = useState({})
  const [totalAyat, setTotalAyat] = useState(0);
  const [batchSize] = useState(30); // Set batch size
  const [isNotified, setIsNotified] = useState(false); // State untuk melacak notifikasi
  const [statNotif, setStatNotif] = useState("")
  console.log('NOTIFSTAT', statNotif);
  
  let intervalId; // Declare variable to hold interval ID

  const [nextPrayerTime, setNextPrayerTime] = useState('');
  // Fetch the list of cities on component mount
  useEffect(() => {
    setLoading(true)
    axios.get('https://api.myquran.com/v2/sholat/kota/semua')
      .then (response => {
        const cityData = response.data.map(city => ({
          label: city.lokasi,
          value: city.lokasi,
        }));
        setCities(cityData);
        console.log('RSCITY', response);
        
      })
      .catch(error => console.log(error));
      getLokasi()
      const today = new Date();
      const hijriDate = kuwaiticalendar(today);
      const gregorianDate = moment().format('DD MMMM YYYY');
      
      // Nama bulan Hijriah diambil dari array 'hijriMonths'
      const hijriFormatted = `${hijriDate[4]} ${hijriMonths[hijriDate[5] - 1]} ${hijriDate[6]} H`;
      console.log('ggg', hijriFormatted);
      axios.get('https://api.myquran.com/v2/quran/surat/semua')
      .then(response => {

        const surahData = response.data.data.map(surah => ({
          label: `${surah.name_id}`,
          value: surah.number,
          number_of_verses: surah.number_of_verses,
        }));
        
        setSurahList(surahData);
    setLoading(false)

      })
      .catch(error => console.log(error));
      setHijriDate(hijriFormatted)
    setLoading(false)

  }, []);


  


  const getLokasi = async () => {
    setLoading(true)
    const getUS = await AsyncStorage.getItem('@user'); 
    console.log('ddd', getUS);
  

    Geolocation.getCurrentPosition(info => {
          
      Fire.database()
      .ref('dataUser/')
      .once('value')
      .then((resDB) => {
        const datled = [];
        const value = resDB.val();
        if (value) {
          console.log('VALUE', value);
          Object.keys(value).map((item) => {
            datled.push(value[item]);
          });
          const parsingUS = JSON.parse(getUS)
          const filteringUser = datled.filter((e) => e.email == parsingUS.email)
          console.log('USER', filteringUser);
          setUserLogin(parsingUS)
          axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + info.coords.latitude + '&longitude=' + info.coords.longitude + '&localityLanguage=id').then(async (res) => {
        
            console.log('ccc', res.data.city);
            
            await axios.get('https://api.myquran.com/v2/sholat/kota/cari/' + filteringUser[0].lokasiDefault).then(async(res) => {
            // await axios.get('https://api.myquran.com/v2/sholat/kota/cari/Malang').then(async(res) => {
    
              console.log('resLOK', res.data);
              
              if(res.data.message == "data not found") {
                setSelectedCity({})
                setLoading(false)
                setVisiblePilihCity(true)
    
              } else {
                setSelectedCity(res.data.data[0])
                const ids = res.data.data[0].id
              const todayDate = moment().format('YYYY/MM/DD');
      
                await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${ids}/${todayDate}`).then((res) => {
              setPrayerTimes(res.data.data);
              const currentTime = moment();
              const prays = res.data.data
      
              // Daftar waktu sholat dari JSON (format 'HH:mm')
              const prayerList = [
                { name: 'Subuh', time: moment(prays.jadwal.subuh, 'HH:mm') },
                { name: 'Dhuha', time: moment(prays.jadwal.dhuha, 'HH:mm') },
                { name: 'Dzuhur', time: moment(prays.jadwal.dzuhur, 'HH:mm') },
                { name: 'Ashar', time: moment(prays.jadwal.ashar, 'HH:mm') },
                { name: 'Maghrib', time: moment(prays.jadwal.maghrib, 'HH:mm') },
                { name: 'Isya', time: moment(prays.jadwal.isya, 'HH:mm') },
              ];
          
              // Filter jadwal yang belum terlewat
              const upcomingPrayers = prayerList.filter(prayer => prayer.time.isAfter(currentTime));
      
              if (upcomingPrayers.length > 0) {
                const next = upcomingPrayers[0];
                setNextPrayer(next.name);
                setNextPrayerTime(next.time.format('HH:mm'));
          
                // Start interval to update time left
                startTimeLeft(next.time);
          setLoading(false)
      
              } else {
                setNextPrayer('Tidak ada jadwal sholat tersisa untuk hari ini');
                setNextPrayerTime('');
                setTimeLeft('');
          setLoading(false)
      
              }
                })
              }
    
            
              
            })
            //real location user
            // var kantor = { lat: info.coords.latitude, lng:info.coords.longitude };
        
          
          //  setLocation(res.data)
         
           setLoading(false)
    
        })
          // setDataKirim(dataList);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error fetching data:', error);
      });
      // axios.get('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=-6.3178529&longitude=106.6845824' + '&localityLanguage=id').then(async (res) => {
      
    
           })
  }

  const fetchAyat = async (surahNumber, totalAyat) => {
    setLoading(true);
    console.log('Total Ayat:', totalAyat);

  
   
    try {
      // Memanggil API untuk batch ini
      const response = await axios.get(`https://equran.id/api/v2/surat/${surahNumber}`);
      
      // Cek jika response.data.data tersedia
      
      const allAyat = response.data.data.ayat
      setAyatList(allAyat);
      setLoading(false);
    console.log('Total Ayat Fetched:', allAyat);

} catch (err) {

}

    // Setelah semua batch diambil, simpan hasilnya ke state
 
};



  const startTimeLeft = (nextPrayerTime) => {
    if (intervalId) clearInterval(intervalId); // Clear existing interval if any

    intervalId = setInterval(() => {
      const currentMoment = moment();
      const duration = moment.duration(nextPrayerTime.diff(currentMoment));

      if (duration.asMilliseconds() > 0) {
        const hours = Math.floor(duration.asHours());
        const minutes = duration.minutes();
        setTimeLeft(`${hours} Jam ${minutes} Menit menuju sholat`);
      } else {
        clearInterval(intervalId); // Clear interval if time has passed
        setTimeLeft('Waktunya sholat!');
        setNextPrayer('');
        setNextPrayerTime('');
      }
    }, 1000); // Update every second
  };
  // Fetch the prayer times for the selected city
 

  // Calculate the next prayer time
  const calculateNextPrayer = (times) => {
    const now = moment();
    const prayerTimesList = [
      { name: 'Subuh', time: moment(times.subuh, 'HH:mm') },
      { name: 'Dzuhur', time: moment(times.dzuhur, 'HH:mm') },
      { name: 'Ashar', time: moment(times.ashar, 'HH:mm') },
      { name: 'Maghrib', time: moment(times.maghrib, 'HH:mm') },
      { name: 'Isya', time: moment(times.isya, 'HH:mm') },
    ];

    const next = prayerTimesList.find(prayer => prayer.time.isAfter(now));
    if (next) {
      setNextPrayer(`${next.name} ${next.time.format('HH:mm')}`);
    } else {
      setNextPrayer('No more prayers today');
    }
  };


  const getSetting = async () => {
    setLoading(true);
    Fire.database()
      .ref('banner/')
      .once('value')
      .then((resDB) => {
        const value = resDB.val();
        if (value) {
         
          console.log('setting', value);
          setDataBanner(value)
          
          // setDataKirim(dataList);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error fetching data:', error);
      });
  };
 

  const getSettingNotif = async () => {
    setLoading(true);
    Fire.database()
      .ref('settingnotif/')
      .once('value')
      .then((resDB) => {
        const value = resDB.val();
        if (value) {
         setDataNotif(value)
          console.log('settingNOTIF', value);
          // setDataBanner(value)
          
          // setDataKirim(dataList);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log('Error fetching data:', error);
      });
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('https://api.myquran.com/v2/sholat/kota/semua');
      console.log('rescities12', response.data.data);
      
      setCities(response.data.data);
      // setFilteredCities(response.data.data); // Set awal data yang difilter sama dengan data semua kota
    } catch (error) {
      console.log(error);
    }
  };


  const searchCity = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredCities(cities); // Jika pencarian kosong, tampilkan semua kota
    } else {
      const filtered = cities.filter(city => city.lokasi.toLowerCase().includes(query.toLowerCase()));
      setFilteredCities(filtered); // Filter data kota berdasarkan input pencarian
    }
  };

  useEffect( async () => {
    getSetting()
    fetchCities()
    getSettingNotif()
    const { status } = await checkNotifications();
     
    setStatNotif(status)
    if (status === 'denied' || status === 'blocked') {
      Alert.alert(
        'Pemberitahuan Tidak Aktif',
        'Pemberitahuan anda tidak aktif. Silahkan Aktifkan Pemberitahuan di Pengaturan untuk mendapatkan Pengingat Sedekah dan Dzikir di Aplikasi Harum Peduli. Silahkan Tutup dan Buka Kembali Aplikasi Jika Sudah Diizinkan',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Buka Pengaturan', onPress: openSettings }
        ]
      );
    }
    PushNotification.createChannel(
      {
        channelId: "channel-id", // (required)
        channelName: "My channel", // (required)
        channelDescription: "A channel to categorise your notifications", // (optional)
        soundName: "default", // (optional)
        importance: 4, // (optional)
        vibrate: true, // (optional)
      },
      (created) => console.log(`createChannel returned '${created}'`)
    );
    
    // Function to schedule a notification at 14:40
    const scheduleNotificationAt = (hour, minute) => {
      const now = new Date();
      const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    
      // If the scheduled time is in the past, schedule it for the next day
      if (notificationTime <= now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
      }
    
      PushNotification.localNotificationSchedule({
        title: dataNotif.title_text_sedekah,
        message: dataNotif.desc_text_sedekah,
        date: notificationTime,
        allowWhileIdle: false,
        channelId: "channel-id"
      });
    };

    const scheduleNotificationAtDzikirPagi = (hour, minute) => {
      const now = new Date();
      const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    
      // If the scheduled time is in the past, schedule it for the next day
      if (notificationTime <= now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
      }
    
      PushNotification.localNotificationSchedule({
        title: dataNotif.title_text_dzikirpagi,
        message: dataNotif.desc_text_dzikirpetang,
        date: notificationTime,
        allowWhileIdle: false,
        channelId: "channel-id"
      });
    };
    

    const scheduleNotificationAtDzikirPetang = (hour, minute) => {
      const now = new Date();
      const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
    
      // If the scheduled time is in the past, schedule it for the next day
      if (notificationTime <= now) {
        notificationTime.setDate(notificationTime.getDate() + 1);
      }
    
      PushNotification.localNotificationSchedule({
        title: dataNotif.title_text_dzikirpetang,
        message: dataNotif.desc_text_dzikirpetang,
        date: notificationTime,
        allowWhileIdle: false,
        channelId: "channel-id"
      });
    };


    scheduleNotificationAt(5, 0);
    scheduleNotificationAtDzikirPagi(5,15)
    scheduleNotificationAtDzikirPetang(17,10)
  }, [])

 

  const selectCity = async (city) => {
    console.log('ddd', userLogin);
    setVisiblePilihCity(false)
    if (!city) return;
    setLoading(true);
    setSelectedCity(city);

    const lokasiDefault = {
     lokasiDefault: city.lokasi
    };


    Fire.database()
    .ref('dataUser/' + userLogin.uid)
    .update({ 
      lokasiDefault: city.lokasi
     })
    .then(() => {
      console.log('Location updated successfully');
    })
    .catch((error) => {
      console.error('Error updating location:', error);
    });


    try {
      // const res = await axios.get(`https://api.myquran.com/v2/sholat/kota/cari/${city.lokasi}`);
      const res = await axios.get(`https://api.myquran.com/v2/sholat/kota/cari/${city.lokasi}`);

      const cityId = res.data.data[0].id;

      const todayDate = moment().format('YYYY/MM/DD');
      const prayerRes = await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${cityId}/${todayDate}`);
      const prayerData = prayerRes.data.data;
      setPrayerTimes(prayerData);

      const currentTime = moment();
      const prays = prayerData.jadwal;

      // Daftar waktu sholat dari JSON (format 'HH:mm')
      const prayerList = [
        { name: 'Subuh', time: moment(prays.subuh, 'HH:mm') },
        { name: 'Dhuha', time: moment(prays.dhuha, 'HH:mm') },
        { name: 'Dzuhur', time: moment(prays.dzuhur, 'HH:mm') },
        { name: 'Ashar', time: moment(prays.ashar, 'HH:mm') },
        { name: 'Maghrib', time: moment(prays.maghrib, 'HH:mm') },
        { name: 'Isya', time: moment(prays.isya, 'HH:mm') },
      ];

      // Filter jadwal yang belum terlewat
      const upcomingPrayers = prayerList.filter(prayer => prayer.time.isAfter(currentTime));

      if (upcomingPrayers.length > 0) {
        const next = upcomingPrayers[0];
        setNextPrayer(next.name);
        setNextPrayerTime(next.time.format('HH:mm'));

        // Start interval to update time left
        startTimeLeft(next.time);
      } else {
        setNextPrayer('Tidak ada jadwal sholat tersisa untuk hari ini');
        setNextPrayerTime('');
        setTimeLeft('');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  const handleNotif = () => {
    
    
// Create the notification channel
PushNotification.createChannel(
  {
    channelId: "channel-id", // (required)
    channelName: "My channel", // (required)
    channelDescription: "A channel to categorise your notifications", // (optional)
    soundName: "default", // (optional)
    importance: 4, // (optional)
    vibrate: true, // (optional)
  },
  (created) => console.log(`createChannel returned '${created}'`)
);

// Function to schedule a notification at 14:40
const scheduleNotificationAt = (hour, minute) => {
  const now = new Date();
  const notificationTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);

  // If the scheduled time is in the past, schedule it for the next day
  if (notificationTime <= now) {
    notificationTime.setDate(notificationTime.getDate() + 1);
  }

  PushNotification.localNotificationSchedule({
    title: 'My notification title',
    message: 'My notification Message',
    date: notificationTime,
    allowWhileIdle: false,
    channelId: "channel-id"
  });
};

scheduleNotificationAt(14, 40);
  }

  const requestNotificationPermission = async () => {
    console.log('kesini');
    
    if(Platform.OS ==="android"){
      const { status } = await checkNotifications();
      console.log('statusnotif', status);
      
      if (status === 'denied' || status === 'blocked') {
        Alert.alert(
          'Pemberitahuan Tidak Aktif',
          'Pemberitahuan anda tidak aktif. Silahkan Aktifkan Pemberitahuan di Pengaturan untuk mendapatkan Pengingat Sedekah dan Dzikir di Aplikasi Harum Peduli',
          [
            { text: 'Batal', style: 'cancel' },
            { text: 'Buka Pengaturan', onPress: openSettings }
          ]
        );
      }
    } else {
      Alert.alert(
        'Pemberitahuan Aktif',
        'Pemberitahuan anda aktif. Tetap Nyalakan Pemberitahuan untuk Mendapatkan Pengingat Sedekah dan Dzikir',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Buka Pengaturan', onPress: openSettings }
        ]
      );
    }
  };


  return (
    <>
      <View style={styles.container}>
  
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    <TouchableOpacity style={{backgroundColor: '#d1d1d1', width: 50, height: 50, borderRadius: 10}} onPress={() => setVisiblePilihCity(true)}>
    <FontAwesomeIcon5 name="map-marker-alt" size={20} color="black" style={{marginTop: 14, alignSelf: 'center',}} />
      
    </TouchableOpacity>
    <Text style={styles.title}>{selectedCity.lokasi !== "" ? selectedCity.lokasi : ""}</Text>
    <TouchableOpacity style={{backgroundColor: '#d1d1d1', width: 50, height: 50, borderRadius: 10}}>
      {statNotif == "denied" || statNotif == "blocked" ?
    <FontAwesomeIcon5 name="bell-slash" size={20} color="black" style={{marginTop: 14, alignSelf: 'center',}} onPress={requestNotificationPermission} />
      :
    <FontAwesomeIcon5 name="bell" size={20} color="black" style={{marginTop: 14, alignSelf: 'center',}} onPress={requestNotificationPermission} />

      }
      
    </TouchableOpacity>
    </View>
    
      <Text style={styles.subtitle}>{moment().format('DD MMMM YYYY')} / {hijriDate} </Text>

      
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
        <View style={styles.prayerTimeBox}>
          <Text style={styles.prayerName}>{nextPrayer}</Text>
          <Text style={styles.prayerTime}>{nextPrayerTime}</Text>
          <Text style={styles.timeLeft}>{timeLeft}</Text>
        </View>

<ScrollView showsVerticalScrollIndicator={false}>
  <View>
  <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
        <TouchableOpacity onPress={() => navigation.push('ListQuran', {
          dataList: surahList
        })} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="quran" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Al-Qur'an"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('ListQuran', {
          dataList: surahList
        })} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="spinner" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Dzikir\nPagi-Petang"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="hands" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Doa-doa"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNotif} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="book" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Hadist"}</Text>
        
        </TouchableOpacity>

        
        
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 60}}>
        <TouchableOpacity onPress={() => navigation.push('ListQuran', {
          dataList: surahList
        })} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="graduation-cap" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Beasiswa"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('ListQuran', {
          dataList: surahList
        })} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <Icon name="sheep" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Qurban"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('ListQuran', {
          dataList: surahList
        })} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="calculator" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Hitung\nZakat"}</Text>
        
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('ListQuran', {
          dataList: surahList
        })} style={{backgroundColor: '#E5E4E2', width: 70, height: 70, borderRadius: 16, marginTop: 20}}>
    <FontAwesomeIcon5 name="hand-holding-heart" size={40} color="#ff6f00" style={{marginTop: 14, alignSelf: 'center',}} />
      <Text style={[styles.title, {
        fontSize: 12,
        marginTop: 30
      }]}>{"Sedekah"}</Text>
        
        </TouchableOpacity>

        
        
        </View>
       
       <View style={{marginBottom: 300}}>
       <Text style={{fontSize: 20, color: 'black', fontWeight: 'bold', marginTop: 80}}>{"Kajian"}</Text>

      <TouchableOpacity onPress={() => navigation.push('ViewYT')} style={{marginTop: 20, borderRadius: 20}}>
        {dataBanner.length > 0 &&
        <Image source={{uri: dataBanner[0].uri}} style={{width: '100%', height: 180}} />

        }
      </TouchableOpacity>

      </View>
  </View>
</ScrollView>
      

        </View>

        
      )}
    </View>
    <Modal visible={loading}>
        <ActivityIndicator size="large" color="black" />
    </Modal>
    <Modal
        visible={visiblePilihCity}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          <Text style={[styles.title, {
           marginBottom: 20
          }]}>{"Pilih Kota"}</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Cari kota..."
              value={searchQuery}
              onChangeText={searchCity}
            />
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.cityItem}
                  onPress={() => selectCity(item)}
                >
                  <Text style={styles.cityText}>{item.lokasi}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </>
  
  );
};

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
  modalContainer: {
    width: 400,
    height: 400,
    justifyContent: 'center',
   
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityText: {
    fontSize: 16,
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
    marginTop: -20
  },
  prayerTimeBox: {
    backgroundColor: '#ff6f00',
    padding: 20,
    borderRadius: 10,
    marginTop: 10,
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

export default Home;
