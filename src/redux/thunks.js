import {
  fetchAllDataError,
  fetchAllDataPending,
  fetchAllDataSuccess,
  focusAirplaneError,
  focusAirplanePending,
  focusAirplaneSuccess } from "../redux/actions";

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
    return async dispatch => {
        dispatch(focusAirplanePending());
        try {
            const res = await getAircraftData();
            dispatch(focusAirplaneSuccess({ ...res, goTo }));
        } catch (error) {
            dispatch(focusAirplaneError(error));
        }
    }
}
