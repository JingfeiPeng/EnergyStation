
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity ,AsyncStorage, Image, StatusBar} from 'react-native';
import {fillinAccountInfo} from '../store/actions/index'
import { connect } from 'react-redux';
var jwtDecode = require('jwt-decode');
// import jwt from 'jsonwebtoken';

import logo from '../../imgs/energyStationLogo.png' 

// logo is an object that contains the path

class LoginSignUpSelect extends Component {
    state = {
        DEV_MODE:false
    }


    static navigationOptions ={
        header: null,
    }

    componentDidMount(){
        if (this.state.DEV_MODE) this.props.navigation.navigate('HomeNav');
        AsyncStorage.getItem('jwtToken')
        .then(JWTToken =>{
            if (JWTToken.length > 2){
                // decrpt the token
                let decoded = jwtDecode(JWTToken)
                //Update User Info
                this.props.fillinAccountInfo(decoded.email,decoded.name,JWTToken);
                this.props.navigation.navigate('HomeNav');
            }
        })
        .catch(err => console.warn(err))
    }

    render() {

        return (
            
            <View style={styles.container}>
                <StatusBar backgroundColor="white" barStyle="dark-content"/>
                <Image style={{height:200, width:200}}
                    source = {logo}
                />
                <Text style={styles.energyStationText}>
                    Energy Station 
                 </Text>
                 <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Register',{
                                message: "Register"
                            }) }>
                    <View style={styles.Register}>
                        <Text style={styles.RegisterText}>Register</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Login',{
                    message: "Login"
                }) }>
                    <View style={styles.Login}>
                        <Text style={styles.LoginText}>Login</Text>
                    </View>
                 </TouchableOpacity>
            </View>
          );
    }
}

//dispatcher
const mapDispatchToProps = dispatch =>{
    return {
        fillinAccountInfo: (account,nickName,token) => dispatch(fillinAccountInfo(account,nickName,token)),
    }
  } 
  
export default connect(null, mapDispatchToProps)(LoginSignUpSelect);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    energyStationText: {
        fontSize: 30,
        color: '#FDBE51',
    },
    Register:{
        height: 50,
        marginTop:35,
        width:350,
        borderRadius: 20,
        backgroundColor: '#FDBE51',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    RegisterText:{
        fontSize: 20,
        color: 'white',
    },
    Login:{
        height: 50,
        marginTop: 25,
        width:350,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center', 
        marginBottom: 10,
    },
    LoginText:{
        fontSize: 20,
    }
});