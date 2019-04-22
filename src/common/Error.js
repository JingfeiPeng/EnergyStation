
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from  'react-native-vector-icons/Ionicons';

// props: errorMsg

const Error = (props) =>{
    return (
        <View>
            <View style={{alignItems:'center'}}>
                <Icon name="ios-warning" size={40}/>
            </View>
            <Text style={styles.ErrorStyle}>
                {props.errorMsg}
            </Text>
        </View>
  );
}


const styles = StyleSheet.create({
  ErrorStyle:{
      color:'red',
      fontSize: 20,
      textAlign: 'center'
  }
});

export default Error; 