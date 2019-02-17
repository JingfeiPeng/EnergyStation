
import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar , Alert} from 'react-native';

import ActivityBar from './ActivityBar/ActivityBar';
import Topbar from './Topbar/Topbar';
import ActivityDetails from './ActivityDetails/ActivityDetails'

const Excercise = "Excercise";
const HealthyLife = "Healthy Lifestyle";
const Play = "Play";
const study = "study";

export default class Home extends Component {
    // TODO change the numerical values to Int
    state = {
        activityNames: [
            {
                activityName:'Excercise',
                energyPtr:10,
                length:'20',
                hour: '12',
                minute: '30',
                type: Excercise,
                complete: false,
            },
            {
                activityName:'Wake up Early',
                energyPtr:30,
                length:'10',
                hour: '14',
                minute: '30',
                type: HealthyLife,
                complete: false,
            },
            {
                activityName:'Talk with Friends',
                energyPtr:20,
                length:'60',
                hour: '16',
                minute: '30',
                type: Play,
                complete: false,
            },
            {
                activityName:'Learn Java RMB',
                energyPtr:40,
                length:'60',
                hour: '16',
                minute: '30',
                type: study,
                complete: false,
            },
        ],
        selectedActivity : null,
        selectedId : null,
    };

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#FDBE51');
            StatusBar.setTranslucent(false)
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    addPointHandler = (val) =>{
        this.props.screenProps.onChangeEnergyPtr(val);
    }

    activitySelectedHandler = key => {
        this.setState(prevState => {
            return {
                selectedActivity: prevState.activityNames.find((place,i) =>{
                    return i === key; 
                }),
                selectedId: key,
            };
        });
    }
    
    // saving the activity while using modal
    // use the index property???
    modalSaveActivityHandler = (activity, identifer) =>{
        if (parseInt(identifer) == parseInt(this.state.activityNames.length)){
            this.setState(prevState =>{
                return {
                    activityNames: prevState.activityNames.concat(activity),
                    selectedActivity: null,
                    selectedId: null,
                }
            })
        } else {
            this.setState({
                activityNames: this.state.activityNames.map((val, index) =>{
                    if (index == identifer){
                        val.activityName = activity.activityName;
                        val.energyPtr = activity.energyPtr;
                        val.length = activity.length;
                        val.hour = activity.hour;
                        val.minute = activity.minute;
                        val.type = activity.type;
                    } 
                    return val;
                }),
                selectedActivity: null,
                selectedId: null, 
            })
        }

    }

    addActivityHandler = () => {
        this.setState(prevState => {
            return {
                selectedActivity: {
                    activityName:'',
                    energyPtr:'',
                    length:'',
                    hour: new Date().getHours(),
                    minute: new Date().getMinutes(),
                    type: '',
                },
                selectedId: prevState.activityNames.length,
            };
        });
    }

    deleteActivityHandler = (index) =>{
        this.setState(prevState =>{
            return {
                activityNames: prevState.activityNames.filter((val,i)=>{
                    return i != index
                })
            }
        });
    }

    modalCloseHandler = () =>{
        this.setState({
            selectedActivity: null,
            selectedId: null,
        })
    }

    render() {
        const nickName = this.props.screenProps.nickName;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#FDBE51" barStyle="light-content" animated/>
                <Topbar userName = {nickName}
                    curPoint={this.props.screenProps.curPoint}
                    addActivity = {this.addActivityHandler}/>
                <ActivityDetails
                    activity = {this.state.selectedActivity}
                    selectId = {this.state.selectedId}
                    deleteActivity = {this.deleteActivityHandler}
                    onModalClosed = {this.modalCloseHandler}
                    onModalSave = {this.modalSaveActivityHandler}
                />
                <ScrollView>
                { 
                    this.state.activityNames.map((activity,index)=>{
                        return (<ActivityBar 
                            key = {index}
                            identifier = {index}
                            activity = {activity}
                            selectHandler ={this.activitySelectedHandler}
                            addPoint = {this.addPointHandler}
                        />)
                    })
                }
                </ScrollView>

            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ddd9d9'
    }
});