
import React, {Component} from 'react';
import { StyleSheet, Text,ImageBackground ,Dimensions,Image, View, TouchableHighlight , StatusBar} from 'react-native';
import {settingPersonIcon,settingsIcon,rightArrowIcon,cameraIcon,paymentIcon,activityPlansIcon} from '../common/utility'

import SettingItem from './SettingItems/SettingItem'

import defaultBackground from '../../imgs/pantherTank.jpg' 
import { robotoWeights } from 'react-native-typography';

const {width, height} = Dimensions.get('window');

export default class Setting extends Component {
    state = {

    };

    static navigationOptions ={
        header: null,
    }
    goTo = (routeName) =>{
        this.props.navigation.navigate(routeName);
    }

    // for dynamically changing color in StatusBar Since all screens in Tabnavigator is rendered at the same time
    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent(true)
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    seeAccountInfo = () =>{
        this.props.navigation.navigate('PersonalInfo')
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground 
                    source = {defaultBackground}
                    style={styles.backgoroundImageStyle}>
                    <View style={styles.imageIconContainer} >
                        <View style={{marginRight:width*0.05, marginTop:width*0.07,alignItems:'flex-end'}}>{cameraIcon}</View>
                        <View style={styles.titleText}>
                            <Text style={styles.name}>{this.props.screenProps.nickName}</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{position:'absolute',top:130,left:30,zIndex:10,width:80,height:80}}>
                        <Image source = {defaultBackground} style={{width:80,height:80,borderRadius:5}}/>
                </View>
                <TouchableHighlight style={styles.titleContainer} onPress={this.seeAccountInfo}>
                    <View style={{flexDirection:'row',width: width,justifyContent:'space-between'}}>
                        <View>
                            <Text style={{marginTop:8,color:'grey',fontSize:20, marginLeft:120}}> Id: {this.props.screenProps.account}</Text>
                        </View>
                        <View style={{marginTop:8,marginRight:10}}>{rightArrowIcon}</View>
                    </View>
                </TouchableHighlight>
                <SettingItem goTo={this.goTo} icon={settingsIcon} navName='Logout' description='Settings'/>
                <View style={{height:10}}></View>
                <SettingItem goTo={this.goTo} icon={paymentIcon} navName='PaymentInfo' description='Payments'/>
                <SettingItem goTo={this.goTo} icon={activityPlansIcon} navName='ActivitiesPlan' description='Activities plans'/>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    titleText:{
        flexDirection:'row',
        marginLeft:width*0.3,
        transform:[
            {translateY: -5}
        ],
        zIndex: -5,
        justifyContent:'flex-start'
    },
    titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'white',
        borderTopRightRadius:height*0.02,
        borderTopLeftRadius:height*0.02,
        width: width,
        height:height * 0.10,
        marginBottom:10,
        transform:[
            {translateY: -height*0.02}
        ],

    }, 
    imageIconContainer:{
        backgroundColor: 'rgba(0,0,0,0.4)',
        flex: 1,
        justifyContent:'space-between',
    },  
    backgoroundImageStyle:{
        height:180, 
        width:'100%',
        zIndex:-10,
    },  
    name: {
        fontSize: 25,
        color: 'white',
        fontWeight: 'bold',
        marginBottom:10
    },  
    container: {
        flex: 1,
        backgroundColor: '#ddd9d9',
        alignItems:'center',
    },
    logoutButton:{
        backgroundColor:'blue',
        width:200,
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:10, 
        paddingHorizontal:40,
        paddingVertical: 5,
        elevation: 1,
    }
});