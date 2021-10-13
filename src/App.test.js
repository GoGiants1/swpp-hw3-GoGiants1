/* eslint-disable no-unused-vars */
import React from 'react';
import { mount, shallow } from 'enzyme';
import * as redux from 'react-redux';
import axios from 'axios';
import App from './App';
import getMockStore, { stubInitialState } from './test-utils/mocks';
import { history } from './app/store';

jest.mock('axios');
jest.mock('./features/user/Login', () => () => <div>Login</div>);
jest.mock('./features/articles/Articles', () => () => <div>Articles</div>);
const mockStore = getMockStore(stubInitialState);
const stubUsers = [
  {
    id: 1,
    email: 'swpp@snu.ac.kr',
    password: 'iluvswpp',
    name: 'Software Lover',
    logged_in: false,
  },
  {
    id: 2,
    email: 'alan@turing.com',
    password: 'iluvswpp',
    name: 'Alan Turing',
    logged_in: false,
  },
  {
    id: 3,
    email: 'edsger@dijkstra.com',
    password: 'iluvswpp',
    name: 'Edsger Dijkstra',
    logged_in: false,
  },
];

describe('<App />', () => {
  let app;
  let spyAxios;

  beforeEach(async () => {
    app = (
      <redux.Provider store={mockStore}>
        <App history={history} />
      </redux.Provider>
    );
    axios.get.mockReturnValue(stubUsers);
    console.err = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const component = mount(app);
    expect(component.find('App').length).toBe(1);
  });

  it('should render 404 Not Found in unexpected url', async () => {
    history.push('/asdqw');
    const component = mount(app);
    expect(component.find('h1').text()).toBe('404 Not Found');
  });
});
