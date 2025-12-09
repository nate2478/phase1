import { LoginChannel } from '@/types/user';

// OS 감지 유틸리티
export type OS = 'ios' | 'android' | 'other';

export const detectOS = (): OS => {
  if (typeof window === 'undefined') return 'other';
  
  const userAgent = window.navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) {
    return 'ios';
  } else if (/android/.test(userAgent)) {
    return 'android';
  }
  
  return 'other';
};

// OS별 지원되는 로그인 채널 반환
export const getAvailableLoginChannels = (): LoginChannel[] => {
  const os = detectOS();
  
  if (os === 'ios') {
    return ['kakao', 'apple', 'facebook', 'google'];
  } else if (os === 'android') {
    return ['kakao', 'facebook', 'google'];
  }
  
  // 웹 브라우저의 경우 모든 채널 지원
  return ['kakao', 'apple', 'facebook', 'google'];
};

