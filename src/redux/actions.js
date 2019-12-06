import { 
    FETCH_ALL_DATA_ERROR,
    FETCH_ALL_DATA_PENDING,
    FETCH_ALL_DATA_SUCCESS,
    FOCUS_AIRPLANE_PENDING,
    FOCUS_AIRPLANE_SUCCESS,
    FOCUS_AIRPLANE_ERROR,
    UNFOCUS_AIRPLANE
 } from "./actionTypes";


export const focusAirplanePending = () => ({
    type: FOCUS_AIRPLANE_PENDING
})

export const focusAirplaneSuccess = (payload) => ({
    type: FOCUS_AIRPLANE_SUCCESS,
    payload
})

export const focusAirplaneError = (error) => ({
    type: FOCUS_AIRPLANE_ERROR,
    error
})

export const unFocusAirplane = () => ({
    type: UNFOCUS_AIRPLANE,
})


export const fetchAllDataPending = () => ({
    type: FETCH_ALL_DATA_PENDING,
})

export const fetchAllDataSuccess = (payload) => ({
    type: FETCH_ALL_DATA_SUCCESS,
    payload
})

export const fetchAllDataError = (error) => ({
    type: FETCH_ALL_DATA_ERROR,
    error
})



