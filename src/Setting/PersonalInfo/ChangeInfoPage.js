
import React, {Component} from 'react';
import { StyleSheet, Text,TextInput, View, Button, Dimensions , TouchableOpacity,TouchableNativeFeedback} from 'react-native';
import { withNavigation } from 'react-navigation';
import {backButtonIconWhite} from "../../common/utility"
const {width, height} = Dimensions.get('window');

//need headerName: name to display at Header
// explanation: explain what this property that user is changing means
// originalVal: pass in as navigation parameter

class ChangeInfoPage extends Component {
    state = {
        originalVal: this.props.navigation.getParam('originalVal','bug'),
        val: this.props.navigation.getParam('originalVal','bug'),
        buttonDisabled: true,
    };

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    }

    changeValHandler = (val)=>{
        this.setState({
            val: val,
            buttonDisabled: this.state.originalVal == val
        })
    }

    changeNickName = ()=>{
        this.props.screenProps.onFillinAccountInfo(this.props.screenProps.account,this.state.val, this.props.screenProps.password)
    }

    saveInfo = () =>{
        //this.props.navigation.state.params.save(this.state.val);
        const path = this.props.navigation.getParam('headerName','Bug');
        if (path =="Change Nickname") this.changeNickName();
        this.props.navigation.goBack();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <View style={{flexDirection:'row',padding:5}}>
                        <View style={{width:10}}></View>
                        <TouchableNativeFeedback onPress={()=>this.props.navigation.goBack()}>
                            {backButtonIconWhite}
                        </TouchableNativeFeedback>
                        <Text style={{marginLeft:10,fontSize:20,color:'black'}}>
                            {this.props.navigation.getParam('headerName','Bug')}
                        </Text>
                    </View>
                    <View style={{marginRight:10}}>
                        <TouchableOpacity style={[styles.saveButton,{opacity:this.state.buttonDisabled? 0.5:1}]} 
                            onPress={this.saveInfo} disabled={this.state.buttonDisabled}>
                            <Text style={{color:'white',fontSize:20}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width:'80%'}}>
                    <TextInput style={{width:'100%'}} underlineColorAndroid='green' value={this.state.val} onChangeText={(val)=> this.changeValHandler(val) }/>
                    <View style={{height:5}}></View>
                    <Text style={{color:'grey',fontSize:15}}>{this.props.navigation.getParam('explanation','')}</Text>
                </View>
            </View>
          );
    }
}

export default withNavigation(ChangeInfoPage);

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: 'white',
        justifyContent:'space-between',
        marginBottom:5,
        width:'100%',
        borderColor:'grey',
        borderBottomWidth:1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        alignItems:'center'
    },
    saveButton:{
        width:70,
        height:35,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center'
    }
});