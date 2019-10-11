import { TOGGLE_FIRS, TOGGLE_COLOR_MODE, TOGGLE_AIRPORT_MARKER, TOGGLE_AIRPORT_MARKER_ATC_BADGES, TOGGLE_AIRPORT_MARKER_APPROACH_CIRCLE} from "./actionTypes";

export const toggleFIRs = (payload) => ({
    type: TOGGLE_FIRS,
    payload
})

export const toggleColorMode = () => ({
    type: TOGGLE_COLOR_MODE
})

export const toggleAirportMarkers = () => ({
    type: TOGGLE_AIRPORT_MARKER,
})

export const toggleAirportMarkerATCBadges = () => ({
    type: TOGGLE_AIRPORT_MARKER_ATC_BADGES,
})

export const toggleAirportMarkerApproachCircle = () => ({
    type: TOGGLE_AIRPORT_MARKER_APPROACH_CIRCLE,
})

