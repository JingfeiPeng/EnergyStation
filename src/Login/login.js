
import React, {Component} from 'react';
import { StyleSheet, Keyboard,Text, View, TextInput,StatusBar,TouchableHighlight,CheckBox,TouchableWithoutFeedback,Alert} from 'react-native';
import {loginURL} from '../webService/urlLinks'
import { connect } from 'react-redux';
import {fillinAccountInfo} from '../store/actions/index'

class Login extends Component {
    state = {
        account: "JefferP@gmail.com",
        password: "StarterHack2019",
        rememberLogin: false,
    };

    static navigationOptions = ({ navigation }: { navigation: any }) => {
        return {
            title: navigation.getParam('message','Login'),
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#FDBE51',
                elevation: 0,
            },
            headerBackTitle: null,
        };

    }

    accountChangeHandler = val =>{
        this.setState({
            account: val
        });
    }

    passwordChangeHandler = val => {
        this.setState({
            password: val,
        });
    }

    LoginHandler = () => {
        Keyboard.dismiss();
        fetch(loginURL,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.account,
                password: this.state.password
            }),
        })
        .then(res => {
            if (res.ok) return res.text();
            // Login Failed
            return res.text()
            .then((res)=>{ 
                return {
                    message: res,
                    invalid: true,
                }
            })
            .catch(err => console.warn(err))

        })
        .then(async (res )=>{
            if (res.invalid == true){
                throw new Error(res.message)
            }
            // account then NickName
            await this.props.onFillinAccountInfo(this.state.account,this.state.account!=''? this.state.account: 'Test User', res, this.state.rememberLogin);
            this.props.navigation.navigate('HomeNav');
        })
        .catch(err => {
            Alert.alert(
                'Authentication Unsuccessful',
                err.message,
                [
                  {text: 'OK'},
                ],
                {cancelable: true},
              );
        })
    }



    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#FDBE51" barStyle="light-content" animated={true}/>
                    <View style={styles.titleContainer}>
                    <Text style={styles.title}>Login to EnergyStation</Text>
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.input}>Email</Text>
                        <TextInput
                            style={{ width: '70%'}}
                            value = {this.state.account}
                            placeholder="abc@gmail.com"
                            onChangeText={this.accountChangeHandler}
                        />
                    </View>
                    <View style={styles.account}>
                    <Text style={styles.input}>Password</Text>
                    <TextInput
                        secureTextEntry={true}
                        value = {this.state.password}
                        style={{ width: '70%'}}
                        placeholder='password'
                        onChangeText={this.passwordChangeHandler}
                    />
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <Text style={styles.input}>Remember Login</Text>
                        <CheckBox value={this.state.rememberLogin}
                            onValueChange={(val)=>this.setState({rememberLogin: val})}/>
                    </View>
                    <View style={styles.account}>
                        <TouchableHighlight onPress={this.LoginHandler} 
                            underlayColor="white">
                            <View style={styles.Login}>
                                <Text style={styles.buttonText}>Login</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
         </TouchableWithoutFeedback>
        );
    }
}

//dispatcher
const mapDispatchToProps = dispatch =>{
    return {
      onFillinAccountInfo: (account,nickName,token,saveToLocal) => dispatch(fillinAccountInfo(account,nickName,token,saveToLocal)),
    }
  } 
  
export default connect(null, mapDispatchToProps)(Login);



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  titleContainer:{
    flexDirection:'row',
    alignContent:'center',
    justifyContent: 'center',    
  },
  title: {
    fontSize: 25,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    textShadowColor:'#585858',
    textShadowOffset:{width: 2, height: 2},
    textShadowRadius:10,
  },
  input: {
    color: '#333333',
    width:'30%'
  },
  account : {
    width: "70%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  Login: {
    width: 100,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginHorizontal: 20
  },
  buttonText: {
    padding: 10,
    paddingHorizontal: 20,
    color: 'white'
  }
});