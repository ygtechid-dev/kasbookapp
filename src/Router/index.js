
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



// import Login from '../screen/Login';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Beranda" title="Tes" component={Home} />
      <Tab.Screen name="Menu" component={List} />
      <Tab.Screen name="Profil" component={List} />

      <Tab.Screen name="Setting" component={List} />
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
   
    </Stack.Navigator>
  )
}

export default Router

const styles = StyleSheet.create({})