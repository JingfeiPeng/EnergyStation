
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight , Alert} from 'react-native';


export default class Statistics extends Component {
    state = {

    };

    render() {
        return (
            <View style={styles.container}>
                <Text> Statistics </Text>
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