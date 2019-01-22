import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import countryReducer from './reducers/countryReducer';
import mainPageDataReducer from './reducers/mainPageDataReducer';

const rootReducer = combineReducers({
  test: testReducer,
  countryCode: countryReducer,
  mainPageData: mainPageDataReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;