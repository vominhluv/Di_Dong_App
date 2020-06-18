/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import 'react-native-gesture-handler';

import { Provider } from "react-redux";
import store from './redux/store';

import { NavigationContainer, BaseRouter } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Screen/Login';
import Signup from './Screen/Signup';

import Home from './Screen/Home';
import UserProfile from './Screen/UserProfile';
import Saved from './Screen/Saved';
import Order from './Screen/Order';
import Search from './Screen/Search';
import FoodDetails from './Screen/ResDetails';




const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const HomeStackScreen = () =>
  <HomeStack.Navigator
    screenOptions={{
      headerShown: false,

    }}
  >
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Search" component={Search} />
    <HomeStack.Screen name="FoodDetails" component={FoodDetails} />
    <HomeStack.Screen name="Order" component={Order} />
  </HomeStack.Navigator>
const tabOption = (route) => ({
  tabBarLabel: router.name,
  tabBarIcon: () => <FontAwesome5 name={router.name.toLowerCase()} />
})

const FavoriteStack = createStackNavigator();
const FavoriteStackComponent = () =>
  <FavoriteStack.Navigator
    screenOptions={{
      headerShown: false,

    }}
  >
    <FavoriteStack.Screen name="Favorite" component={Saved}></FavoriteStack.Screen>
    <FavoriteStack.Screen name="FoodDetails" component={FoodDetails}></FavoriteStack.Screen>
    <FavoriteStack.Screen name="Order" component={Order}></FavoriteStack.Screen>
  </FavoriteStack.Navigator>
const AllStack = createStackNavigator();
const AllStackScreen = () =>
  <Provider store={store} >
    <NavigationContainer>
      <AllStack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,

        }}
      >
        <AllStack.Screen name='Login' component={Login}></AllStack.Screen>
        <AllStack.Screen name='Signup' component={Signup}></AllStack.Screen>
        <AllStack.Screen name='allTab' component={App}></AllStack.Screen>
      </AllStack.Navigator>
    </NavigationContainer>
  </Provider>
const App = () =>


  <Tab.Navigator tabBarOptions={{
    activeTintColor: '#f52d56',

    inactiveTintColor: '#c1c0c9',

  }} >
    <Tab.Screen name='Home' component={HomeStackScreen}
      options={{
        tabBarLabel: 'Trang chủ',
        tabBarIcon: ({ color }) => <Foundation name={'home'} size={25} style={{ color: color }} />
      }}
    ></Tab.Screen>
    <Tab.Screen name='Favorite' component={FavoriteStackComponent}
      options={{
        tabBarLabel: 'Yêu thích',
        tabBarIcon: ({ color }) => <AntDesign name={'star'} size={25} style={{ color: color }} />

      }}
    ></Tab.Screen>
    <Tab.Screen name='UserProfile' component={UserProfile}
      options={{
        tabBarIcon: ({ color }) => <FontAwesome name={'user'} size={25} style={{ color: color }} />,
        tabBarLabel: 'Hồ sơ',
      }}
    ></Tab.Screen>

  </Tab.Navigator>






export default AllStackScreen;
