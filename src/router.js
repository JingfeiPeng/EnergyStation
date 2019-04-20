
import React, {Component} from 'react';
import { StyleSheet,Image,View, Text, SafeAreaView,ScrollView,Dimensions} from 'react-native'
import { 
    createSwitchNavigator, 
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    DrawerItems
} from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Home from './MainInterface/Home'
import Statistics from './Statistics/Statistics'
import Social from './Social/Social'
import Setting from './Setting/Setting'
import Login from './Login/login'
import Register from './Login/Register'
import LoginSignUpSelect from './Login/LoginSignUpSelect'
import PersonalInfo from './Setting/PersonalInfo/PersonalInfo'
import Logout from './Setting/Logout/Logout'
import ChangeInfoPage from './Setting/PersonalInfo/ChangeInfoPage'
import Maps from './Social/maps' 


const {width,height}= Dimensions.get('window')

export const SettingPageNav = createStackNavigator({
    Setting:{
        screen:Setting
    },
    PersonalInfo:{
        screen: PersonalInfo
    },
    Logout:{
        screen:Logout
    },
    ChangeInfoPage:{
        screen: ChangeInfoPage
    }
})

const customDrawerComponent = (props) =>(
    <SafeAreaView>
        <View style={{height:150,backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
            <Image 
                source={{uri:'https://cdn.shopify.com/s/files/1/0797/1877/products/NieRAutomata_2B_Cosplay_Costume_S13146_4.jpg?v=1542684729'}}
                style={{height:150,width:150}}
            />
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
)

export const socialNav = createDrawerNavigator({
    Social: {screen: Social},
    Maps:{screen: Maps}
},{
    contentComponent: customDrawerComponent,
    drawerWidth:width*0.5,
    contentOptions:{
        activeTintColor:'orange'
    }
})

export const HomeNav = createBottomTabNavigator({
    Home: { screen: Home},
    Statistics: { screen: Statistics,},
    Social : { screen: socialNav,},
    Setting:{ screen : SettingPageNav,}
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