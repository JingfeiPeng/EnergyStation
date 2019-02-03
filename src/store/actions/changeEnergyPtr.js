import {CHANGEENERGYPTR} from './actionTypes';

export const changeEnergyPtr = (ptrAmt) =>{
    return {
        type: CHANGEENERGYPTR,
        ptrAmt : ptrAmt,
    };
}

