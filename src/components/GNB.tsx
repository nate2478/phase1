'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './GNB.module.css';

const GNB = () => {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: '홈', icon: '🏠' },
    { path: '/search', label: '검색', icon: '🔍' },
    { path: '/ranking', label: '랭킹', icon: '📊' },
    { path: '/mypage', label: '마이페이지', icon: '👤' },
  ];

  return (
    <nav className={styles.gnb}>
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default GNB;

