/* eslint-disable arrow-body-style */
import React from 'react';
import { mount } from 'enzyme';
import * as redux from 'react-redux';
// import { ConnectedRouter } from 'connected-react-router';
// import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import getMockStore, {
  stubInitialState,
  stubAfterLoggedInState,
} from '../test-utils/mocks';
import configureAppStore, { history } from '../app/store';
import App from '../App';

jest.mock('../features/articles/Articles', () => () => (
  <div className="Articles">Articles</div>
));

jest.mock('axios');

const stubUsers = stubAfterLoggedInState.user.users;
const mockStore = getMockStore(stubInitialState);
const store = configureAppStore(stubAfterLoggedInState);
describe('Auth', () => {
  let auth;
  beforeEach(() => {
    auth = (
      <redux.Provider store={mockStore}>
        <App history={history} />
      </redux.Provider>
    );

    axios.get.mockReturnValue(stubUsers);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('anonymous user should redirect to /login', async () => {
    const spyUseSelector = jest.spyOn(redux, 'useSelector');
    spyUseSelector.mockReturnValue(false);
    const component = mount(auth);
    history.push('/articles');
    expect(component.find('.Login').length).toBe(1);
  });
});

describe('hoc', () => {
  let auth;
  beforeEach(() => {
    auth = (
      <redux.Provider store={store}>
        <App />
      </redux.Provider>
    );
  });

  it('should redirect logged-in user to /articles', async () => {
    const spyUseSelector = jest.spyOn(redux, 'useSelector');
    spyUseSelector.mockReturnValue(stubAfterLoggedInState);
    const component = mount(auth);
    history.push('/articles');
    history.push('/login');
    expect(component.find('.Articles').length).toBe(1);
  });
});
