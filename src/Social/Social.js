
import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar , Image, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {fetchUsersUrl, fetchFriendListUrl, sendFriendReqUrl} from '../webService/urlLinks'
import Card from './card/card'
import { connect } from 'react-redux';


function showMessage(option){
    if (option == "friendList"){
        return "Friends List"
    } else if (option == 'allUsers'){
        return "Explore users in EnergyStation"
    }
}



class Social extends Component {
    static navigationOptions = {
        drawerIcon:({tintColor})=>(
            <Icon name='ios-people' style={{fontSize:24,color:tintColor}}/>
        )
    }
    state = {
        listAllUsers: [],
        error: null
    };

    // for dynamically changing color in StatusBar Since all screens in Tabnavigator is rendered at the same time
    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('light-content');
            StatusBar.setBackgroundColor('#FDBE51');
            StatusBar.setTranslucent(false)
        });
        
        let url = fetchUsersUrl;
        if (this.props.option != 'allUsers') url = fetchFriendListUrl;
        fetch(url,{
            headers: { 'X-Auth-Token': this.props.token }
        })
        .then(res =>{
            if (res.ok){
                return res.json()
            }
            throw res.text()
        })
        .then(res =>{
            // <Card title={item.name} 
            // email={item.email}
            // energyPtr={item.energyPtr} 
            // profilePic = {item.profilePic}
            this.setState({
                listAllUsers: res
            })
        })
        .catch(err => console.warn(err))
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    renderSeperator = () =>(
        <View
            style={{
                height:1, width:'86%',backgroundColor:'#CED0CE', marginLeft:'14%'
            }}
        />
    )
    renderHeader = () =>(
        <View>
            <Text style={{fontSize:20}}>{showMessage(this.props.option)}</Text>
        </View>
    )


    handleAction = () =>{
        if (this.props.option == "allUsers"){
            return (userName) =>{
                fetch(sendFriendReqUrl,{
                    method: 'POST',
                    headers: { 
                        Accept: 'application/json',
                        'Content-Type':'application/json',
                        'X-Auth-Token': this.props.token
                    },
                    body: JSON.stringify({
                        "sentTo":userName
                    })
                })
                .then(res => {
                    if (res.ok){
                        return res.json()
                    }
                    return res.text()
                })
                .then(res=>{
                    if (typeof res === 'string'){
                        throw new Error(res)
                    }
                    // need to make webservice return more info
                })
                .catch(err => console.warn(err.message))
            }
        } else if (this.props.option == 'friendReq'){
            return (userName,decideAccept) =>{
                console.warn(userName+" "+ decideAccept)
            }
        } else { // friendList
            return // function that goes to details
        }
    }
    render() {
        // Nier Image
        return (
            <View style={{flex: 1}}>
                <View style={{paddingHorizontal:20,paddingVertical:10,height:'10%', borderBottomColor:'grey', borderWidth:2,backgroundColor:'#FDBE51'}}>
                    <Icon name="ios-menu" size={40} onPress={()=> this.props.navigation.toggleDrawer()}/>
                </View>
                <FlatList
                    data={this.state.listAllUsers}
                    renderItem={({item}) => {
                        if (item.email == this.props.account) return null;
                        if (this.props.option == 'friendList' && !item.accept) return null; // if it's an already made friend and it's in friends mode
                        if (this.props.option == 'friendReq' && item.accept) return null; // if it's a friend request and it's friend request mode
                        return (<Card title={item.name} 
                            email={item.email}
                            energyPtr={item.energyPtr} 
                            icon={this.props.option}
                            profilePic = {item.profilePic}
                            hanldeAction={this.handleAction()}/>
                        )
                    }}
                    keyExtractor={(item)=> item._id}
                    ItemSeparatorComponent={this.renderSeperator}
                    ListHeaderComponent={this.renderHeader}
                />
                {/* {this.state.listAllUsers.map((element, index)=>{
                    return (
                        <Card title={element.name} energyPtr={element.energyPtr}/>
                    )
                })} */}
              {/* <Image style={{width: 500, height: 300, resizeMode: Image.resizeMode.contain}} source={{uri: Nier}}/> */}
            </View>
          );
    }
}

const mapStateToProps = (state) =>{
    return {
      ...state.generalReducer
    }
}

export default connect(mapStateToProps, null)(Social);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDBE51'
    }
});


/*
Do: 
a list of users. able to send friend requests.
a list of friends
// two tabs
create list of users in Mongoose database
*/