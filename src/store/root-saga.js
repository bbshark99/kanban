import { all } from 'redux-saga/effects';

import taskSaga from './task';

export default function* rootSaga() {
    yield all([
        taskSaga()
    ])
}