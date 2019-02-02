
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from  'react-native-vector-icons/Ionicons';

export default class  Error extends Component {
  render() {
    return (
        <View>
            <View style={{alignItems:'center'}}>
                <Icon name="ios-warning" size={40}/>
            </View>
            <Text style={styles.ErrorStyle}>
                {this.props.errorMsg}
            </Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  ErrorStyle:{
      color:'red',
      fontSize: 20,
  }
});
