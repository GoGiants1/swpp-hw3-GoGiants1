import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from '../features/user/userSlice';
import articlesReducer from '../features/articles/articlesSlice';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    articles: articlesReducer,
  });

export default createRootReducer;
