import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import countryReducer from './reducers/countryReducer';
import mainPageDataReducer from './reducers/mainPageDataReducer';
import videoDetailInfoReducer from './reducers/videoDetailInfoReducer';

const rootReducer = combineReducers({
  test: testReducer,
  countryCode: countryReducer,
  mainPageData: mainPageDataReducer,
  videoDeatilInfo: videoDetailInfoReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;