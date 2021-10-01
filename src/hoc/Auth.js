import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { selectIsLoggedIn } from '../features/user/userSlice';

export default (Component, option /* { admin = null} */) => {
  /* 
          option: null -> 아무나 다 접근 가능.
                  true -> 로그인한 유저만 접근
                  false -> 로그인 안한 사람들만 접근
  */

  const Auth = (props) => {
    const isLoggedIn = useSelector(selectIsLoggedIn);

    useEffect(() => {
      // 로그인 안한 사람.
      console.log(props);
      if (!isLoggedIn && option) {
        <Redirect to="/login" />;
      }
    }, []);
    return <Component />;
  };

  return Auth;
};
