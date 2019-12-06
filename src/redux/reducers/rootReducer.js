import { 
    FETCH_ALL_DATA_ERROR,
    FETCH_ALL_DATA_PENDING,
    FETCH_ALL_DATA_SUCCESS,
    FOCUS_AIRPLANE_PENDING,
    FOCUS_AIRPLANE_SUCCESS,
    FOCUS_AIRPLANE_ERROR,
    UNFOCUS_AIRPLANE
 } from "../actionTypes";

 import settingsReducer from "./settingsReducer";

function combineReducersWithRoot(rootReducer, reducers) {
    return (state, action) => {
      // Ensure the root state object is a new object; otherwise
      // React may not re-render.
      let newState = {...rootReducer(state, action)};
      Object.keys(reducers).forEach(domain => {
        let obj = state ? state[domain] : undefined;
        newState[domain] = reducers[domain](obj, action);
      });
      return newState;
    };
  }


function rootReducer(state, action) {
    switch(action.type) {
        case FOCUS_AIRPLANE_SUCCESS:
            return {
                ...state,
                pending: false,
                focused: action.payload,
            }
        case UNFOCUS_AIRPLANE:
            return {
                ...state,
                focused: null,
            }
        case FOCUS_AIRPLANE_PENDING:
            return {
                ...state,
                pending: true
            }
        case FOCUS_AIRPLANE_ERROR:
            return {
                ...state, 
                pending: false,
                error: action.error,
                focused: null
            }
        case FETCH_ALL_DATA_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_ALL_DATA_SUCCESS:
            return {
                ...state, 
                pending: false,
                onlineData: { pilots: [action.payload.pilots[0]], atc: []}
            }
        case FETCH_ALL_DATA_ERROR:
            return {
                ...state, 
                pending: false,
                error: action.error
            }
        default:
            return state;
    }
}

export default combineReducersWithRoot(rootReducer, {settings: settingsReducer})
