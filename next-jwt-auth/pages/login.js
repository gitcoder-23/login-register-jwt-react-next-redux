import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AxiosAPI from '../axiosApi';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const Login = (props) => {
  const classes = useStyles();

  const router = useRouter();

  const [message, setMessage] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [loginState, setLoginState] = useState({
    email: '',
    password: '',
  });
  const onTextFieldChange = (e) => {
    setLoginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
    // console.log('onTextFieldChange', loginState);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginState.email || !loginState.password) {
      setErrorState(true);
      setMessage('Please fill all fields..');
      setTimeout(() => {
        setErrorState(false);
        setMessage('');
      }, 2000);
    } else {
      AxiosAPI.post(`/api/auth/login`, loginState)
        .then((response) => {
          console.log('handleLogin', response);
          const { data, status } = response;
          if (status === 200) {
            setErrorState(false);
            setMessage('Login successfully');
            setTimeout(() => {
              setMessage('');
              setLoginState({
                email: '',
                password: '',
              });
            }, 2000);

            localStorage.setItem(
              'userLogin',
              JSON.stringify({
                userLogin: true,
                token: data.access_token,
                userEmail: loginState.email,
              })
            );
            window.location.reload();
            router.push('/');
          }
        })
        .catch((error) => {
          console.log(error.response);
          const { data, status, statusText } = error.response;
          if (status === 401) {
            setErrorState(true);
            setMessage(`${data.message}`);
          }
          if (status === 404) {
            setErrorState(true);
            setMessage(`URL ${statusText}`);
          }

          setTimeout(() => {
            setErrorState(false);
            setMessage('');
          }, 2000);
        });
    }
  };
  // after login

  useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem('userLogin') !== null) {
        const userLocalData = JSON.parse(localStorage.getItem('userLogin'));
        if (userLocalData.userLogin === true) {
          router.push('/');
        }
      }
    }
  }, []);

  return (
    <>
      <div style={{ marginTop: '100px' }}>
        <h2>Login Page</h2>
        {errorState === true ? (
          <p style={{ color: 'red' }}>{message}</p>
        ) : (
          <p style={{ color: 'green' }}>{message}</p>
        )}
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleLogin}
        >
          <TextField
            label="User Email"
            type="text"
            id="email"
            name="email"
            onChange={(e) => onTextFieldChange(e)}
          />
          <br />
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            onChange={(e) => onTextFieldChange(e)}
          />
          <br />
          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            Login
          </Button>
        </form>
        <p>
          Don't have an account then please do{' '}
          <Link href="/register">
            <a style={{ color: '#551a8b', textDecoration: 'underline' }}>
              Register
            </a>
          </Link>{' '}
          yourself
        </p>
      </div>
    </>
  );
};

export default Login;
