
import React, {Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';


export default class EnergyBall extends Component {
    render() {
        let energyPtr = this.props.energyPtr;
        let height = (97 - energyPtr)/2; 
        if (height < 0) height = 0;
        const radius = 25;
        const shadowColor = '#FDBE51'
        let width = height < 40 ? height*1.5 : height;
        width  = height >= 40 ? radius*2: width;
        return (
            <View style={styles.container}>
                    <View
                        style={[styles.outerCircle, {
                            width: radius * 2,
                            height: radius * 2,
                            borderRadius: radius,
                            borderWidth:3,
                            borderColor:'white',
                            backgroundColor: shadowColor,
                            alignItems:'center',
                            justifyContent:'flex-start'
                        }]}
                    >   
                        <View style={{
                            width:radius * 2,
                            height:height,
                            width: width,
                            borderRadius: height,
                            backgroundColor:'white',
                            alignItems:'center',
                            justifyContent:'flex-end'
                        }}>
                        </View>
                        <View style={{position:'absolute',justifyContent:'center',alignItems:'center'}}>
                            <Text style={{fontSize:20,right:5, top:10}}> {energyPtr}</Text>
                        </View>
                    </View>
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
    }
});