import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router';
import Login from './features/user/Login';
import Auth from './hoc/Auth';
import Articles from './features/articles/Articles';
import NewArticle from './features/articles/NewArticle';
import ArticleDetail from './features/articles/ArticleDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/articles" exact component={Auth(Articles, true)} />
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/" exact component={Auth(Articles, true)} />
        <Route
          path="/articles/create"
          exact
          component={Auth(NewArticle, true)}
        />
        <Route
          path="/articles/:id"
          exact
          component={Auth(ArticleDetail, true)}
        />
      </Switch>
    </div>
  );
}

export default App;
