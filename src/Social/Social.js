
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, StatusBar , Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'


export default class Social extends Component {
    static navigationOptions = {
        drawerIcon:({tintColor})=>(
            <Icon name='ios-people' style={{fontSize:24,color:tintColor}}/>
        )
    }

    state = {

    };
        // for dynamically changing color in StatusBar Since all screens in Tabnavigator is rendered at the same time
    componentDidMount(){
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('#ddd9d9');
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <View style={{height: 200, backgroundColor: 'grey'}}></View>
              <View style={{flexGrow: 1, backgroundColor: 'black', alignItems: 'center'}}>
                <Image
                  source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/cat.gif' }}
                  style={{
                    position: 'absolute',
                    top: -40,
                    height: 80,
                    width: 80}} 
                  />
              </View>
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