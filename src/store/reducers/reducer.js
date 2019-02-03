import {CHANGEENERGYPTR, FILLINACCOUNTINFO} from '../actions/actionTypes'

 
const initialState = {
    account: "",
    curPoint: 0,
}

// set name, change curPoint


const reducer = (state = initialState, action) =>{
    switch (action.type){
        case CHANGEENERGYPTR:
            return {
                ...state,
                curPoint: parseInt(state.curPoint) + parseInt(action.ptrAmt),
            };
        case FILLINACCOUNTINFO: 
            return {
                ...state,
                account: action.account,
            }
        default:
            return state;
    }
};

export default reducer;