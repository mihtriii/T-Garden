import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Login'
import SignUp from './SignUp'
import Details from './Details'
import History from './History'
import HomeScreen from './Home'
import UserScreen from './User'
import AddFarm from './AddFarm'
import ForgotPassword from './ForgotPassword'
import CameraCreateNewFarmHouse from './CameraCreateNewFarmHouse.js'
import AddDevice from './AddDevice.js'
import PremiumPakage from './PremiumPakage.js'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function HomeScreen() {
    <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='SignUp' component={SignUp}/>
        <Stack.Screen name='Details' component={Details}/>
        <Stack.Screen name='History' component={History}/>
        <Stack.Screen name='AddFarm' component={AddFarm}/>
        <Stack.Screen name='User' component={UserScreen}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
        <Stack.Screen name='CameraCreateNewFarmHouse' component={CameraCreateNewFarmHouse}/>
        <Stack.Screen name='AddDevice' component={AddDevice}/>
        <Stack.Screen name='PremiumPakage' component={PremiumPakage}/>
    </Stack.Navigator>
}

function Tab () {
    <Tab.Navigator initialRouteName='Home'
    screenOptions={{
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: {
        backgroundColor: '#ebf2f2',
        height: 90
    }
    }}>
        <Tab.Screen name="Home" component={HomeScreen}  options={{
            tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image 
                source={require('./assets/img/home.png')}
                resizeMode="contain"
                style={{ 
                width: 25,
                height: 25,
                tintColor: focused ? '#2BA84A' : '#333'
                }}/>
                <Text style={{ color: focused ? '#2BA84A' : '#333', fontSize: 12 }}>Home</Text>
            </View>
            ),
        }}/>
        <Tab.Screen name="AddFarm" component={AddFarm} options={{
            tabBarIcon: ({focused}) => (
            <TouchableOpacity onPress={() => navigation.navigate('AddFarm')}>
                <View style={{
                width: 70,
                height: 70,
                backgroundColor: '#2BA84A',
                borderRadius: 35,
                justifyContent: 'center',
                alignItems: 'center',
                top: -30
                }}>
                <Image 
                source={require('./assets/img/plus.png')}
                resizeMode="contain"
                style={{
                    width: 30,
                    height: 30,
                    tintColor: '#fff'
                }}/>
                </View>
            </TouchableOpacity>
            ),        
        }}/>
        <Tab.Screen name="User" component={UserScreen} options={{
            tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image 
                source={require('./assets/img/login.png')}
                resizeMode="contain"
                style={{ 
                width: 25,
                height: 25,
                tintColor: focused ? '#2BA84A' : '#333'
                }}/>
                <Text style={{ color: focused ? '#2BA84A' : '#333', fontSize: 12 }}>Login</Text>
            </View>
            ),
        }}/>
    </Tab.Navigator>    
}

export default class Main extends Component {
    render() {
        return(
            <Tab/>
        );
    }
}