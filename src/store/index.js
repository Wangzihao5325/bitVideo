import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import testReducer from './reducers/testReducer';
import countryReducer from './reducers/countryReducer';
import mainPageDataReducer from './reducers/mainPageDataReducer';
import videoDetailInfoReducer from './reducers/videoDetailInfoReducer';
import videoPlayReducer from './reducers/videoPlayReducer';
import searchHistoryReducer from './reducers/searchHistoryReducer';
import accountReducer from './reducers/accountReducer';
import watchHistoryReducer from './reducers/watchHistoryReducer';
import userCollectReducer from './reducers/userCollectReducer';
import lockReducer from './reducers/lockReducer';
import modelReducer from './reducers/modelReducer';
import netReducer from './reducers/netReducer';

const rootReducer = combineReducers({
  test: testReducer,
  countryCode: countryReducer,
  mainPageData: mainPageDataReducer,
  videoDeatilInfo: videoDetailInfoReducer,
  videoPlay: videoPlayReducer,
  searchHistory: searchHistoryReducer,
  account: accountReducer,
  watchHistory: watchHistoryReducer,
  userCollect: userCollectReducer,
  lock: lockReducer,
  model: modelReducer,
  net: netReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;