
import React from 'react';
import {StyleSheet, Text,Image, View} from 'react-native';
import {Nier} from '../staticPictures'
import Icon from 'react-native-vector-icons/Ionicons'

// props: errorMsg

const Card = (props) =>{
    let icon = null;
    if (props.icon == "allUsers"){
        icon=(<Icon name={"ios-add-circle-outline"} size={25} onPress={() => props.hanldeAction(props.email)}/>)
    } else if (props.icon == 'friendReq'){
      icon=(
        <View>
          <Icon name={"ios-checkmark"} color={'green'} size={40} onPress={() => props.hanldeAction(props.email, true)}/>
          <Icon name={"ios-close"} color="red" size={40} onPress={() => props.hanldeAction(props.email, false)}/>
        </View>
      )
    }
    let imageUrl = props.profilePic? props.profilePic: Nier;
    return (
        <View style={{flexDirection:'row', padding:20}}>
            <Image style={{ width: 100, height: 100, resizeMode: Image.resizeMode.contain}} source={{uri: imageUrl}}/>
            <View style={styles.infoBar}>
                <Text>{props.title}</Text>
                <Text>{props.energyPtr}</Text>
            </View>
            {icon}
        </View>
  );
}


const styles = StyleSheet.create({
  infoBar:{
    flex:1
  }
});

export default Card; 