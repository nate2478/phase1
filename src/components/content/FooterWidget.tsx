'use client';

import React from 'react';
import { FooterContent } from '@/types/content';
import styles from './FooterWidget.module.css';

interface FooterWidgetProps {
  content: FooterContent;
}

const FooterWidget: React.FC<FooterWidgetProps> = ({ content }) => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        {content.links.map((link) => (
          <a
            key={link.id}
            href={link.linkUrl}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.title}
          </a>
        ))}
      </div>
      {content.copyright && (
        <div className={styles.copyright}>{content.copyright}</div>
      )}
    </footer>
  );
};

export default FooterWidget;

