import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import countryReducer from './reducers/countryReducer';

const rootReducer = combineReducers({
  test: testReducer,
  countryCode: countryReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;