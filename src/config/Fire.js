import { getStorage, ref } from '@firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage'
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




const Fire = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const storage = getStorage(Fire)


export default Fire;