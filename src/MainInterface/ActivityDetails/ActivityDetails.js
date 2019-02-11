import React, {Component} from 'react';
import { Picker, StyleSheet,Keyboard,Dimensions, Modal,Text, TextInput, View,StatusBar,
    TouchableNativeFeedback, TouchableOpacity,TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Excercise, HealthyLife, Play, study, timePickerIcon,backButtonIcon,deleteButtonIcon} from "../../common/utility"


const {width, height} = Dimensions.get('window');


export default class ActivityDetails extends Component {
    state = {
        activity: this.props.activity,
        isDateTimePickerVisible:false,
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

    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (time) => {
        time = time.toString();
        let timeParts = time.split(':');
        let splitFirstPart = timeParts[0].split(' ');
        let hour = splitFirstPart[4];
        let minute = timeParts[1];
        this.setState(prevState => {
            return {
                activity:{
                    ...prevState.activity,
                    hour: hour,
                    minute: minute
                }
            }
        })
        this._hideDateTimePicker();
      };
    
    deleteItself = () =>{
        this.props.deleteActivity(this.props.selectId);
        this.props.onModalClosed();
    }
    

    render() {
        let modalContent = null;
        if (this.props.activity !== null){
            modalContent = (
                <View style={{height:300}}>
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

                    <Text style={styles.textLabel}> Activity Name: </Text>
                    <TextInput value={this.state.activity.activityName}
                        onChangeText = {(val) =>this.changeActivityInfoHandler("activityName",val)}
                        placeholder = "Activity Name">
                    </TextInput>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.textLabel}>Estimated Length of Activity in minutes</Text>
                        <TextInput value={this.state.activity.length} style={{width:90}} 
                            onChangeText = {(val) =>this.changeActivityInfoHandler("length",val)}
                            placeholder = "50 mins">
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableNativeFeedback onPress={this._showDateTimePicker}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.textLabel}>Start time</Text>
                                <TextInput placeholder="10:00" 
                                    style={{width:90,color:'black'}} value={this.state.activity.hour+':'+this.state.activity.minute}
                                    editable={false}>
                                </TextInput>
                                {timePickerIcon}
                                <DateTimePicker
                                    mode='time'
                                    datePickerModeAndroid='spinner'
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this._handleDatePicked}
                                    onCancel={this._hideDateTimePicker}
                                />
                            </View>
                        </TouchableNativeFeedback>
                        <Text style={[styles.textLabel,{marginLeft:20}]}>Energy</Text>

                            <Picker
                                selectedValue={this.state.activity.energyPtr}
                                style={{width:120}}
                                value={this.state.activity.energyPtr}
                                onValueChange={(val) => this.changeActivityInfoHandler("energyPtr", val)}
                                mode="dialog"
                                itemStyle={{fontSize:17, paddingLeft: width*0.035}}
                            >
                            <Picker.Item label="0" value={0}/>
                            <Picker.Item label="10" value={10}/>
                            <Picker.Item label="20" value={20}/>
                            <Picker.Item label="30" value={30}/>
                            <Picker.Item label='40' value={40}/>
                            </Picker>

                    </View>
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
                        <StatusBar backgroundColor="#FDBE51" barStyle="light-content" animated={true}/>
                        <View style={styles.topBar}>
                            <View style={{flexDirection:'row',padding:5}}>
                                <TouchableNativeFeedback onPress={this.props.onModalClosed}>
                                    {backButtonIcon}
                                </TouchableNativeFeedback>
                                <Text style={{marginLeft:10,fontSize:25, fontWeight:'bold',color:'white'}}>View Activity</Text>
                            </View>
                            <View style={{marginRight:10}}>
                                <TouchableOpacity onPress={this.deleteItself}>
                                    {deleteButtonIcon}
                                </TouchableOpacity>
                            </View>
                        </View>
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
        padding: 22,
        justifyContent:'space-around'
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#FDBE51',
        justifyContent:'space-between',
        marginBottom:5
    },
    textLabel:{
        fontSize:15,
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent: 'space-evenly',
        height:50,
        marginBottom:50,
    },
    button:{
        width:100,
        alignItems: 'center',
        marginTop: 5,
        padding: 5,
        borderColor: 'black',
        borderWidth:2,
    },
    cancelButton:{

    },
    saveButton:{
        
    }
});