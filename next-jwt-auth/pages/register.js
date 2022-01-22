import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AxiosAPI from '../axiosApi';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
    },
  },
}));

const Register = () => {
  const classes = useStyles();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [errorState, setErrorState] = useState(false);
  const [registerState, setRegisterState] = useState({
    email: '',
    password: '',
  });

  const onTextFieldChange = (e) => {
    setRegisterState({
      ...registerState,
      [e.target.name]: e.target.value,
    });
    // console.log('onTextFieldChange', registerState);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!registerState.email || !registerState.password) {
      setErrorState(true);
      setMessage('Please fill all fields..');
      setTimeout(() => {
        setErrorState(false);
        setMessage('');
      }, 2000);
    } else {
      AxiosAPI.post(`/api/auth/register`, registerState)
        .then((response) => {
          console.log('handleRegister', response);
          const { data, status } = response;
          if (status === 200) {
            setErrorState(false);
            setMessage('Register successfully');
            setTimeout(() => {
              setMessage('');
              setRegisterState({
                email: '',
                password: '',
              });
            }, 2000);

            localStorage.setItem(
              'userLogin',
              JSON.stringify({
                userLogin: true,
                token: data.access_token,
              })
            );
            router.push('/login');
          }
        })
        .catch((error) => {
          console.log(error.response);
          const { data, status, statusText } = error.response;
          if (status === 401) {
            setErrorState(true);
            setMessage(`${data.message}. Please use another`);
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

  return (
    <div>
      <div style={{ marginTop: '100px' }}>
        <h2>Register Page</h2>
        {errorState === true ? (
          <p style={{ color: 'red' }}>{message}</p>
        ) : (
          <p style={{ color: 'green' }}>{message}</p>
        )}
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={handleRegister}
        >
          <TextField
            label="User Email"
            type="text"
            id="username"
            name="email"
            autoComplete="email"
            onChange={(e) => onTextFieldChange(e)}
          />
          <br />
          <TextField
            label="Password"
            type="password"
            id="password"
            name="password"
            autoComplete="password"
            onChange={(e) => onTextFieldChange(e)}
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
          Already have an account then please{' '}
          <Link href="/login">
            <a style={{ color: '#551a8b', textDecoration: 'underline' }}>
              Login
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
