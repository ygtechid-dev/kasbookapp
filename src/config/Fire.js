import { getStorage, ref } from '@firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage'
const config= {

//Simulasi

// apiKey: "AIzaSyDjqSCV-K3hpJ38lCRvnMFyHM3ZF_QrDkE",
// authDomain: "mmbr77-64c35.firebaseapp.com",
// databaseURL: "https://mmbr77-64c35-default-rtdb.firebaseio.com",
// projectId: "mmbr77-64c35",
// storageBucket: "mmbr77-64c35.appspot.com",
// messagingSenderId: "224096714069",
// appId: "1:224096714069:web:dc32f9f944d2aa577b03dc"

apiKey: "AIzaSyAFbwTXGm-9mCvXWE7ppwJg_f9_pSvGvbQ",
authDomain: "projinputpaket.firebaseapp.com",
projectId: "projinputpaket",
storageBucket: "projinputpaket.appspot.com",
messagingSenderId: "686509897613",
appId: "1:686509897613:web:2c6bde130d67ec6fdeafc4",
databaseURL: "https://projinputpaket-default-rtdb.firebaseio.com/",

}




const Fire = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
export const storage = getStorage(Fire)


export default Fire;