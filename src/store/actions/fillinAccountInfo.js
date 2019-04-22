import {FILLINACCOUNTINFO} from './actionTypes';

export const fillinAccountInfo = (account,nickName,token) =>{
    return {
        type: FILLINACCOUNTINFO,
        account: account,
        nickName: nickName,
        token: token
    }
}