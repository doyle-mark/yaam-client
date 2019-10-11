import { TOGGLE_FIRS, TOGGLE_COLOR_MODE, TOGGLE_AIRPORT_MARKER, TOGGLE_AIRPORT_MARKER_APPROACH_CIRCLE, TOGGLE_AIRPORT_MARKER_ATC_BADGES} from "../actionTypes";
import { DARK_MODE, LIGHT_MODE } from "../../assets/styles";

const initialState = {
    toggleFIRs: true,
    isDarkMode: false,
    themeColors: LIGHT_MODE,
    airportMarkerVisibility: {
        enabled: true,
        showControllerBadges: true,
        showApproachCircle: true
    }
}

export default (state = initialState, { type, payload }) => {
    switch (type) {

    case TOGGLE_FIRS:
        return { 
            ...state,
            toggleFIRs: payload
        }

    case TOGGLE_COLOR_MODE:
        if (state.isDarkMode) {
            return {...state, isDarkMode: false, themeColors: LIGHT_MODE}
        } else {
            return {...state, isDarkMode: true, themeColors: DARK_MODE}
        }
    
    case TOGGLE_AIRPORT_MARKER:
        const enabled = !state.airportMarkerVisibility.enabled;
        return {...state, airportMarkerVisibility: { ...state.airportMarkerVisibility, enabled }};
    
    case TOGGLE_AIRPORT_MARKER_APPROACH_CIRCLE:
        const showApproachCircle = !state.airportMarkerVisibility.showApproachCircle;
        return {...state, airportMarkerVisibility: { ...state.airportMarkerVisibility, showApproachCircle }};

    case TOGGLE_AIRPORT_MARKER_ATC_BADGES:
        const showControllerBadges = !state.airportMarkerVisibility.showControllerBadges;
        return {...state, airportMarkerVisibility: { ...state.airportMarkerVisibility, showControllerBadges }};

    default:
        return state
    }
}
