
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../pages/Home';
import Login from '../pages/Login';

import SplashScreen from '../pages/SplashScreen';


import MyTabBar from '../component/MyTabBar';
import Cameras from '../pages/Cameras';
import ScanManual from '../pages/Cameras/ScanManual';
import DataExp from '../pages/DataExp';
import PenjualanScreen from '../pages/PenjualanScreen';
import TransaksiKeuangan from '../pages/TransaksiKeuangan';
import InputKeuangan from '../pages/TransaksiKeuangan/InputKeuangan';




// import Login from '../screen/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Penjualan" title="Tes" component={Home} />
      <Tab.Screen name="Keuangan" component={TransaksiKeuangan} />

      <Tab.Screen name="Produk" component={Home} />
      <Tab.Screen name="Laporan" component={Home} />

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
      name="InputKeuangan"
      component={InputKeuangan}
      options={{headerShown: false}}
    />
    
  
   <Stack.Screen
      name="Camera"
      component={Cameras}
      options={{headerShown: false}}
    />
     <Stack.Screen
      name="DataExp"
      component={DataExp}
      options={{headerShown: false}}
    />
    
    

<Stack.Screen
      name="PenjualanScreen"
      component={PenjualanScreen}
      options={{headerShown: false}}
    />
    
     

<Stack.Screen
      name="ScanManual"
      component={ScanManual}
      options={{headerShown: false}}
    />
   
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})