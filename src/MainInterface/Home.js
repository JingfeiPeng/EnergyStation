
import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar , Alert} from 'react-native';

import ActivityBar from './ActivityBar/ActivityBar';
import Topbar from './Topbar/Topbar';
import ActivityDetails from './ActivityDetails/ActivityDetails'
import firebase from 'firebase';

const Excercise = "Excercise";
const HealthyLife = "Healthy Lifestyle";
const Play = "Play";
const study = "study";

export default class Home extends Component {
    constructor(props){
        super(props)
        this.modalSaveActivityHandler = this.modalSaveActivityHandler.bind(this);
    }
    state = {
        activityNames: [
        ],
        selectedActivity : null,
        selectedId : null,
    };
    
    componentWillMount(){
        if (firebase.apps.length == 0){
            // Initialize Firebase
            // BUG: LOGIN AGAIN BUT FIREBASE INITIALIZE AGAIN
            var config = {
            apiKey: "AIzaSyBPDtqcm1o9wu7T9eKPp-TdEXM-PJqb-YI",
            authDomain: "energystation-c5f1f.firebaseapp.com",
            databaseURL: "https://energystation-c5f1f.firebaseio.com",
            projectId: "energystation-c5f1f",
            storageBucket: "energystation-c5f1f.appspot.com",
            messagingSenderId: "690361745753"
            };
            firebase.initializeApp(config);
        }
    }

    // Need to Change these

    getFirebaseActivitiesNames = ()=>{
        const identifier = this.props.screenProps.account;
        firebase.database().ref('activitiesList/'+identifier).on('value',(data)=>{
            const newActivitiesList = data.toJSON();
            const activitiesNames = [];
            for (element in newActivitiesList){
                activitiesNames.push(newActivitiesList[element]);
            }
            this.setState({activityNames:activitiesNames});
        })
    }
    updateFirebaseActivitiesNames = () =>{
        const identifier = this.props.screenProps.account;
        firebase.database().ref('activitiesList/'+identifier).set(
            this.state.activityNames
        )
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#FDBE51');
            StatusBar.setTranslucent(false)
        });
        // const identifier = this.props.screenProps.account;
        // firebase.database().ref('activitiesList/'+identifier).set(
        //     this.state.activityNames
        // ).then(()=>{
        //     console.warn('success')
        // }).catch((err)=>{
        //     console.warn(err)
        // })
        // this.getFirebaseActivitiesNames()
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

    /*
    let user = {
        account :  'LOL'
        password:  'HEHE'
        city : "Toronto"
    };
    AsyncStorage.setItem('user', JSON.stringify(user)); // 'user' is key

    // fetch data
     fetchData = async () =>{
         try {
             let user  = await AsyncStorage.getItem('user');
             let parsed = JSON.parse(user);
             alert(parsed.account)
         }
         catch (error){
            alert(error)
         }
     }

    */
    
    // saving the activity while using modal
    modalSaveActivityHandler= async (activity, identifer)=>{
        if (parseInt(identifer) == parseInt(this.state.activityNames.length)){
            await this.setState(prevState =>{
                return {
                    activityNames: prevState.activityNames.concat(activity),
                    selectedActivity: null,
                    selectedId: null,
                }
            })
        } else {
            await this.setState({
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
        this.updateFirebaseActivitiesNames();
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
        const identifier = this.props.screenProps.account;
        firebase.database().ref('activitiesList/'+identifier).once('value',(activitiesList)=>{
            // check each element
            activitiesList = activitiesList.toJSON();
            for (element in activitiesList){
                if (this.checkIfSameActivity(this.state.activityNames[index],activitiesList[element])){
                    firebaseIdentifer = element
                }
            }
        });
        //console.warn(firebaseIdentifer);
        firebase.database().ref('activitiesList/'+identifier+'/'+firebaseIdentifer).remove();

        // this.setState(prevState =>{
        //     return {
        //         activityNames: prevState.activityNames.filter((val,i)=>{
        //             return i != index
        //         })
        //     }
        // });
    }
    // completeActivityHandler= (index)=>{
    //     this.setState(prevState =>{
    //         return {
    //             activityNames: prevState.activityNames.forEach((element,eleIndex) => {
    //                 if (eleIndex == index){
    //                     prevState.activitiesNames[eleIndex]['complete'] = !prevState.activitiesNames[eleIndex]['complete'];
    //                 }
    //             })
    //         }
    //     });
    // }

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
                            completeActivityHandler = {this.modalSaveActivityHandler}
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
        backgroundColor: '#e8dcdc'
    }
});