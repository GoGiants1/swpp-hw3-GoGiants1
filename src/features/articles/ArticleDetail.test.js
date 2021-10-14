/* eslint-disable no-unused-vars */
import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';
import ArticleDetail from './ArticleDetail';
import * as articlesSlice from './articlesSlice';
import * as userSlice from '../user/userSlice';
import { history } from '../../app/store';
import getMockStore, { stubArticleDetailState } from '../../test-utils/mocks';

const stubInitialState = {
  ...stubArticleDetailState,
  articles: {
    ...stubArticleDetailState.articles,
    selectedArticle: stubArticleDetailState.articles.articles[0],
  },
};
const mockStore = getMockStore(stubInitialState);
jest.mock('../comments/Comments', () => () => <div>Commnets</div>);

describe('<ArticleDetail/>', () => {
  let articleDetail;
  let spyPutUser;
  let spyGetArticle;
  let spyDeleteArticle;
  let spyAxiosGet;
  let spySelectThisUser;
  let spySelectSelectedArticle;
  beforeEach(() => {
    articleDetail = (
      <redux.Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/articles/0" exact component={ArticleDetail} />
            <Redirect to="/articles/0" />
          </Switch>
        </ConnectedRouter>
      </redux.Provider>
    );
    history.push = jest.fn();

    spyPutUser = jest
      .spyOn(userSlice, 'putUser')
      .mockImplementation(() => (dispatch) => {});
    spyGetArticle = jest
      .spyOn(articlesSlice, 'getArticle')
      .mockImplementation(() => (dispatch) => {});
    spyDeleteArticle = jest
      .spyOn(articlesSlice, 'deleteArticle')
      .mockImplementation(() => (dispatch) => {});
    spyAxiosGet = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: {
              id: 0,
              author_id: 1,
              title: '10 React JS Articles Every Web Developer Should Read',
              content:
                'Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.',
            },
          };
          resolve(res);
        }),
    );
    // spySelectThisUser = jest
    //   .spyOn(userSlice, 'selectThisUser')
    //   .mockReturnValue(stubInitialState.user.thisUser);
    // spySelectSelectedArticle = jest
    //   .spyOn(articlesSlice, 'selectSelectedArticle')
    //   .mockReturnValue(stubInitialState.articles.selectedArticle);
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render w/o error', () => {
    const component = mount(articleDetail);
    expect(component.find(ArticleDetail).length).toBe(1);
    expect(spyAxiosGet).toHaveBeenCalledTimes(1);
  });

  it('should report error when network error occur ', async () => {
    spyAxiosGet = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    const component = await mount(articleDetail);
    expect(console.error).toHaveBeenCalledTimes(1);
  });

  it('should call handleBack when back button is clicked', () => {
    const component = mount(articleDetail);
    const backButton = component.find('#back-detail-article-button');
    backButton.simulate('click');
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should handle logout request correctly when logout button is clicked', () => {
    const component = mount(articleDetail);
    const logoutButton = component.find('#logout-button');
    logoutButton.simulate('click');
    expect(spyPutUser).toHaveBeenCalledTimes(1);
  });
  it('should call getArticle thunk and history.push when edit button is clicked', async () => {
    const component = await mount(articleDetail);
    // update mounted component
    component.update();
    const editButton = component.find('#edit-article-button');
    await editButton.simulate('click');
    expect(spyGetArticle).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should call console.error when dispatch is failed', async () => {
    const component = await mount(articleDetail);
    // update mounted component
    component.update();
    spyGetArticle = jest
      .spyOn(articlesSlice, 'getArticle')
      .mockImplementation(() => (dispatch) => {
        throw new Error();
      });
    const editButton = component.find('#edit-article-button');
    await editButton.simulate('click');
    expect(console.error).toHaveBeenCalled();
  });

  it('should delete article when delete button is clicked', async () => {
    const component = await mount(articleDetail);
    // update mounted component
    component.update();
    const deleteButton = component.find('#delete-article-button');
    await deleteButton.simulate('click');
    expect(spyDeleteArticle).toHaveBeenCalledTimes(1);
  });
});
