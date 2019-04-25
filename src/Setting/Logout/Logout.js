
import React, {Component} from 'react';
import { StyleSheet, Text, View, AsyncStorage, Dimensions , StatusBar} from 'react-native';
import SettingItem from '../SettingItems/SettingItem'
import {jwtToken} from '../../store/actions/fillinAccountInfo'

import {settingsIcon,rightArrowIcon} from '../../common/utility'


const {width, height} = Dimensions.get('window');

export default class Logout extends Component {
    state = {

    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Settings',
            headerBackTitle: null,
        };
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('white');
            StatusBar.setTranslucent(false)
        });
    }

    logoutHandler=(navName)=>{
        AsyncStorage.getItem(jwtToken)
            .then(res => {
                if (res){
                    AsyncStorage.setItem(jwtToken,JSON.stringify(''))
                    .then( () =>{
                        this.props.navigation.navigate('LoginSignUpSelect');
                    })
                } else {
                    this.props.navigation.navigate('LoginSignUpSelect');
                }
            })
            .catch(err => console.warn(err))    
        }

    render() {
        return (
            <View style={styles.container}>
                <SettingItem goTo={this.logoutHandler} navName='' icon={null} description='Logout'/>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd9d9'
    },
    itemStyle:{
        flexDirection:'row',
        width:width,
        height:height*0.08, 
        backgroundColor:'white',
        justifyContent:'space-between'
    }
});