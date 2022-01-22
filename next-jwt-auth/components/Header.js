import React from 'react';
import Link from 'next/link';

import { Button } from '@material-ui/core';

const Header = () => {
  return (
    <div className="container text-center mt-4">
      <h2>JWT Authentication using JSON fake server</h2>
      <header style={{ marginTop: '20px' }}>
        <Button
          style={{ width: '100px' }}
          variant="contained"
          color="secondary"
          // onClick={logout}
        >
          Logout
        </Button>

        <Link href="/login">
          <Button
            style={{ width: '100px' }}
            variant="contained"
            color="secondary"
          >
            Login
          </Button>
        </Link>
      </header>
    </div>
  );
};

export default Header;
