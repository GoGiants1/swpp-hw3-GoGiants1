import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import Login from './features/user/Login';
import Auth from './hoc/Auth';
import Articles from './features/articles/Articles';
import NewArticle from './features/articles/NewArticle';
import ArticleDetail from './features/articles/ArticleDetail';
import ArticleEdit from './features/articles/ArticleEdit';
import { history } from './app/store';

function App() {
  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Switch>
          <Route
            path="/articles/create"
            exact
            component={Auth(NewArticle, true)}
          />
          <Route
            path="/articles/:id/edit"
            exact
            component={Auth(ArticleEdit, true)}
          />
          <Route
            path="/articles/:id"
            exact
            component={Auth(ArticleDetail, true)}
          />
          <Route path="/articles" exact component={Auth(Articles, true)} />
          <Route path="/login" exact component={Auth(Login, false)} />
          <Route path="/" exact component={Auth(Articles, true)} />
          <Route render={() => <h1>404 Not Found</h1>} />
        </Switch>
      </div>
    </ConnectedRouter>
  );
}

export default App;
