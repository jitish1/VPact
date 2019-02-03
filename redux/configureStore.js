import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { apodreducer } from '../reducer/reducer';
// import { AsyncStorage } from "react-native";

import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const config = {
    key: 'root',
    storage,
    debug: true
}



export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            apodreducer,
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}

// export const ConfigureStore = () => {
//     const store = createStore(
//         combineReducers({
//             apodreducer: apodreducer,
//         }),
//         applyMiddleware(thunk, logger)
//     );

//     return store;
// }