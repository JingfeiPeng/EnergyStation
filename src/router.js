
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
    },
    Statistics: {
        screen: Statistics,
    },
    Social : { screen: Social,},
    Setting:{screen : Setting,}
},{
    initialRouteName: 'Home',   
    order: ['Home','Statistics','Social','Setting'],
    navigationOptions: ({navigation}) =>({
        tabBarIcon: ({focused, tintColor}) =>{
            const {routeName} = navigation.state;
            let iconName = '';
            switch (routeName){
                case "Home":
                    iconName = 'ios-home';
                    break;
                case "Statistics":
                    iconName = 'ios-stats';
                    break;
                case "Social":
                    iconName = 'ios-people';
                    break;
                case "Setting":
                    iconName = 'ios-settings'
                    break;
                default:
                    iconName = 'ios-home'
            }
            if (!focused){
                iconName += '-outline';
            }
            return <Icon name={iconName} type='Ionicons' color={tintColor} size ={32}/>
        }
    }),
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

//react-redux

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