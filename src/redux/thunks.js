import {
  fetchAllDataError,
  fetchAllDataPending,
  fetchAllDataSuccess,
  focusAirplaneError,
  focusAirplanePending,
  focusAirplaneSuccess,
  unFocusAirplane } from "../redux/actions";

import { getAllData, getAircraftData } from "./api";

export const fetchAllData = () => {
    return async dispatch => {
        dispatch(fetchAllDataPending());
        try {
            const res = await getAllData();
            dispatch(fetchAllDataSuccess(res));
        } catch (error) {
            dispatch(fetchAllDataError(error));
        }
    }
}



export const focusOnAirplane = (callsign, goTo = true) => {
    return async (dispatch, getState) => {

        // If calling a focus on the current focused airplane, unfocus.
        const { focused } = getState();
        if (focused) {
            if (focused.callsign === callsign) {
                dispatch(unFocusAirplane());
            }
        } else {
            dispatch(focusAirplanePending());
            try {
                const res = await getAircraftData(callsign);
                dispatch(focusAirplaneSuccess({ ...res, goTo }));
            } catch (error) {
                dispatch(focusAirplaneError(error));
            }
        }
    }
}
