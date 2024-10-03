import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUser, setLoading, setError } from '../store/slices';
import { LoginResponse } from '../types/login';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      dispatch(setLoading(true));
      try {
          const response = await fetch('http://127.0.0.1:5000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),  
          });

          if (!response.ok) {
              throw new Error('Login failed');
          }

          // Parse the JSON response
          const data: LoginResponse = await response.json();

          // Store the token if needed
          localStorage.setItem('token', data.token);

          console.log(data.token);

          // Dispatch the user information to the Redux store
          dispatch(setUser(data.user));  
      } catch (err: any) {
          dispatch(setError('Invalid email or password'));
      } finally {
          dispatch(setLoading(false));
      }
  };

  return (
      <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
              <div>
                  <label>Email:</label>
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email"
                  />
              </div>
              <div>
                  <label>Password:</label>
                  <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                  />
              </div>
              <button type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
              </button>
          </form>
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
};

export default Login;