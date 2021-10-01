import React, { useState } from 'react';
import './Login.css';

const refEmail = 'swpp@snu.ac.kr';
const refPassword = 'iluvswpp';

/* TODO: 
1. 로그인 서버랑 통신하는 것.
2. 로그인 후 push /articles
 */

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    if (email === refEmail && password === refPassword) {
      alert('ok');
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
      <button type="button" id="login-button" onClick={() => handleSubmit()}>
        로그인
      </button>
    </div>
  );
}

export default Login;
