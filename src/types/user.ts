// 사용자 타입 정의
export type LoginChannel = 'kakao' | 'facebook' | 'google' | 'apple';

export interface User {
  id: string;
  email?: string;
  loginChannel: LoginChannel;
  createdAt: string;
  token?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

