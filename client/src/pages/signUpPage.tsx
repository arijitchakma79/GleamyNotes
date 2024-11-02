import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setError, setLoading, setUser } from "../store/userActions";
import { TextField, Button, CircularProgress, Typography, Box, Alert, Link} from "@mui/material";
import { emailRegex, usernameRegex, nameRegex, passwordRegex } from "../utils/regex";

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [inputError, setInputError] = useState(''); 

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      setInputError('Invalid email format');
      return;
    }
    if (!usernameRegex.test(username)) {
      setInputError('Invalid username format');
      return;
    }
    if (!nameRegex.test(firstname) || !nameRegex.test(lastname)) {
      setInputError('First or last name is invalid');
      return;
    }
    if (!passwordRegex.test(password)) {
      setInputError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character');
      return;
    }

    if (password !== confirmedPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setPasswordError('');
    setInputError(''); 
    dispatch(setLoading(true));

    try {
      const data = await signup(email, username, firstname, lastname, password);
      dispatch(setUser(data.user));
      localStorage.setItem('token', data.token);
    } catch (err: any) {
      dispatch(setError('Invalid email or password'));
    } finally {
      dispatch(setLoading(false));
      navigate('/verification');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Typography variant="body1">
        Welcome to GleamyNotes, create an account to proceed.
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {inputError && <Alert severity="error">{inputError}</Alert>}
      {passwordError && <Alert severity="error">{passwordError}</Alert>}

      <Box component="form" onSubmit={handleSignUp} sx={{ width: '100%', maxWidth: 400 }}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          margin="normal"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Sign Up'}
        </Button>
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Already have an account?{' '}
            <Link href="/login" underline="hover">
              Log In 
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpPage;
