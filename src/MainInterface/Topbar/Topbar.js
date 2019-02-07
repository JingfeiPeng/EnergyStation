import React, {Component} from 'react';
import { StyleSheet, Dimensions, View, TouchableNativeFeedback} from 'react-native';
import { addIcon } from "../../common/utility"
import EnergyBall from './EnergyBall/EnergyBall'



const { width, height } = Dimensions.get('window');

export default class TopBar extends Component {
//     <View style={styles.energyBallContainer}>
//     <View style={styles.energyBall}>
//         <Text style={styles.scorePtr}>{this.props.curPoint}</Text>
//     </View>
//     <Text style={{fontSize:20,color:'white'}}>{this.props.userName}</Text>
// </View>
    render() {
        //<EnergyBall energyPtr={this.props.energyPtr}/>
        return (
            <View style = {styles.topBar}>
                <View style={styles.energyBallContainer}>
                    <EnergyBall energyPtr={this.props.curPoint}/>
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
        justifyContent:'space-between'
    },
    energyBallContainer:{
        marginLeft: width*0.02
    },
    energyBall:{
        width:50,
        height:50,
        backgroundColor:'#FDBE51',
        borderWidth:3,
        borderRadius: 20,
        borderColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin:10,
    },
    addIcon:{
        alignItems: "flex-end",
        paddingRight: 10,
    },
    scorePtr:{
        fontSize: 30,
    }
});