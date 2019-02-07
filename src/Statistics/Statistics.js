
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight , Alert} from 'react-native';
import EnergyBall  from '../MainInterface/Topbar/EnergyBall/EnergyBall'

export default class Statistics extends Component {
    state = {

    };

    render() {
        radius = 100;
        energyPtr = 10
        return (
            <View style={styles.container}>
                <EnergyBall energyPtr={60}/>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'white',
    }
});