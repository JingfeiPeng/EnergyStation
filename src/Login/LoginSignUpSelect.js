
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity , Image, StatusBar} from 'react-native';

import logo from '../../imgs/energyStationLogo.png' 
// logo is an object that contains the path

export default class LoginSignUpSelect extends Component {
    state = {
        DEV_MODE:false
    }


    static navigationOptions ={
        header: null,
    }

    componentDidMount(){
        if (this.state.DEV_MODE) this.props.navigation.navigate('HomeNav');
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