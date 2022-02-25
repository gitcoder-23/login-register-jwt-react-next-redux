import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, Link } from 'react-router-dom';
import axiox from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerInitiate,
  setErrorEmpty,
} from './redux/actions/registerAction';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const Register = ({ setLogoutUser }) => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');
  let history = useHistory();

  const { user, error, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const register = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setNotification('Please all the fields');
      setTimeout(() => {
        setNotification('');
      }, 1000);
    } else {
      dispatch(registerInitiate(email, password));
      setNotification('Register successfully');
    }
  };

  useEffect(() => {
    dispatch(setErrorEmpty());
    if (user) {
      history.push('/');
    }
  }, [user]);
  return (
    <div style={{ marginTop: '100px' }}>
      <h2>Register Page</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {notification && <p style={{ color: 'red' }}>{notification}</p>}
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={register}
      >
        <TextField
          id="username"
          label="Username"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button
          style={{ width: '100px' }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Register
        </Button>
      </form>
      <p>
        Already have an account then please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
