import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button } from '@material-ui/core';

const Header = () => {
  const router = useRouter();

  const [afterLogin, setAfterLogin] = useState('');
  const [logoutState, setLogoutState] = useState(false);
  const logout = () => {
    localStorage.removeItem('userLogin');
    setLogoutState(true);
    router.push('/login');
  };
  const afterLoginCall = () => {
    // const userTokenData = JSON.parse(localStorage.getItem('userLogin'));
    // console.log('userTokenData', userTokenData?.userLogin);
    // setAfterLogin(userTokenData);

    if (localStorage.hasOwnProperty('userLogin')) {
      let value = localStorage.getItem('userLogin');
      try {
        value = JSON.parse(value);
        setAfterLogin(value);
      } catch (e) {
        setAfterLogin('');
      }
    }
  };

  useEffect(() => {
    afterLoginCall();
  }, []);

  return (
    <div className="container text-center mt-4">
      <h2>JWT Authentication using JSON fake server</h2>
      <header style={{ marginTop: '20px' }}>
        {!logoutState && afterLogin && afterLogin.userLogin ? (
          <>
            <Button
              style={{ width: '100px' }}
              variant="contained"
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button
                style={{ width: '100px' }}
                variant="contained"
                color="secondary"
              >
                Login
              </Button>
            </Link>
          </>
        )}
      </header>
    </div>
  );
};

export default Header;
