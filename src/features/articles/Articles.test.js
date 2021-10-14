import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import Articles from './Articles';
import * as userSlice from '../user/userSlice';
import getMockStore, { stubArticleDetailState } from '../../test-utils/mocks';
import { history } from '../../app/store';

const stubInitialState = {
  ...stubArticleDetailState,
  articles: {
    ...stubArticleDetailState.articles,
    selectedArticle: stubArticleDetailState.articles.articles[0],
  },
};
const mockStore = getMockStore(stubInitialState);

describe('<Articles/>', () => {
  let articles;
  let spyPutUser;
  beforeEach(() => {
    articles = (
      <redux.Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Articles} />
          </Switch>
        </ConnectedRouter>
      </redux.Provider>
    );
    spyPutUser = jest
      .spyOn(userSlice, 'putUser')
      // eslint-disable-next-line no-unused-vars
      .mockImplementation(() => (dispatch) => {});
    history.push = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should render w/o error', () => {
    const component = mount(articles);
    expect(component.find(Articles).length).toBe(1);
  });
  it('should redirect to article create page when create button is clicked', () => {
    const component = mount(articles);
    const createButton = component.find('#create-article-button');
    createButton.simulate('click');
    expect(history.push).toHaveBeenCalledTimes(1);
  });
  it('should handle logout request correctly when logout button is clicked', () => {
    const component = mount(articles);
    const logoutButton = component.find('#logout-button');
    logoutButton.simulate('click');
    expect(spyPutUser).toHaveBeenCalledTimes(1);
  });
});
