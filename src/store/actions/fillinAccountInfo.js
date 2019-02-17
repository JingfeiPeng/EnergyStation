import {FILLINACCOUNTINFO} from './actionTypes';

export const fillinAccountInfo = (account,nickName,password) =>{
    return {
        type: FILLINACCOUNTINFO,
        account: account,
        nickName: nickName,
        password:password
    }
}