'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './HomeHeader.module.css';

const HomeHeader: React.FC = () => {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleNotificationClick = () => {
    router.push('/notifications');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoText}>Phase1</span>
      </div>
      <div className={styles.actions}>
        <button
          className={styles.iconButton}
          onClick={handleSearchClick}
          aria-label="검색"
        >
          <span className={styles.icon}>🔍</span>
        </button>
        <button
          className={styles.iconButton}
          onClick={handleNotificationClick}
          aria-label="알림"
        >
          <span className={styles.icon}>🔔</span>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;

