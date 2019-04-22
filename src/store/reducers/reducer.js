import {CHANGEENERGYPTR, FILLINACCOUNTINFO} from '../actions/actionTypes'

 
const initialState = {
    account: 'Test Account ID',
    nickName: 'Test User Dev',
    token:'',
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
                nickName: action.nickName,
                token: action.token
            }
        default:
            return state;
    }
};

export default reducer;