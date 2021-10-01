import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: null,
    email: null,
    isLoggedIn: false,
  },
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = userSlice.actions; //

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserName = (state) => state.user.name;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export default userSlice.reducer;
