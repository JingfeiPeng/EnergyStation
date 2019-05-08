
import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar , AsyncStorage} from 'react-native';

import ActivityBar from './ActivityBar/ActivityBar';
import Topbar from './Topbar/Topbar';
import ActivityDetails from './ActivityDetails/ActivityDetails'
import {jwtToken} from '../store/actions/fillinAccountInfo'
import {activitiesURL} from '../webService/urlLinks'
import { connect } from 'react-redux';



class Home extends Component {
    constructor(props){
        super(props)
        this.modalSaveActivityHandler = this.modalSaveActivityHandler.bind(this);
    }
    state = {
        activityList: [
        ],
        selectedActivity : null,
        selectedId : null,
        error:''
    };
    //Incorrect: N9W
    // Correct: snjw 
    fetchAllActivities = ()=>{
        fetch(activitiesURL,{  
            method:'GET',
            headers: { 'X-Auth-Token': this.props.token }
        })
        .then(res => {
            if (res.ok){
                return res.json();
            } else {
                throw res.text()
            }
        })
        .then(res => {
            console.warn("res" + res)
            this.setState({activityList:res})
        })
        .catch(err => console.warn(err))
        // firebase.database().ref('activitiesList/'+identifier).on('value',(data)=>{
        //     const newActivitiesList = data.toJSON();
        //     const activitiesNames = [];
        //     for (element in newActivitiesList){
        //         activitiesNames.push(newActivitiesList[element]);
        //     }
        //     this.setState({activityList:activitiesNames});
        // })
    }

    updateActivity = () =>{
        console.warn("update an activity")
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#FDBE51');
            StatusBar.setTranslucent(false)
        });
        this.fetchAllActivities()
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    addPointHandler = (val) =>{
        this.props.onChangeEnergyPtr(val);
    }

    activitySelectedHandler = key => {
        this.setState(prevState => {
            return {
                selectedActivity: prevState.activityList.find((place,i) =>{
                    return i === key; 
                }),
                selectedId: key,
            };
        });
    }
    
    // saving the activity while using modal
    modalSaveActivityHandler= async (activity, identifer)=>{
        if (parseInt(identifer) == parseInt(this.state.activityList.length)){
            await this.setState(prevState =>{
                return {
                    activityList: prevState.activityList.concat(activity),
                    selectedActivity: null,
                    selectedId: null,
                }
            })
        } else {
            await this.setState({
                activityList: this.state.activityList.map((val, index) =>{
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
        this.updateActivity();
    }

    addActivityHandler = () => {
        this.setState(prevState => {
            return {
                selectedActivity: {
                    activityName:'',
                    energyPtr:'',
                    length:'',
                    startTime: new Date().getHours() +":"+ new Date().getMinutes(),
                    type: '',
                },
                selectedId: prevState.activityList.length,
            };
        });
    }

    // requires: act1 and act2 must have sane field
    checkIfSameActivity= (act1,act2)=>{
        let completeSame = true;
        for (field in act1){
            if (act1[field] != act2[field]){
                completeSame = false;
            }
        }
        return completeSame;
    }

    deleteActivityHandler = (index) =>{
        // delete item from Firebase: FIND INDEX
        let firebaseIdentifer = "PLACEHOLDER";
        const identifier = this.props.account;


        // firebase.database().ref('activitiesList/'+identifier).once('value',(activitiesList)=>{
        //     // check each element
        //     activitiesList = activitiesList.toJSON();
        //     for (element in activitiesList){
        //         if (this.checkIfSameActivity(this.state.activityList[index],activitiesList[element])){
        //             firebaseIdentifer = element
        //         }
        //     }
        // });
        // firebase.database().ref('activitiesList/'+identifier+'/'+firebaseIdentifer).remove();
    }

    modalCloseHandler = () =>{
        this.setState({
            selectedActivity: null,
            selectedId: null,
        })
    }

    render() {
        const nickName = this.props.nickName;
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#FDBE51" barStyle="light-content" animated/>
                <Topbar userName = {nickName}
                    curPoint={this.props.curPoint}
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
                    this.state.activityList.map((activity,index)=>{
                        return (<ActivityBar 
                            key = {index}
                            identifier = {index}
                            activity = {activity}
                            selectHandler ={this.activitySelectedHandler}
                            addPoint = {this.addPointHandler}
                            completeActivityHandler = {this.modalSaveActivityHandler}
                        />)
                    })
                }
                </ScrollView>

            </View>
          );
    }
}
const mapStateToProps = (state) =>{
    return {
      // account: state.generalReducer.account,
      // nickName: state.generalReducer.nickName,
      // curPoint: state.generalReducer.curPoint,
      // password: state.generalReducer.password,
      ...state.generalReducer
    }
  }
  
  //dispatcher
  const mapDispatchToProps = dispatch =>{
    return {
      onChangeEnergyPtr: (ptrAmt)=> dispatch(changeEnergyPtr(ptrAmt)),
    }
  } 
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8dcdc'
    }
});