import {FILLINACCOUNTINFO} from './actionTypes';
import React from 'react';
import {AsyncStorage} from 'react-native';

export const jwtToken = 'jwtToken'

export const fillinAccountInfo = (account,nickName,token,saveToLocal = false) =>{
    if (saveToLocal){
        AsyncStorage.setItem(jwtToken, JSON.stringify(token))
    }
    return {
        type: FILLINACCOUNTINFO,
        account: account,
        nickName: nickName,
        token: token
    }
}