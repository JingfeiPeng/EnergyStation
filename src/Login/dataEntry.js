
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Icon from  'react-native-vector-icons/Ionicons';

// props: errorMsg

//this.state.accountValid
//this.state.account
// this.accountChangeHandler

const dataEntry = (props) =>{
    return (
        <View style={styles.account}>
            <Text style={styles.input}>{props.title}:</Text>
            <View style={props.valid == false ? styles.invalidInput: styles.validInput }>
                <TextInput
                    underlineColorAndroid = 'transparent'
                    value = {props.data}
                    placeholder={props.placeholder}
                    secureTextEntry = {props.secureTextEntry? true: false}
                    onChangeText={(val) => props.changeValueHandler(val)}
                />
            </View>
        </View>
  );
}


const styles = StyleSheet.create({
    account : {
        width: "70%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        color: '#333333',
        width:'30%'
    },
    validInput:{
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    invalidInput:{
        width: '70%',
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },  
});

export default dataEntry; 