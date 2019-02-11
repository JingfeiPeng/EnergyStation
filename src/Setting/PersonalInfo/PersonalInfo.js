
import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions , StatusBar} from 'react-native';
import PersonalInfoItem from './PersonalInfoItem'

const {width, height} = Dimensions.get('window');

export default class Logout extends Component {
    state = {

    };

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Account Information',
            headerBackTitle: null,
        };
    }

    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('white');
            StatusBar.setTranslucent(false)
        });
    }
    changeNickName = (NavName)=>{

    }

    changeProfilePicture = (NavName) =>{

    }

    render() {

        return (
            <View style={styles.container}>
                <PersonalInfoItem goTo={this.changeProfilePicture} navName='ChangeProfilePicture'
                     icon={null} description='Profile Picture' data="ProfileImage"/>
                <PersonalInfoItem 
                    goTo={this.changeNickNameHandler} 
                    navName='changeNickName' 
                    data={this.props.screenProps.nickName} 
                    icon={null} description='Nick Name'/>
                <PersonalInfoItem 
                    goTo={this.changeAccountHandler} 
                    navName='changeAccount' 
                    data={this.props.screenProps.account} 
                    icon={null} description='Account Id'/>
                <View style={{height:10}}></View>
                <PersonalInfoItem icon={null} description="Change Password" data=''
                    navName={'changePasswordHander'} goTo={this.changePasswordHandler}/>
            </View>
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