
import React, {Component} from 'react';
import { StyleSheet, Text,View, TouchableHighlight, Dimensions , StatusBar} from 'react-native';
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
    

    changeProfilePicture = (NavName) =>{

    }

    render() {
        return (
            <View style={styles.container}>
                <PersonalInfoItem changer={this.changeProfilePicture} navName='ChangeProfilePicture'
                        icon={null} description='Profile Picture' data="ProfileImage" />

                <PersonalInfoItem 
                    changer={this.changeNickNameHandler} 
                    data={this.props.screenProps.nickName} 
                    icon={null} description='Nick Name'
                    headerName='Change Nickname'
                    explanation = 'A catchy nickname helps others to remember you'
                />

                <PersonalInfoItem 
                    changer={this.changeAccountHandler} 
                    navName='changeAccount' 
                    data={this.props.screenProps.account} 
                    icon={null} description='Account Id'
                    />
                <View style={{height:10}}></View>
                <PersonalInfoItem icon={null} description="Change Password" data=''
                    navName={'changePasswordHander'} changer={this.changePasswordHandler}
                    />
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