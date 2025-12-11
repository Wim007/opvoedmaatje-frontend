import { useState } from 'react';
import { saveUser } from '../../auth/authService';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  accessCode: '',
  password: '',
};

function Register() {
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveUser(form);
    setStatus('Gebruiker opgeslagen. Je kunt nu inloggen.');
  };

  return (
    <div className="auth-form">
      <h2>Registreren</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Voornaam
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Achternaam
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          E-mail
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Toegangscode
          <input
            type="text"
            name="accessCode"
            value={form.accessCode}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Wachtwoord (optioneel)
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Opslaan</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}

export default Register;
