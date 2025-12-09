'use client';

import React from 'react';
import { ListViewContent, ListViewItem } from '@/types/content';
import styles from './ListViewWidget.module.css';

interface ListViewWidgetProps {
  content: ListViewContent;
}

const ListViewWidget: React.FC<ListViewWidgetProps> = ({ content }) => {
  const isGrid = content.layout === 'grid';

  return (
    <div className={styles.listView}>
      {content.title && <h3 className={styles.title}>{content.title}</h3>}
      <div className={`${styles.container} ${isGrid ? styles.grid : styles.list}`}>
        {content.items.map((item: ListViewItem) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={() => item.linkUrl && window.open(item.linkUrl, '_blank')}
          >
            <img src={item.imageUrl} alt={item.title} className={styles.image} />
            <div className={styles.content}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              {item.description && <p className={styles.itemDescription}>{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListViewWidget;

