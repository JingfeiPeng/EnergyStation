
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions , Image} from 'react-native';

import {settingsIcon,rightArrowIcon} from '../../common/utility'

const {width, height} = Dimensions.get('window');


//Requires: goTo(navName) val is navName
// navName: route to go
// icon: icon to display
// description: text 

export default class SettingItem extends Component {
    state = {

    };

    render() {
        return (
            <TouchableHighlight onPress={()=>this.props.goTo(this.props.navName)}>
                <View style ={styles.itemStyle}>
                    <View style={{flexDirection:'row',alignItems:'center',paddingLeft:width*0.05}}>
                        {this.props.icon != ''? this.props.icon: null}
                        <Text style={{color:'black',
                                     fontSize:20,marginLeft: this.props.icon !=null? 10: 0}}>
                            {this.props.description}
                        </Text>
                    </View>
                    <View style={{justifyContent:'center',marginRight:10}}>{rightArrowIcon}</View>
                </View>
            </TouchableHighlight>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd9d9'
    },
    itemStyle:{
        flexDirection:'row',
        width:width,
        height:height*0.08, 
        backgroundColor:'white',
        justifyContent:'space-between'
    }
});