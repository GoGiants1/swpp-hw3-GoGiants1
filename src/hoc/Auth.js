import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../features/user/userSlice';

export default (Component, option /* { admin = null} */) => {
  /* 
      option ===> null -> 아무나 다 접근 가능, true -> 로그인한 유저만 접근, false -> 로그인 안한 사람들만 접근
  */

  const Auth = (props) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const { location, history } = props;
    const { pathname } = location;
    useEffect(() => {
      // 로그인 안한 사람.
      if (!isLoggedIn && (pathname === '/' || option)) {
        history.push('/login');
      } else if (isLoggedIn && pathname === '/') {
        history.push('/articles');
      }
    }, []);
    return <Component />;
  };

  return Auth;
};
