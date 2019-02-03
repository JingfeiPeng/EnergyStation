import React, {Component} from 'react';
import { Picker, StyleSheet,Keyboard,Dimensions, Modal,Text, TextInput, View, Button, TouchableNativeFeedback ,TouchableWithoutFeedback} from 'react-native';
import {Excercise, HealthyLife, Play, study } from "../../common/utility"


const {width, height} = Dimensions.get('window');


export default class ActivityDetails extends Component {
    state = {
        activity: this.props.activity,
    }

    changeActivityInfoHandler = (identifier, val)=>{
        this.setState(prevState => {
            return {
                activity:{
                    ...prevState.activity,
                    [identifier]: val,
                }
            }
        })
    }

    componentWillReceiveProps(nextProps){
        const {activity} = nextProps;
        this.setState({
            activity
        });
    }
    
    render() {
        let modalContent = null;
        if (this.props.activity !== null){
            modalContent = (
                <View>
                    <Picker
                        selectedValue={this.state.activity.type}
                        //style={}
                        onValueChange={(val) => this.changeActivityInfoHandler("type", val)}
                        mode="dropdown"
                        itemStyle={{fontSize:17, paddingLeft: width*0.035}}
                    >
                    <Picker.Item label="Type of Activity..." value=""/>
                    <Picker.Item label={Excercise} value={Excercise}/>
                    <Picker.Item label={HealthyLife} value={HealthyLife}/>
                    <Picker.Item label={Play}value={Play}/>
                    <Picker.Item label={study} value={study}/>
                    </Picker>

                    <Text> Activity Name: </Text>
                    <TextInput value={this.state.activity.activityName}
                        onChangeText = {(val) =>this.changeActivityInfoHandler("activityName",val)}
                        placeholder = "Activity Name">
                        </TextInput>
                    <Text>Estimated Length of Activity in minutes</Text>
                    <TextInput value={this.state.activity.length}
                        onChangeText = {(val) =>this.changeActivityInfoHandler("length",val)}
                        placeholder = "50">
                        </TextInput>
                    <Text>Energy</Text>
                    <TextInput value={this.state.activity.energyPtr}
                        onChangeText = {(val) =>this.changeActivityInfoHandler("energyPtr",val)}
                        placeholder = "10">
                        </TextInput>
                    <Text>Start time of activity </Text>
                    <TextInput value={this.state.activity.hour}
                        onChangeText={(val) =>this.changeActivityInfoHandler("hour",val)}>
                        </TextInput>
                    <TextInput value={this.state.activity.minute}
                        onChangeText={(val) =>this.changeActivityInfoHandler("minute",val)}>
                        </TextInput>
                </View>
            );
            //console.warn(this.props.selectId);
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Modal
                    visible={this.props.activity !== null}
                    onRequestClose={this.props.onModalClosed}
                    animationType ="slide">
                    <View style = {styles.modalContainer}>
                        {modalContent}
                        <View style={styles.buttonContainer}>
                            <TouchableNativeFeedback onPress = {this.props.onModalClosed}>
                                <View  style={[styles.button,styles.cancelButton]}>
                                    <Text style={{color:'red',fontSize:20}}> Cancel </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <TouchableNativeFeedback
                                onPress = {()=>this.props.onModalSave(this.state.activity, this.props.selectId)}>
                                <View style={[styles.button,styles.saveButton]}>
                                    <Text style={{color:'green',fontSize:20}}> Save </Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </Modal>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    modalContainer :{
        margin: 22,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'space-evenly',
    },
    button:{
        width:100,
        alignItems: 'center',
        marginVertical: 5,
        padding: 5,
        borderColor: 'black',
        borderWidth:2,
    },
    cancelButton:{

    },
    saveButton:{
        
    }
});