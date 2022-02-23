import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user, error, loading } = useSelector((state) => state.auth);
  console.log('user->', user);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // const splitData = user.email.split('');
    if (user !== null) {
      const splitData = user.email.split('@');
      console.log('splitData->', splitData[0]);
      setUserName(splitData[0]);
    }
  }, []);

  const userNotLogin = () => (
    <>
      <h2>It seem's like you are not login</h2>
      <h3>
        If you have an account, then please <Link to="/login">Login</Link>
      </h3>
      <h3>
        Don't have an account, then please do{' '}
        <Link to="/register">Register</Link>
      </h3>
    </>
  );
  return (
    <div style={{ marginTop: '100px' }}>
      {/* {user ? (
        <h2>Welcome Back {userName == '' ? 'User' : { userName }}</h2>
      ) : (
        <>{userNotLogin()}</>
      )} */}

      {!user || user === null ? (
        <>{userNotLogin()}</>
      ) : (
        <h2>Welcome Back {userName}</h2>
      )}
    </div>
  );
};

export default Home;
