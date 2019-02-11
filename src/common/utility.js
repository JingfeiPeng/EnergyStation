import React, {Component} from 'react';
import Icon from  'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const settingIconSize = 32;

// icons
export const addIcon = (<Icon name="md-add" size={40} color="black" />);
export const expandIcon = (<Icon name="md-expand" size={35} color="#FDBE51" />);
export const star = (<Icon name="ios-star" size={30} color="#FDBE51"/>);
export const starOutline = (<Icon name="ios-star-outline" size={30} color="#FDBE51"/>);
export const timePickerIcon = (<Icon name="md-time" size={30} color= "#FDBE51"/>)
export const backButtonIcon = (<Icon name="md-arrow-back" size={30} color='white'/>)
export const deleteButtonIcon = (<Icon name="md-trash" size={30} color='black'/>)
export const settingPersonIcon = (<Icon name="ios-person" size={100} color='#002d73' />)
export const rightArrowIcon = (<Icon name="ios-arrow-forward" size={20} color="grey" />)
export const cameraIcon = (<Icon name='ios-camera' size={40} color='white'/>)
export const settingsIcon = (<Icon name='ios-settings' color='#64acf4' size ={settingIconSize}/>)
export const paymentIcon = (<MaterialIcons name="payment" size={settingIconSize} color="green"/>)
export const activityPlansIcon =(<Icon name='md-paper-plane' size={settingIconSize} color='orange'/>)


// consts for activity types icons
export const excerciseIcon = (<Icon name="ios-walk" size={40} color="#FDBE51"/>);
export const studyIcon = (<Icon name="ios-laptop" size={40} color="#FDBE51"/>);
export const healthyIcon = (<Icon name="ios-body" size={30} color="#FDBE51"/>);
export const playIcon = (<Icon name="ios-happy" size={30} color="#FDBE51"/>);

// const for icon type
export const Excercise = "Excercise";
export const HealthyLife = "Healthy Lifestyle";
export const Play = "Play";
export const study = "study";
