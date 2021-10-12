/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import store, { history } from '../../app/store';
import userReducer, {
  login,
  logout_,
  getUsers_,
  getUser_,
  getUsers,
  getUser,
  putUser,
} from './userSlice';

const s = store();

const defaultThisUser = {
  id: null,
  email: '',
  password: '',
  name: '',
  logged_in: false,
};

const testUsers = [
  {
    id: 1,
    email: 'ar',
    password: 'a',
    name: 'a',
    logged_in: false,
  },
  {
    id: 2,
    email: 'b',
    password: 'b',
    name: 'b',
    logged_in: false,
  },
  {
    id: 3,
    email: 'c',
    password: 'c',
    name: 'c',
    logged_in: false,
  },
];

const stubInitialState = {
  thisUser: null,
  users: [],
  tmpUser: null,
};

describe('userSlice.', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should createSlice properly with initial state', () => {
    // reducer(prevState, actions)
    expect(userReducer(undefined, {})).toEqual({
      thisUser: defaultThisUser,
      users: null,
      tmpUser: null,
    });
  });

  // reducer tests
  it('should login action work', () => {
    expect(
      userReducer(
        {
          thisUser: defaultThisUser,
          users: null,
          tmpUser: null,
        },
        login(testUsers[0]),
      ),
    ).toEqual({
      thisUser: testUsers[0],
      users: null,
      tmpUser: null,
    });
  });

  it('should logout action work', () => {
    expect(
      userReducer(
        {
          thisUser: testUsers[0],
          users: null,
          tmpUser: null,
        },
        logout_(),
      ),
    ).toEqual({
      thisUser: defaultThisUser,
      users: null,
      tmpUser: null,
    });
  });

  it('should getUser_ action work', () => {
    expect(userReducer(undefined, getUsers_(testUsers))).toEqual({
      thisUser: defaultThisUser,
      users: testUsers,
      tmpUser: null,
    });
  });

  it('should getUser_ action work', () => {
    expect(userReducer(undefined, getUser_(testUsers[0]))).toEqual({
      thisUser: defaultThisUser,
      users: null,
      tmpUser: testUsers[0],
    });
  });

  // Thunk Actions Test
  it('should getUsers action work properly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testUsers,
          };
          resolve(res);
        }),
    );
    // try {
    //   const result = await store.dispatch(getUsers());
    //   expect(spy).toHaveBeenCalledTimes(1);
    //   done();
    // } catch (err) {
    //   expect(err).toMatch('error');
    //   done();
    // }
    s.dispatch(getUsers()).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should getUsers action handle error properly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(getUsers()).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should getUser action work properly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (u) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testUsers[0],
          };
          resolve(res);
        }),
    );

    s.dispatch(getUser(1)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should getUser action handle error properly', (done) => {
    const spy = jest.spyOn(axios, 'get').mockImplementation(
      (url) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );
    s.dispatch(getUser(9)).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should putUser action work properly when user.logged_in === true', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (u) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testUsers[0],
          };
          resolve(res);
        }),
    );

    history.replace = jest.fn();

    s.dispatch(putUser({ logged_in: true, id: 1 })).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(history.replace).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should putUser action(logout) work properly when user.logged_in === false', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (u) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 200,
            data: testUsers[0],
          };
          resolve(res);
        }),
    );

    history.push = jest.fn();

    s.dispatch(putUser({ logged_in: false, id: 1 })).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it('should putUser action(logout) work properly when user.logged_in === false', (done) => {
    const spy = jest.spyOn(axios, 'put').mockImplementation(
      (u) =>
        new Promise((resolve, reject) => {
          const res = {
            status: 400,
          };
          reject(res);
        }),
    );

    s.dispatch(putUser({ logged_in: false, id: 999 })).then(() => {
      expect(console.error).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
