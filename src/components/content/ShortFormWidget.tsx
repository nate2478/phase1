'use client';

import React, { useState, useRef } from 'react';
import { ShortFormContent } from '@/types/content';
import styles from './ShortFormWidget.module.css';

interface ShortFormWidgetProps {
  content: ShortFormContent;
}

const ShortFormWidget: React.FC<ShortFormWidgetProps> = ({ content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={styles.shortForm}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef}
          src={content.videoUrl}
          poster={content.thumbnailUrl}
          className={styles.video}
          loop
          muted
        />
        <button className={styles.playButton} onClick={handlePlay}>
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>
      {(content.title || content.description) && (
        <div className={styles.info}>
          {content.title && <h3 className={styles.title}>{content.title}</h3>}
          {content.description && <p className={styles.description}>{content.description}</p>}
        </div>
      )}
    </div>
  );
};

export default ShortFormWidget;

