import {createStore,applyMiddleware } from 'redux';
import reducers from "./reducers/index"

import { save, load } from "redux-localstorage-simple"

const createStoreWithMiddleware
    = applyMiddleware(
    save() // Saving done here
)(createStore)

const configureStore = () => {//initialState = {}
    const store = createStoreWithMiddleware(reducers, load(), //initialState,
          window.__REDUX_DEVTOOLS_EXTENSION_applyMiddleware_ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}

export default configureStore();