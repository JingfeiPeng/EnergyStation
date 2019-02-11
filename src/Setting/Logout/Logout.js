
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions , StatusBar} from 'react-native';
import SettingItem from '../SettingItems/SettingItem'

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
        this.props.navigation.navigate('LoginSignUpSelect');
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