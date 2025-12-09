'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getUserData, clearAuth } from '@/utils/auth';
import SocialLogin from '@/components/SocialLogin';
import { LoginChannel } from '@/types/user';
import { handleSocialLogin } from '@/utils/auth';

export default function MyPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (isAuthenticated()) {
        setAuthenticated(true);
        setUser(getUserData());
      }
    };
    checkAuth();
  }, []);

  const handleLogin = async (channel: LoginChannel) => {
    try {
      // TODO: 실제 소셜 로그인 SDK 연동
      // 여기서는 예시로 임시 토큰 사용
      const mockToken = `mock_${channel}_token_${Date.now()}`;
      await handleSocialLogin(channel, mockToken);
      setAuthenticated(true);
      setUser(getUserData());
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  const handleLogout = () => {
    clearAuth();
    setAuthenticated(false);
    setUser(null);
  };

  if (!authenticated) {
    return (
      <div style={{ padding: '20px' }}>
        <h1>마이페이지</h1>
        <p>로그인이 필요한 페이지입니다.</p>
        <SocialLogin onLogin={handleLogin} />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>마이페이지</h1>
      {user && (
        <div style={{ marginTop: '20px' }}>
          <p>가입 채널: {user.loginChannel}</p>
          {user.email && <p>이메일: {user.email}</p>}
          <p>가입일: {new Date(user.createdAt).toLocaleDateString()}</p>
          <button
            onClick={handleLogout}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

