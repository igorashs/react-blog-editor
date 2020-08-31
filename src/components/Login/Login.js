import React, { useEffect, useState } from 'react';
import { fetchToken } from '../../lib/api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    // TODO refactor this shit out
    const res = await fetchToken({ username, password });

    if (res.validationError) {
      console.error(res.validationError);
    } else {
      console.log(res);
    }
  }

  function handleUsernameChange(e) {
    setUsername(e.currentTarget.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.currentTarget.value);
  }

  return (
    <section className="LoginFormSection">
      <h2>Login</h2>
      <form method="Post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
        <button>Login</button>
      </form>
    </section>
  );
}
