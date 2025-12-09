'use client';

import React from 'react';
import styles from './SubMenu.module.css';

export type SubMenuType = 'recommend' | 'percol' | 'skin' | 'cosmetic';

interface SubMenuProps {
  activeMenu: SubMenuType;
  onMenuChange: (menu: SubMenuType) => void;
}

const SubMenu: React.FC<SubMenuProps> = ({ activeMenu, onMenuChange }) => {
  const menus: { key: SubMenuType; label: string }[] = [
    { key: 'recommend', label: '추천' },
    { key: 'percol', label: '퍼컬매칭' },
    { key: 'skin', label: '스킨매칭' },
    { key: 'cosmetic', label: '화장품매칭' },
  ];

  return (
    <nav className={styles.subMenu}>
      {menus.map((menu) => (
        <button
          key={menu.key}
          className={`${styles.menuItem} ${activeMenu === menu.key ? styles.active : ''}`}
          onClick={() => onMenuChange(menu.key)}
        >
          {menu.label}
        </button>
      ))}
    </nav>
  );
};

export default SubMenu;

