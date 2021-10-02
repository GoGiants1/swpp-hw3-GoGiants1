/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { push } from 'connected-react-router';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    thisUser: {
      id: null,
      email: '',
      password: '',
      name: '',
      logged_in: false,
    },
    users: null,
    tmpUser: null,
  },
  reducers: {
    login: (state, action) => {
      state.thisUser = action.payload;
    },
    logout: (state) => {
      state.thisUser = null;
      state.thisUser.loggedIn = false;
    },
    getUsers_: (state, action) => {
      state.users = action.payload;
    },
    getUser_: (state, action) => {
      state.tmpUser = action.payload;
    },
    putUser_: (state, action) => {
      state.tmpUser = action.payload;
    },
  },
});

export const { login, logout, getUsers_, getUser_ } = userSlice.actions; //

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
  const res = await axios.get('/api/user');
  dispatch(getUsers_(res.data));
};

export const getUser = (id) => async (dispatch) => {
  const res = await axios.get(`/api/user/${id}`);
  dispatch(getUser_(res.data));
};

export const putUser = (user) => async (dispatch) => {
  if (!user.logged_in) {
    const res = await axios.put(`/api/user/${user.id}`, user);
  }
  await dispatch(login(user));
  dispatch(push('/articles'));
};
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectThisUser = (state) => state.user.thisUser;
export const selectIsLoggedIn = (state) => state.user.thisUser.logged_in;
export const selectUsers = (state) => state.user.users;
export const selectTmpUser = (state) => state.user.tmpUser;
export default userSlice.reducer;
