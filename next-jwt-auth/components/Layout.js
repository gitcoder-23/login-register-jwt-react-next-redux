import React from 'react';
import Header from './Header';
import styles from '../styles/Home.module.css';

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      {children}
    </div>
  );
}

export default Layout;
