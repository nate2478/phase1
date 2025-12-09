// 인증 관련 유틸리티
import Cookies from 'js-cookie';
import { User, AuthResponse, LoginChannel } from '@/types/user';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// 토큰 저장
export const setAuthToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, { expires: 30 }); // 30일
};

// 토큰 가져오기
export const getAuthToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

// 사용자 정보 저장
export const setUserData = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// 사용자 정보 가져오기
export const getUserData = (): User | null => {
  if (typeof window === 'undefined') return null;
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

// 로그아웃
export const clearAuth = (): void => {
  Cookies.remove(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// 로그인 상태 확인
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// 간편 로그인 처리
export const handleSocialLogin = async (
  channel: LoginChannel,
  token: string,
  email?: string
): Promise<AuthResponse> => {
  // TODO: 실제 API 호출로 대체
  const response = await fetch('/api/auth/social-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      channel,
      token,
      email,
    }),
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  const data: AuthResponse = await response.json();
  
  // 토큰 및 사용자 정보 저장
  setAuthToken(data.token);
  setUserData(data.user);
  
  return data;
};

