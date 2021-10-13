/* eslint-disable no-unused-vars */
import React from 'react';
import * as redux from 'react-redux';
import { mount } from 'enzyme';
import axios from 'axios';
import { ConnectedRouter } from 'connected-react-router';
import Login from './Login';
import getMockStore, { stubInitialState } from '../../test-utils/mocks';
import { history } from '../../app/store';

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

describe('Login', () => {
  let login;
  let spyAxios;
  let spyUseSelector;
  beforeEach(async () => {
    login = (
      <redux.Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Login />
        </ConnectedRouter>
      </redux.Provider>
    );
    spyAxios = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const result = {
            status: 200,
            data: stubUsers,
          };
          resolve(result);
        }),
    );
    spyUseSelector = jest.spyOn(redux, 'useSelector');
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render Login page', async () => {
    history.push('/login');
    spyUseSelector.mockReturnValue(stubUsers);

    const component = mount(login);
    expect(component.find('.Login').length).toBe(1);
    expect(component.find('#email-input').length).toBe(1);
    expect(component.find('#pw-input').length).toBe(1);
    expect(component.find('#login-button').length).toBe(1);
  });

  it('should login email input change properly', async () => {
    const mockedEvent = {
      preventDefault() {},
      target: { value: 'iluvswpp' },
    };
    const component = mount(login);
    const input = component.find('#email-input').at(0);
    expect(input.length).toBe(1);
    input.simulate('change', mockedEvent);
  });

  it('should login pw input change properly', async () => {
    const mockedEvent = {
      preventDefault() {},
      target: { value: 'iluvswpp' },
    };
    const component = mount(login);
    const input = component.find('#pw-input').at(0);
    expect(input.length).toBe(1);
    input.simulate('change', mockedEvent);
  });

  it('should submit button work put user info', async () => {
    spyUseSelector.mockReturnValue(stubUsers);
    const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const component = mount(login);
    const submitButton = component.find('#login-button');
    submitButton.simulate('click');
    expect(spyAlert).toHaveBeenCalledTimes(1);
  });

  it('should handleSubmit alert error massage when wrong input submitted', async () => {
    spyUseSelector.mockReturnValue(stubUsers);
    const spyDispatch = jest
      .spyOn(redux, 'useDispatch')
      .mockImplementation(() => jest.fn());
    const mockEmailChange = {
      preventDefault() {},
      target: { value: 'swpp@snu.ac.kr' },
    };
    const mockPwChange = {
      preventDefault() {},
      target: { value: 'iluvswpp' },
    };
    const component = mount(login);
    const emailInput = component.find('#email-input').at(0);
    const pwInput = component.find('#pw-input').at(0);
    const submitButton = component.find('#login-button');

    emailInput.simulate('change', mockEmailChange);
    pwInput.simulate('change', mockPwChange);
    submitButton.simulate('click');

    expect(spyDispatch).toHaveBeenCalledTimes(3);
  });
});
