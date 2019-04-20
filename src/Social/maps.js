
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Switch , Image} from 'react-native';


export default class Maps extends Component {

    state={
        switch: true
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <Switch 
                    thumbTintColor={'blue'} 
                    onTintColor={'red'} 
                    value={this.state.switch} 
                    onValueChange={(value)=> this.setState({switch: value})}
                    style={{width: 50}}
                />
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