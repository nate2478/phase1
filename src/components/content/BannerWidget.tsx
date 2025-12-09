'use client';

import React from 'react';
import { BannerContent } from '@/types/content';
import styles from './BannerWidget.module.css';

interface BannerWidgetProps {
  content: BannerContent;
}

const BannerWidget: React.FC<BannerWidgetProps> = ({ content }) => {
  const handleClick = () => {
    if (content.linkUrl) {
      window.open(content.linkUrl, '_blank');
    }
  };

  return (
    <div className={styles.banner} onClick={handleClick}>
      <img src={content.imageUrl} alt={content.title || '배너'} className={styles.image} />
      {(content.title || content.description) && (
        <div className={styles.overlay}>
          {content.title && <h3 className={styles.title}>{content.title}</h3>}
          {content.description && <p className={styles.description}>{content.description}</p>}
        </div>
      )}
    </div>
  );
};

export default BannerWidget;

