import { persistStore } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import taskReducer from './task';
import columnReducer from './column';

const sagaMiddleware = createSagaMiddleWare();

const rootReducers = combineReducers({
    task: taskReducer,
    column: columnReducer
})

export const store = createStore(rootReducers, applyMiddleware(sagaMiddleware));
store.__persistor = persistStore(store);

export const persistor = persistStore(store);