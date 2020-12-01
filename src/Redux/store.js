import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import BooksReducer from './BooksReducer';
import masterSaga from './sagas';

const reducer = combineReducers({
  books: BooksReducer
});

const sagaMiddleware = createSagaMiddleware();

let store = createStore(reducer,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(masterSaga);

export default store;
