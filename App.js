
import React, {Component} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import { connect } from 'react-redux';
import {changeEnergyPtr,fillinAccountInfo} from './src/store/actions/index'

import { YellowBox } from 'react-native';

import AppNav from './src/router';


YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
// screenProps={{account: this.props.account,curPoint=this.props.curPoint}}
class  App extends Component {
  render() {
    return (
        <AppNav screenProps={this.props} />
    );
  }
}

const mapStateToProps = (state) =>{
  return {
    account: state.generalReducer.account,
    curPoint: state.generalReducer.curPoint,
  }
}

//dispatcher
const mapDispatchToProps = dispatch =>{
  return {
    onChangeEnergyPtr: (ptrAmt)=> dispatch(changeEnergyPtr(ptrAmt)),
    onFillinAccountInfo: (account,nickName) => dispatch(fillinAccountInfo(account,nickName)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// const styles = StyleSheet.create({
//   container:{
//     flex : 1
//   }
// });
