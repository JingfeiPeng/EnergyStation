
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
//import firebase from 'firebase'; 

import { YellowBox } from 'react-native';

import AppNav from './src/router';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class  App extends Component {

  /* setup firebase
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyBPDtqcm1o9wu7T9eKPp-TdEXM-PJqb-YI",
      authDomain: "energystation-c5f1f.firebaseapp.com",
      databaseURL: "https://energystation-c5f1f.firebaseio.com",
      projectId: "energystation-c5f1f",
      storageBucket: "energystation-c5f1f.appspot.com",
      messagingSenderId: "690361745753"
    };
    firebase.initializeApp(config);
  }*/

  render() {
    return (
      <View style={styles.container}>
        <AppNav/>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex : 1
  }
});
