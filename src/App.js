import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './features/user/Login';
import Auth from './hoc/Auth';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact component={Auth(Login, false)} />
      </Switch>
      <Login />
    </div>
  );
}

export default App;
