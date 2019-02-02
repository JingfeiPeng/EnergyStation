
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight , Alert} from 'react-native';


export default class Setting extends Component {
    state = {

    };

    render() {
        return (
            <View style={styles.container}>
                <Text> Setting </Text>
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