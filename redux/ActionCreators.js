import * as ActionTypes from './ActionTypes';
import { url } from '../utility/utils';
import { convertStringtoDate } from "../utility/utils"

var endDatee = "";
var startDatee = "";

export const fetchService = (startDate, endDate) => dispatch => {
    dispatch(Pending());
    // endDatee = convertStringtoDate(startDate, 1);
    // startDatee = convertStringtoDate(endDate, 9);

    dispatch(Params(convertStringtoDate(convertStringtoDate(startDate, 1), 9), convertStringtoDate(startDate, 1)));

    console.log(url + startDate + '&end_date=' + endDate);

    return fetch(url + startDate + '&end_date=' + endDate)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }).then(response => response.json())
        .then(response => {
            dispatch(Success(response.reverse()))
        })
        .catch(error => dispatch(Failed(error.message)));
};


export const Pending = () => ({
    type: ActionTypes.PENDING
});

export const Failed = (errmess) => ({
    type: ActionTypes.ERROR,
    payload: errmess
});

export const Success = (data) => ({
    type: ActionTypes.SUCCESS,
    payload: data
});

export const Addmore = (arr) => ({
    type: ActionTypes.ADDMORE,
    data: arr
});

export const isLoadMore = () => ({
    type: ActionTypes.ISLOADMORE
});


export const Params = (startDate, endDate) => {
    return {
        type: ActionTypes.PARAMS,
        startDate: startDate,
        endDate: endDate
    }
}

export const fetchMore = (startDate, endDate) => dispatch => {
    // endDatee = convertStringtoDate(startDate, 1);
    // startDatee = convertStringtoDate(endDate, 9);
    dispatch(isLoadMore());
    dispatch(Params(convertStringtoDate(convertStringtoDate(startDate, 1), 9), convertStringtoDate(startDate, 1)));

    console.log(url + startDate + '&end_date=' + endDate);

    return fetch(url + startDate + '&end_date=' + endDate)
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            }).then(response => response.json())
        .then(response => {
            dispatch(Success(response.reverse()))
        })
        .catch(error => dispatch(Failed(error.message)));
};