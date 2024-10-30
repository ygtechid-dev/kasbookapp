
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import Home from '../pages/Home';
import Login from '../pages/Login';

import SplashScreen from '../pages/SplashScreen';

import MyTabBar from '../component/MyTabBar';
import Feed from '../pages/Feed';
import Register from '../pages/Login/Register';
import QuranMenu from '../pages/QuranMenu';
import MenuQuran from '../pages/QuranMenu/MenuQuran';
import Setting from '../pages/Setting';
import ViewYT from '../pages/ViewYT';



// import Login from '../screen/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Beranda" title="Tes" component={Home} />
      <Tab.Screen name="Peta Navigasi" component={Feed} />

      <Tab.Screen name="Profil" component={Setting} />
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
      name="MenuQuran"
      component={MenuQuran}
      options={{headerShown: false}}
    />
       <Stack.Screen
      name="ListQuran"
      component={QuranMenu}
      options={{headerShown: false}}
    />
       <Stack.Screen
      name="ViewYT"
      component={ViewYT}
      options={{headerShown: false}}
    />
     
     <Stack.Screen
      name="Register"
      component={Register}
      options={{headerShown: false}}
    />

    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})