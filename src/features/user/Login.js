import React, { useState, useEffect } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
// import { push } from 'connected-react-router';
import { getUser, getUsers, putUser, selectUsers } from './userSlice';

/* TODO: 
1. 로그인 서버랑 통신하는 것.
2. 로그인 후 push /articles
 */

function Login() {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const matchUserInfo = (e, p) => {
    for (let i = 0; i < users.length; i += 1) {
      if (users[i].email === e && users[i].password === p) {
        dispatch(getUser(users[i].id));
        return users[i];
      }
    }
    return false;
  };

  const handleSubmit = () => {
    const userInfo = matchUserInfo(email, password);
    if (userInfo) {
      const newUser = { ...userInfo, logged_in: true };
      dispatch(putUser(newUser));
    } else {
      alert('Email or password is wrong');
    }
  };

  const handleEmailChange = (txt) => {
    setEmail(txt);
  };

  const handlePasswordChange = (txt) => {
    setPassword(txt);
  };

  return (
    <div className="login">
      <input
        name="email"
        id="email-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
      />
      <input
        name="password"
        id="pw-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
      />
      <button type="submit" id="login-button" onClick={() => handleSubmit()}>
        로그인
      </button>
    </div>
  );
}

export default Login;
