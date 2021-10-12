/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { replace, push } from 'connected-react-router';

const defaultThisUser = {
  id: null,
  email: '',
  password: '',
  name: '',
  logged_in: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    thisUser: defaultThisUser,
    users: [],
    tmpUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.thisUser = action.payload;
    },
    logout_: (state) => {
      state.thisUser = defaultThisUser;
      state.tmpUser = null;
    },
    getUsers_: (state, action) => {
      state.users = action.payload;
    },
    getUser_: (state, action) => {
      state.tmpUser = action.payload;
    },
    putUser_: (state, action) => {
      state.thisUser.logged_in = action.payload;
    },
  },
});

export const { login, logout_, getUsers_, getUser_, putUser_ } =
  userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/user');
    dispatch(getUsers_(res.data));
  } catch (e) {
    console.error(e);
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/user/${id}`);
    dispatch(getUser_(res.data));
  } catch (e) {
    console.error(e);
  }
};

export const putUser = (user) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/user/${user.id}`, user);
    if (user.logged_in) {
      await dispatch(login(user));
      dispatch(replace('/articles'));
    } else {
      await dispatch(logout_());
      dispatch(push('/login'));
    }
  } catch (e) {
    console.error(e);
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectThisUser = (state) => state.user.thisUser;
export const selectIsLoggedIn = (state) => state.user.thisUser.logged_in;
export const selectUsers = (state) => state.user.users;
export const selectTmpUser = (state) => state.user.tmpUser;
export default userSlice.reducer;
