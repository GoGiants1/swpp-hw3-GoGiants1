import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from '../features/user/userSlice';
import articlesReducer from '../features/articles/articlesSlice';
import commentsReducer from '../features/comments/commentsSlice';

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    articles: articlesReducer,
    comments: commentsReducer,
  });

export default createRootReducer;
