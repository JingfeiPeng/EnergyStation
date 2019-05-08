import React, {Component} from 'react';
import { Picker, StyleSheet,Keyboard,Dimensions, Modal,Text, TextInput, View,StatusBar,
    TouchableNativeFeedback, TouchableOpacity,TouchableWithoutFeedback, KeyboardAvoidingView} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Excercise, HealthyLife, Play, study, timePickerIcon,backButtonIcon,deleteButtonIcon} from "../../common/utility"
import Error from '../../common/Error'

const {width, height} = Dimensions.get('window');

// activityName:'Excercise',
// energyPtr:10,
// length:'20',
// hour: '12',
// minute: '30',
// type: Excercise,
// complete: false,

// Obtained from: https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
function pad(number, width, filler) {
    filler = filler || '0';
    number = number + '';
    return number.length >= width ? number : new Array(width - number.length + 1).join(filler) + number;
}

export default class ActivityDetails extends Component {
    state = {
        activity: {
            activityName:'',
            energyPtr: 0,
            length:'',
            hour: '',
            minute: '',
            type: '',
            complete: false,
        },
        isDateTimePickerVisible:false,
        errorMsg:'',
        validate:{
            type: true,
            name: true,
            length: true,
        },
        validRules:{
            nameMaxLength : 25,
            nameMinLength: 1,
            timeMaxLength : 1440, //whole day
            timeMinLength : 5,
            invalidType: '',
        }
    }

    setValidOrNot = (field,val) =>{
        this.setState(prevState => ({
            validate:{
                ...prevState.validate,
                [field]:val
            },
        }))
    }

    // return false if state is invalid,  return true if valid 
    valdiateInput = () =>{
        let errorMsg = '';
        const nameLength = this.state.activity.activityName.length;
        // check ActivityName
        if ( nameLength > this.state.validRules.nameMaxLength){
            errorMsg += 'Activity Name Must be within' + this.state.validRules.nameMaxLength+ 'characters\n';
            this.setValidOrNot('name',false);
        } else if ( nameLength <this.state.validRules.nameMinLength){
            errorMsg += 'Activity Name Cannot be empty\n';
            this.setValidOrNot('name',false);
        } else {
            this.setValidOrNot('name',true)
        }
        // check time Length 
        const timeLength = this.state.activity.length;
        if (timeLength < this.state.validRules.timeMinLength){
            errorMsg += 'Length of Acvtivity must be greater than ' + this.state.validRules.timeMinLength + 'minutes.\n'
            this.setValidOrNot('length',false);
        } else if (timeLength > this.state.validRules.timeMaxLength){
            errorMsg += 'Length of Acvtivity must be smaller than' + this.state.validRules.timeMaxLength + ' Minutes\n'
            this.setValidOrNot('length',false)
        } else {
            this.setValidOrNot('length',true)
        }
        // check Type
        if (this.state.activity.type == this.state.validRules.invalidType){
            errorMsg += "Activity Type cannot be empty"
            this.setValidOrNot('type',false)
        } else {
            this.setValidOrNot('type',true)
        }

        if (errorMsg != ''){
            this.setState({
                errorMsg: errorMsg,
            })
            return false
        } else {
            this.setState({      
                errorMsg:'',
                validate:{
                    type: true,
                    name: true,
                    length: true,
                }}
            )
            return true
        }
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

    componentDidMount(){
        this.setState({
            activity: this.props.activity
        })
        // let time = new Date();
        // time = time.toLocaleTimeString()
        // console.warn(time)
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
        time = time.toLocaleTimeString()
        time = time.toString();
        console.warn(time)
        this.setState(prevState => {
            return {
                activity:{
                    ...prevState.activity,
                    startTime: time
                }
            }
        })
        this._hideDateTimePicker();
      };
    
    deleteItself = () =>{
        this.props.deleteActivity(this.props.selectId);

        this.props.onModalClosed();
    }
    
    renderError = () =>{
        if (this.state.errorMsg !=''){
            return (
                <Error errorMsg={this.state.errorMsg}/>
            )
        }
    }

    
    clearError = () =>{
        this.setState({      
            errorMsg:'',
            validate:{
                type: true,
                name: true,
                length: true,
            }}
        );
    }
    render() {
        let modalContent = null;
        if (this.props.activity !== null){
            modalContent = (
                <View style={{height:300}}>
                    <View style={this.state.validate.type? styles.validInput: styles.invalidInput }>
                    <Picker
                        selectedValue={this.state.activity.type}
                        style={this.state.validate.type == false ? styles.invalidInput: styles.validInput }
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
                    </View>

                    {/* <Text style={styles.textLabel}> Activity Name: </Text> */}
                    <View style={this.state.validate.name == false ? styles.invalidInput: styles.validInput }>
                        <TextInput 
                            underlineColorAndroid = 'transparent'
                            style={{borderBottomColor:"red"}}
                            value={this.state.activity.ActivityName}
                            onChangeText = {(val) =>this.changeActivityInfoHandler("activityName",val)}
                            placeholder = "Activity Name">
                        </TextInput>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={styles.textLabel}>Estimated Length of Activity in minutes</Text>
                        <View style={this.state.validate.length == false ? styles.invalidInput: styles.validInput }>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            style={this.state.validate.length == false ? styles.invalidInput: styles.validInput }
                            value={this.state.activity.length} style={{width:90}} 
                            onChangeText = {(val) =>this.changeActivityInfoHandler("length",val)}
                            placeholder = "50 mins">
                        </TextInput>
                        </View>
                    </View>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableNativeFeedback onPress={this._showDateTimePicker}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={styles.textLabel}>Start time</Text>
                                <TextInput placeholder="10:00" 
                                    style={{width:90,color:'black'}}
                                    //  value={pad(this.state.activity.hour, 2)+':'+pad(this.state.activity.minute,2)}
                                    value = {this.state.activity.startTime}
                                    editable={false}>
                                </TextInput>
                                {timePickerIcon}
                                <DateTimePicker
                                    mode='time'
                                    date = {new Date()}
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
                                <TouchableOpacity onPress={()=>{
                                    this.clearError();
                                    this.deleteItself()}}>
                                    {deleteButtonIcon}
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style = {styles.modalContainer}>
                            {modalContent}
                            <View style={styles.buttonContainer}>
                                <TouchableNativeFeedback onPress = {()=>{
                                        this.clearError();
                                        this.props.onModalClosed()
                                    }}>
                                    <View  style={[styles.button,styles.cancelButton]}>
                                        <Text style={{color:'red',fontSize:20}}> Cancel </Text>
                                    </View>
                                </TouchableNativeFeedback>
                                <TouchableNativeFeedback
                                    onPress = {()=>{
                                        if (this.valdiateInput()){
                                            this.props.onModalSave(this.state.activity, this.props.selectId)
                                        }
                                    }}>
                                    <View style={[styles.button,styles.saveButton]}>
                                        <Text style={{color:'green',fontSize:20}}> Save </Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            {this.renderError()}
                        </View>
                </Modal>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    validInput:{
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    invalidInput:{
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },  
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