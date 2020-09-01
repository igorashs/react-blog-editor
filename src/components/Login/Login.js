import React, { useEffect, useState } from 'react';
import { fetchToken } from '../../lib/api';
import { validatePassword, validateUsername } from '../../lib/validator';

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);

    if (usernameError || passwordError) {
      setUsernameError(usernameError);
      setPasswordError(passwordError);
    } else {
      const res = await fetchToken({ username, password });

      if (res.usernameError) {
        setUsernameError(' is invalid');
      } else if (res.passwordError) {
        setPasswordError(' is invalid');
      } else if (res.unknownError) {
        setFormError(res.error);
      } else {
        setFormError('');

        localStorage.setItem('token', res);
        localStorage.setItem('sip', 'do not touch my token');
        window.location.reload();
      }
    }
  }

  // validate after inputs change
  useEffect(() => {
    if (username !== null) {
      setUsernameError(validateUsername(username));
    }
  }, [username]);

  useEffect(() => {
    if (password !== null) {
      setPasswordError(validatePassword(password));
    }
  }, [password]);

  function handleUsernameChange(e) {
    setUsername(e.currentTarget.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.currentTarget.value);
  }

  return (
    <section className="LoginFormSection">
      <h2>Login</h2>
      <form
        method="Post"
        onSubmit={handleSubmit}
        className={(formError || usernameError || passwordError) && 'FormError'}
      >
        <label htmlFor="username" className={usernameError && 'Error'}>
          Username {usernameError}
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="password" className={passwordError && 'Error'}>
          Password {passwordError}
        </label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <button>Login</button>
        {!formError ? '' : <label className="Error">{formError}</label>}
      </form>
    </section>
  );
}
