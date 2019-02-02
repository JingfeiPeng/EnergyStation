
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight , Alert} from 'react-native'
import { 
    createSwitchNavigator, 
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator 
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Home from './MainInterface/Home'
import Statistics from './Statistics/Statistics'
import Social from './Social/Social'
import Setting from './Setting/Setting'
import Login from './Login/login'
import Register from './Login/Register'
import LoginSignUpSelect from './Login/LoginSignUpSelect'

/*
const homeOptionsDrawNavigator = createDrawerNavigator({
    addNewActivty: 
})*/

export const HomeNav = createBottomTabNavigator({
    Home: {
        screen: Home,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon name="ios-home" size={32}/>
            )
        },
    },
    Statistics: {
        screen: Statistics,
        navigationOptions:{
            tabBarLabel: 'Statistics',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="ios-stats" size={32}/>
            )
        },
    },
    Social : {
        screen: Social,
        navigationOptions:{
            tabBarLabel: 'Social',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="ios-people"  size={32}/>
            )
        },
    },
    Setting:{
        //change name
        screen : Setting,
        navigationOptions:{
            tabBarLabel: 'Setting',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="ios-cash" size={32}/>
            )
        },
    }
},{
    initialRouteName: 'Home',   
    order: ['Home','Statistics','Social','Setting'],
    navigationOptions:{
        tabBarVisiable : true, // default
    },
    tabBarOptions: {
        activeTintColor:'#FDBE51',
        inactiveTintColor: 'grey',
        labelStyle:{
            fontSize: 15,
            paddingBottom: 5,
        },
        style: {
            height: 68,
            borderWidth: 1,
        }
    }
})

export const LoginNav = createStackNavigator({
    LoginSignUpSelect : {
        screen: LoginSignUpSelect
    },
    Login : {
        screen: Login,
    },
    Register:{
        screen: Register,
    }
})


export default AppNav = createSwitchNavigator({
    LoginNav : {
        screen: LoginNav,
    },
    HomeNav: {
        screen: HomeNav,
    }
})