import {FILLINACCOUNTINFO} from './actionTypes';

export const fillinAccountInfo = (account,nickName) =>{
    return {
        type: FILLINACCOUNTINFO,
        account: account,
        nickName: nickName,
    }
}