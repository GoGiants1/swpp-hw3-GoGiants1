import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './features/user/Login';
import Auth from './hoc/Auth';
import Articles from './features/articles/Articles';

// eslint-disable-next-line no-unused-vars
function App({ history }) {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Auth(Login, true)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/articles" exact component={Auth(Articles, true)} />
      </Switch>
      <Login />
    </div>
  );
}

export default App;
