import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureAppStore, { history } from './app/store';

const store = configureAppStore();
const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App history={history} />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
  );

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./App', renderApp);
  }
};

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
