import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback} from 'react-native';
import { addIcon } from "../../common/utility"

export default class TopBar extends Component {
    render() {
        //console.warn(this.props.userName);
        return (
            <View style = {styles.topBar}>
                <View style={styles.energyBallContainer}>
                    <View style={styles.energyBall}>
                        <Text style={styles.scorePtr}>{this.props.curPoint}</Text>
                    </View>
                    <Text>{this.props.userName}</Text>
                </View>
                <View style={styles.addIcon}>
                <TouchableNativeFeedback onPress={this.props.addActivity}>
                    {addIcon}
                </TouchableNativeFeedback>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 70,
        backgroundColor: '#FDBE51',
    },
    energyBallContainer:{
        width: "50%",
    },
    energyBall:{
        width:50,
        height:50,
        backgroundColor:'white',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
    },
    addIcon:{
        width: "50%",
        alignItems: "flex-end",
        paddingRight: 10,
    },
    scorePtr:{
        fontSize: 30,
    }
});