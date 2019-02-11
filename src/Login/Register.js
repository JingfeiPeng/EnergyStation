
import React, {Component} from 'react';
import { StyleSheet,StatusBar, Text, View, TextInput,Keyboard, TouchableHighlight , TouchableWithoutFeedback} from 'react-native';
import Error from "../common/Error"


export default class Register extends Component {
    state = {
        account: "",
        nickName:'',
        password: "",
        passwordRepeat: "",
        error: ''
    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('message','a message'),
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: '#FDBE51',
                elevation: 0,
            },
            headerBackTitle: null,
        };

    }

    accountChangeHandler = val =>{
        if (val.length > 20){
            this.setState({
                error: 'Exceeded max length requirement for account'
            })
        }
        this.setState({
            account: val
        });
    }

    passwordChangeHandler = val => {
        this.setState({
            password: val,
        });
    }

    nickNameChangeHandler = val =>{
        if (val.length > 20){
            this.setState({
                error:"Nick name exceeded max length"
            })
        } 
        this.setState({
            nickName: val
        })
        if (val.length == 0){
            this.setState({
                error: "Nick Name can't be empty"
            })
        }
    }
    
    repeatPasswordChangeHandler = val =>{
        this.setState({
            passwordRepeat: val,
        });
    }

    registerAccountHandler = () =>{
        let noError = true;
        if (this.state.account.length > 20){
            this.setState({
                error: 'Exceeded max length requirement for account'
            })
            noError = false;
        } else if ( this.state.password !== this.state.passwordRepeat){
            this.setState({error:"Passwords do not match"});
            noError = false;
        } else if (this.state.password.length < 8){
            this.setState({error:"Password must be at least 8 characters"})
            noError = false;
        } else if (this.state.account.length < 6){
            this.setState({error:"account name must be at least 6 characters"})
            noError = false;
        } else {
            const passwordTotest = this.state.password;
            let containNumber = false;
            let containCharacter = false;
            let containUppercase = false;
            for (let i = 0; i <passwordTotest.length; i++){
                const character = passwordTotest[i];
                if (!isNaN(parseInt(character)) ) {containNumber = true;}
                else if (character === character.toUpperCase()) {containUppercase = true;}
                else {containCharacter = true;}
            }
            //console.warn("containNumber: "+containNumber+" containCharacter: "+containCharacter+" containUppercase: "+containUppercase);
            if ((containNumber && containCharacter && containUppercase) === false){
                this.setState({error:"The password must at least contain: \n - 1 uppercase character \n - 1 lowercase character \n - 1 number"})
                noError = false;
            }
        }

        if (noError) {
            const accountData = {
                account : this.state.account,
                password : this.state.password,
            };
            fetch("https://energystation-c5f1f.firebaseio.com/accounts.json",{
                method: 'POST',
                body: JSON.stringify(accountData),
            })
            .catch(err => console.warn(err))
            .then( (res) => res.json())
            .then(parsedRes => {
                console.warn(parsedRes);
            });
            this.props.screenProps.onFillinAccountInfo(this.state.account,this.state.nickName);
            this.props.navigation.navigate('HomeNav',{
                userName: this.state.account,
            });
        }
    }

    renderError = () =>{
        if (this.state.error != ''){
            return (                        
                <View style={{marginTop:10, marginHorizontal: 20, alignItems:'center'}}>
                    <Error errorMsg={this.state.error}/>
                </View>
            )
        }
    }


    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <StatusBar backgroundColor="#FDBE51" barStyle="light-content" animated={true}/>
                    <View style={styles.titleContainer}>
                    <Text style={styles.title}>Welcome to EnergyStation</Text>
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.input}>Account</Text>
                        <TextInput
                            style={{ width: '70%'}}
                            value = {this.state.account}
                            placeholder="randomUser123"
                            onChangeText={this.accountChangeHandler}
                        />
                    </View>
                    <View style={styles.account}>
                        <Text style={styles.input}>Nick Name: </Text>
                        <TextInput
                            secureTextEntry={true}
                            value = {this.state.nickName}
                            style={{ width: '70%'}}
                            placeholder='Joseph Stalin'
                            onChangeText={this.nickNameChangeHandler}
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
                        <Text style={styles.input}>Repeat Password</Text>
                        <TextInput
                            secureTextEntry={true}
                            value = {this.state.passwordRepeat}
                            style={{ width: '70%'}}
                            placeholder='Repeat password'
                            onChangeText={this.repeatPasswordChangeHandler}
                        />
                    </View>
                    <View style={styles.account}>
                        <TouchableHighlight onPress={this.registerAccountHandler} 
                            underlayColor="white">
                            <View style={styles.Login}>
                                <Text style={styles.buttonText}>SignUp</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    { this.renderError()}
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
    justifyContent: 'center'
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
  signUp: {
    width: 100,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginHorizontal: 20
  },
  Login: {
    width: 100,
    alignItems: 'center',
    backgroundColor: '#9b1fd1',
    borderRadius: 10,
    marginHorizontal: 20
  },
  buttonText: {
    padding: 10,
    paddingHorizontal: 20,
    color: 'white'
  }
});