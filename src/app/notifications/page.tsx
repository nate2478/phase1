'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './notifications.module.css';

interface Notification {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  linkUrl?: string;
}

export default function Notifications() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // TODO: 실제 API 연동
      // 임시 데이터
      const mockNotifications: Notification[] = [
        {
          id: '1',
          title: '새로운 업데이트',
          message: '새로운 기능이 추가되었습니다.',
          createdAt: new Date().toISOString(),
          isRead: false,
        },
        {
          id: '2',
          title: '이벤트 안내',
          message: '특별 이벤트가 진행 중입니다.',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          isRead: true,
        },
      ];
      setNotifications(mockNotifications);
    } catch (error) {
      console.error('알림 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.linkUrl) {
      router.push(notification.linkUrl);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button onClick={() => router.back()} className={styles.backButton}>
            ← 뒤로
          </button>
          <h1 className={styles.title}>알림</h1>
        </div>
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← 뒤로
        </button>
        <h1 className={styles.title}>알림</h1>
      </div>
      <div className={styles.list}>
        {notifications.length === 0 ? (
          <div className={styles.empty}>알림이 없습니다.</div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${styles.item} ${!notification.isRead ? styles.unread : ''}`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className={styles.content}>
                <h3 className={styles.itemTitle}>{notification.title}</h3>
                <p className={styles.itemMessage}>{notification.message}</p>
                <span className={styles.date}>
                  {new Date(notification.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

