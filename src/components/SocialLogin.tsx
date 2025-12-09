'use client';

import React from 'react';
import { getAvailableLoginChannels } from '@/utils/osDetector';
import { LoginChannel } from '@/types/user';
import styles from './SocialLogin.module.css';

interface SocialLoginProps {
  onLogin: (channel: LoginChannel) => void;
}

const SocialLogin: React.FC<SocialLoginProps> = ({ onLogin }) => {
  const availableChannels = getAvailableLoginChannels();

  const channelConfig: Record<LoginChannel, { label: string; icon: string; color: string }> = {
    kakao: { label: '카카오', icon: '💬', color: '#FEE500' },
    facebook: { label: '페이스북', icon: '📘', color: '#1877F2' },
    google: { label: '구글', icon: '🔍', color: '#4285F4' },
    apple: { label: '애플', icon: '🍎', color: '#000000' },
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>간편 로그인</h2>
      <div className={styles.buttonGroup}>
        {availableChannels.map((channel) => {
          const config = channelConfig[channel];
          return (
            <button
              key={channel}
              className={styles.loginButton}
              style={{ backgroundColor: config.color }}
              onClick={() => onLogin(channel)}
            >
              <span className={styles.icon}>{config.icon}</span>
              <span className={styles.label}>{config.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLogin;

