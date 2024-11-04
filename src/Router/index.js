
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../pages/Home';
import Login from '../pages/Login';

import SplashScreen from '../pages/SplashScreen';

import MyTabBar from '../component/MyTabBar';
import Access from '../pages/Access';
import List from '../pages/List';
import Register from '../pages/Login/Register';
import Maintenance from '../pages/Maintenance';
import Shop from '../pages/Shop';
import System from '../pages/System';
import GantiOli from '../pages/Maintenance/GantiOli';
import ServisKendaraan from '../pages/Maintenance/ServisKendaraan';
import TambalBan from '../pages/Maintenance/TambalBan';
import LokasiBengkel from '../pages/Access/LokasiBengkel';
import LiveChat from '../pages/System/LiveChat';
import RiwayatServis from '../pages/System/RiwayatServis';
import JadwalBukaBengkel from '../pages/System/JadwalBukaBengkel';
import Reschedule from '../pages/System/Reschedule';
import IntegrasiKalendar from '../pages/System/IntegrasiKalendar';
import EditProfile from '../pages/List/EditProfile';
import TentangKami from '../pages/List/TentangKami';
import Cart from '../pages/Shop/Cart';
import Payment from '../pages/Shop/Payment';
import History from '../pages/Shop/History';



// import Login from '../screen/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Beranda" title="Tes" component={Home} />
      <Tab.Screen name="Menu" component={Shop} />
      <Tab.Screen name="Profil" component={List} />

      {/* <Tab.Screen name="Setting" component={Home} /> */}
     
     

    </Tab.Navigator>
  );
}
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
       
       <Stack.Screen
      name="Splash"
      component={SplashScreen}
      options={{headerShown: false}}
    />
     <Stack.Screen
      name="Home"
      component={MyTabs}
      options={{headerShown: false}}
    />
    
    <Stack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
     
        <Stack.Screen
      name="Maintenance"
      component={Maintenance}
      options={{headerShown: false}}
    />

<Stack.Screen
      name="System"
      component={System}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="Access"
      component={Access}
      options={{headerShown: false}}
    />
      <Stack.Screen
      name="Shop"
      component={Shop}
      options={{headerShown: false}}
    />
    
     <Stack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />
      <Stack.Screen
      name="GantiOli"
      component={GantiOli}
      options={{headerShown: false}}
    />
         <Stack.Screen
      name="ServisKendaraan"
      component={ServisKendaraan}
      options={{headerShown: false}}
    />
   
   <Stack.Screen
      name="TambalBan"
      component={TambalBan}
      options={{headerShown: false}}
    />
      <Stack.Screen
      name="LokasiBengkel"
      component={LokasiBengkel}
      options={{headerShown: false}}
    />
       <Stack.Screen
      name="LiveChat"
      component={LiveChat}
      options={{headerShown: false}}
    />
       <Stack.Screen
      name="RiwayatServis"
      component={RiwayatServis}
      options={{headerShown: false}}
    />
      <Stack.Screen
      name="JadwalBukaBengkel"
      component={JadwalBukaBengkel}
      options={{headerShown: false}}
    />
      <Stack.Screen
      name="Reschedule"
      component={Reschedule}
      options={{headerShown: false}}
    />
       <Stack.Screen
      name="IntegrasiKalendar"
      component={IntegrasiKalendar}
      options={{headerShown: false}}
    />
      <Stack.Screen
      name="EditProfile"
      component={EditProfile}
      options={{headerShown: false}}
    />
       <Stack.Screen
      name="TentangKami"
      component={TentangKami}
      options={{headerShown: false}}
    />
        <Stack.Screen
      name="Cart"
      component={Cart}
      options={{headerShown: false}}
    />
        <Stack.Screen
      name="Payment"
      component={Payment}
      options={{headerShown: false}}
    />
    <Stack.Screen
      name="History"
      component={History}
      options={{headerShown: false}}
    />
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})