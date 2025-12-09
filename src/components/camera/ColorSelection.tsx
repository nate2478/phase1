'use client';

import React from 'react';
import styles from './ColorSelection.module.css';

interface ColorSelectionProps {
  colors: string[];
  selectedColor: string | null;
  onSelect: (color: string, index: number) => void;
}

const ColorSelection: React.FC<ColorSelectionProps> = ({ colors, selectedColor, onSelect }) => {
  if (colors.length === 0) {
    return <div className={styles.loading}>색상 로딩 중...</div>;
  }

  return (
    <div className={styles.container}>
      <p className={styles.label}>색상을 선택해주세요</p>
      <div className={styles.colorGrid}>
        {colors.map((color, index) => (
          <button
            key={index}
            className={`${styles.colorChip} ${
              selectedColor === color ? styles.selected : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onSelect(color, index)}
            aria-label={`색상 ${index + 1} 선택`}
          >
            {selectedColor === color && (
              <span className={styles.checkmark}>✓</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;

