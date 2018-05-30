// import { combineReducers } from 'redux';
// import { incrementReducer } from './sampleReducers';
import { LIFT_CURRENT_PAGE_TO_STATE } from '../constants/action-types';
import { LIFT_TOKEN_TO_STATE } from '../constants/action-types';
import { LIFT_UPDATED_USER } from '../constants/action-types';
import { LOGOUT_USER } from '../constants/action-types';


//This is the root reducer object for the project. Any reducers should be created in external files in the reducers directory and imported into here, just like sampleIncrementReducer. The reducer name must then be added to the combineReducers() call below.

// const reducers = combineReducers({
// 	incrementReducer,
// });
//
// export default reducers;
//

const initialState = {
    rydesTabIsToggled: true,
    currentPage: '/',
    token: '',
    user: null,
    clickedUser: null,
    searchResults: [],
    myRydesDryves: [],
    currentRyde: null
};

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case LIFT_CURRENT_PAGE_TO_STATE:
            // console.log('The current page is...', action.payload);
            return {...state, currentPage: action.payload};
        case LIFT_TOKEN_TO_STATE:
            // console.log('Lifted token to Redux state');
            return {...state, token: action.payload.token, user: action.payload.user};
        case LIFT_UPDATED_USER:
            // console.log('Updating the user...', action.payload);
            return {...state, user: action.payload};
        case LOGOUT_USER:
            // console.log('Logging out user');
            return {...state, token: '', user: null, searchResults: []};
        default:
            return state;
    }
}

export default reducers;
