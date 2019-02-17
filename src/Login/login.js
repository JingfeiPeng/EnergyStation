
import React, {Component} from 'react';
import { StyleSheet, Keyboard,Text, View, TextInput,StatusBar,TouchableHighlight, TouchableWithoutFeedback} from 'react-native';


export default class Login extends Component {
    state = {
        account: "",
        password: ""
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
        // account then NickName
        this.props.screenProps.onFillinAccountInfo(this.state.account,this.state.account!=''? this.state.account: 'Test User', this.state.password);
        this.props.navigation.navigate('HomeNav');
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
                        <Text style={styles.input}>Account</Text>
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