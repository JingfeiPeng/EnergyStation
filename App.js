
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {changeEnergyPtr,fillinAccountInfo} from './src/store/actions/index'
//import firebase from 'firebase'

import { YellowBox } from 'react-native';

import AppNav from './src/router';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Setting a timer']);
class  App extends Component {

  render() {
    return (
        <AppNav screenProps={this.props} />
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    // account: state.generalReducer.account,
    // nickName: state.generalReducer.nickName,
    // curPoint: state.generalReducer.curPoint,
    // password: state.generalReducer.password,
    ...state.generalReducer
  }
}

//dispatcher
const mapDispatchToProps = dispatch =>{
  return {
    onChangeEnergyPtr: (ptrAmt)=> dispatch(changeEnergyPtr(ptrAmt)),
    onFillinAccountInfo: (account,nickName,token) => dispatch(fillinAccountInfo(account,nickName,token)),
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(App);

// const styles = StyleSheet.create({
//   container:{
//     flex : 1
//   }
// });
