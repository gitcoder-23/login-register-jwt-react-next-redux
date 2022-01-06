import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutInitiate } from './redux/actions/logoutAction';

const Header = () => {
  const { user, error, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutInitiate());
  };

  return (
    <div>
      <header style={{ marginTop: '20px' }}>
        {user ? (
          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        ) : (
          <Link to="/login">
            <Button
              style={{ width: '100px' }}
              variant="contained"
              color="secondary"
            >
              Login
            </Button>
          </Link>
        )}
      </header>
    </div>
  );
};

export default Header;
