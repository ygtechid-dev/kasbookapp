import { getStorage, ref } from '@firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage'
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const config= {

//Simulasi

apiKey: "AIzaSyAdCfEg1iBkrJZKFdve1h_h_u9n_xlQvhw",
authDomain: "harumproj.firebaseapp.com",
projectId: "harumproj",
storageBucket: "harumproj.appspot.com",
messagingSenderId: "186347566562",
appId: "1:186347566562:web:a1d3a688ecc83c21e175bb",
databaseURL: "https://harumproj-default-rtdb.asia-southeast1.firebasedatabase.app/",


}



// Initialize Google Sign-In
GoogleSignin.configure({
    webClientId: '186347566562-stfqg8m8lovvl4ql2d3ekt8fif01qtvi.apps.googleusercontent.com', // This should be your Firebase Web Client ID
  });

const Fire = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const storage = getStorage(Fire)


export default Fire;