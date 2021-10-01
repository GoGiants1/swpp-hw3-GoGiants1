import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './features/user/Login';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Login} />
      </Switch>
      <Login />
    </div>
  );
}

export default App;
