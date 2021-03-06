import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import {
    adminTabReducer,
    downloadDataStoreReducer,
    globalArticleFilterReducer,
    globalDateFilterReducer,
    globalModelFilterReducer,
    globalShiftFilterReducer,
    LoginReducer,
    reportSelectedTabReducer,
    sidebarReducer,
    themeReducer,
} from '../../redux/reducers/index';
import thunk from "redux-thunk";

const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    sidebar: sidebarReducer,
    login: LoginReducer,
    adminTab: adminTabReducer,
    reportSelectedTab: reportSelectedTabReducer,
    globalDateFilter: globalDateFilterReducer,
    downloadDataStore: downloadDataStoreReducer,
    globalModelFilter: globalModelFilterReducer,
    globalArticleFilter: globalArticleFilterReducer,
    globalShiftFilter: globalShiftFilterReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancer(applyMiddleware(thunk)),
);

export default store;
