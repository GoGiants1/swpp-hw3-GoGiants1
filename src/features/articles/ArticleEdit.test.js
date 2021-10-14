/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState as useStateMock } from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Redirect } from 'react-router-dom';
import getMockStore, { stubArticleDetailState } from '../../test-utils/mocks';
import * as articlesSlice from './articlesSlice';
import * as userSlice from '../user/userSlice';
import ArticleEdit from './ArticleEdit';
import store, { history } from '../../app/store';

const stubInitialState = {
  ...stubArticleDetailState,
  articles: {
    ...stubArticleDetailState.articles,
    selectedArticle: stubArticleDetailState.articles.articles[0],
  },
};
const mockStore = getMockStore(stubInitialState);
// const s = store(stubInitialState);
jest.mock(
  './EditPreview',
  () =>
    ({ setIsPreview, handleClickBack, handleEdit }) =>
      (
        <div className="PreviewTab">
          preview!
          <button
            id="write-tab-button"
            type="button"
            onClick={() => setIsPreview(false)}
          >
            write tab
          </button>
          <button
            id="back-edit-article-button"
            type="button"
            onClick={() => handleClickBack()}
          >
            back
          </button>
          <button
            id="confirm-edit-article-button"
            type="button"
            onClick={() => handleEdit()}
          >
            confirm
          </button>
        </div>
      ),
);
jest.mock(
  './EditWrite',
  () =>
    ({
      setIsPreview,
      handleClickBack,
      handleEdit,
      setTitle,
      setContent,
      title,
      content,
    }) =>
      (
        <div className="WriteTab">
          write!
          <button
            id="preview-tab-button"
            type="button"
            onClick={() => setIsPreview(true)}
          >
            preview tab
          </button>
          <>
            <textarea
              id="article-title-input"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              id="article-content-input"
              name="content"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </>
          <button
            id="back-edit-article-button"
            type="button"
            onClick={() => handleClickBack()}
          >
            back
          </button>
          <button
            id="confirm-edit-article-button"
            type="button"
            onClick={() => handleEdit()}
          >
            confirm
          </button>
        </div>
      ),
);

// jest.mock('react', () => ({
//   ...jest.requireActual('react'),
//   useState: jest.fn(),
// }));
describe('<ArticleEdit>', () => {
  let articleEdit;
  let spyPutArticle;
  let spyPutUser;
  // let spySelectThisUser;
  // let spySelectSelectedArticle;
  // const setState = jest.fn();

  beforeEach(() => {
    articleEdit = (
      <redux.Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/articles/:id/edit" exact component={ArticleEdit} />
            <Redirect to="articles/1/edit" />
          </Switch>
        </ConnectedRouter>
      </redux.Provider>
    );

    spyPutArticle = jest
      .spyOn(articlesSlice, 'putArticle')
      .mockImplementation(() => (dispatch) => {});
    spyPutUser = jest
      .spyOn(userSlice, 'putUser')
      .mockImplementation(() => (dispatch) => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Write page in initial visit', () => {
    const component = mount(articleEdit);
    const ae = component.find('ArticleEdit');
    expect(ae.length).toBe(1);
  });

  it('should call putUser when #logout-button clicked', () => {
    const component = mount(articleEdit);
    const logoutButton = component.find('#logout-button');
    logoutButton.simulate('click');
    expect(spyPutUser).toHaveBeenCalledTimes(1);
  });

  it('should call handleEdit when post article button clicked', () => {
    const component = mount(articleEdit);
    const confirmButton = component.find('#confirm-edit-article-button');
    confirmButton.simulate('click');
    expect(spyPutArticle).toHaveBeenCalledTimes(1);
  });

  it('should render when isPreview is false', () => {
    const component = mount(articleEdit);
    const previewTabButton = component.find('#preview-tab-button');
    previewTabButton.simulate('click');
  });

  it('should call handleClickBack when backButton clicked without any change', () => {
    history.push = jest.fn();
    const component = mount(articleEdit);
    const backButton = component.find('#back-edit-article-button');
    backButton.simulate('click');
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  it('should stay edit page when user click cancel confirm button with any change', () => {
    // const spyConfirm = jest
    //   .spyOn(window, 'confirm')
    //   .mockImplementation(jest.fn(() => false));
    window.confirm = jest.fn().mockImplementation(() => true);
    const component = mount(articleEdit);

    const backButton = component.find('#back-edit-article-button');
    const articleTitleInput = component.find('#article-title-input');
    articleTitleInput.simulate('change', { target: { value: 'TEST_INPUT' } });
    backButton.simulate('click');
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledTimes(1);
  });
  it('should stay edit page when user click cancel confirm button with any change', () => {
    // const spyConfirm = jest
    //   .spyOn(window, 'confirm')
    //   .mockImplementation(jest.fn(() => false));
    window.confirm = jest.fn().mockImplementation(() => false);
    const component = mount(articleEdit);

    const backButton = component.find('#back-edit-article-button');
    const articleTitleInput = component.find('#article-title-input');
    articleTitleInput.simulate('change', { target: { value: 'TEST_INPUT' } });
    backButton.simulate('click');
    expect(window.confirm).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledTimes(0);
  });
});
