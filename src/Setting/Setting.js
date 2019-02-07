
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight , Alert} from 'react-native';
import {settingPersonIcon} from '../common/utility'

export default class Setting extends Component {
    state = {

    };
    render() {
        return (
            <View style={styles.container}>
                <View>
                    {settingPersonIcon}
                    <Text>{this.props.screenProps.account}</Text>
                </View>
                <TouchableHighlight onPress={()=>this.props.navigation.navigate('LoginSignUpSelect')}>
                    <View style ={styles.logoutButton}>
                        <Text style={{color:'white', fontSize:20}}>Logout</Text>
                    </View>
                </TouchableHighlight>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'center',
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