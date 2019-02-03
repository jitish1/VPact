import * as ActionTypes from '../redux/ActionTypes';

export const apodreducer = (state = { isLoading: true, errMess: null, apodData: [], startDate: null, endDate: null, isLoadMore: true }, action) => {

    switch (action.type) {
        case ActionTypes.SUCCESS:

            return { ...state, isLoading: false, errMess: null, apodData: state.apodData.concat(action.payload), isLoadMore: false };

        case ActionTypes.PENDING:
            return { ...state, isLoading: true, errMess: null, apodData: [] }

        case ActionTypes.ERROR:
            return { ...state, isLoading: false, errMess: action.payload };

        case ActionTypes.PARAMS:
            return { ...state, startDate: action.startDate, endDate: action.endDate };

        case ActionTypes.ISLOADMORE:
            return { ...state, isLoadMore: true, }

        default:
            return state;
    }
};