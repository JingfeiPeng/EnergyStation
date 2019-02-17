
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions , Image} from 'react-native';
import { withNavigation } from 'react-navigation';
import {settingsIcon,rightArrowIcon} from '../../common/utility'

const {width, height} = Dimensions.get('window');

const NormalHeight = height*0.08;
const profilePictureHeight = height*0.15;
//Requires: changer(navName) val is navName
// navName: route to go
// icon: icon to display
// description: text 
// data: data to be displayed on right

import defaultBackground from '../../../imgs/pantherTank.jpg' 


class PersonalInfoItem extends Component {
    state = {

    };

    render() {
        let data = (<Text style={{marginRight:5,fontSize:15,color:'grey'}}>{this.props.data}</Text>);

        if (this.props.description =='Profile Picture'){
            data = (<Image source = {defaultBackground} style={{margin:15,width:80,height:80,borderRadius:5}}/>)
        } 
        return (
            <TouchableHighlight onPress={()=>this.props.navigation.navigate('ChangeInfoPage',{
                headerName:this.props.headerName,
                originalVal: this.props.data,
                explanation: this.props.explanation,
                changer : this.props.changer,
                save: this.props.changer
            })}>

                <View style ={[styles.itemStyle,{height: this.props.description == 'Profile Picture'? profilePictureHeight:NormalHeight }]}>
                    <View style={{flexDirection:'row',alignItems:'center',paddingLeft:width*0.05}}>
                        {this.props.icon != ''? this.props.icon: null}
                        <Text style={{color:'black',
                                        fontSize:15,marginLeft: this.props.icon !=null? 10: 0}}>
                            {this.props.description}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center',marginRight:10}}>
                        {data}
                        {rightArrowIcon}
                    </View>
                </View>
            </TouchableHighlight>
          );
    }
}

export default withNavigation(PersonalInfoItem);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd9d9'
    },
    itemStyle:{
        flexDirection:'row',
        width:width,
        backgroundColor:'white',
        justifyContent:'space-between',
        borderBottomColor:'grey',
        borderBottomWidth:1,
    }
});