import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);

const logger = (store) => (next) => (action) => {
  // eslint-disable-next-line
  console.log('[Middleware] Dispatching', action);
  const result = next(action);
  // eslint-disable-next-line
  console.log('[Middleware] Next State', store.getState());
  return result;
};

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger, routerMiddleware(history)),
    preloadedState,
  });
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  }
  return store;
}
