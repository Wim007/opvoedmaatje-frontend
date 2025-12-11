import { useState } from 'react';
import { getUser, login } from '../../auth/authService';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const success = login(email, password);
    if (success) {
      const storedUser = getUser();
      setMessage(`Welkom terug${storedUser?.firstName ? `, ${storedUser.firstName}` : ''}!`);
    } else {
      setMessage('Combinatie van e-mail en wachtwoord niet gevonden.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Inloggen</h2>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
          Wachtwoord
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Laat leeg indien niet ingesteld"
          />
        </label>

        <button type="submit">Log in</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Login;
