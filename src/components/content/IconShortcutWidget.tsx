'use client';

import React from 'react';
import { IconContent } from '@/types/content';
import styles from './IconShortcutWidget.module.css';

interface IconShortcutWidgetProps {
  content: IconContent;
}

const IconShortcutWidget: React.FC<IconShortcutWidgetProps> = ({ content }) => {
  return (
    <div className={styles.iconShortcut}>
      {content.title && <h3 className={styles.title}>{content.title}</h3>}
      <div className={styles.grid}>
        {content.items.map((item) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={() => item.linkUrl && window.open(item.linkUrl, '_blank')}
          >
            <img src={item.iconUrl} alt={item.title} className={styles.icon} />
            <span className={styles.label}>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconShortcutWidget;

