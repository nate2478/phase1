import { NextRequest, NextResponse } from 'next/server';
import { LoginChannel } from '@/types/user';

// TODO: 실제 데이터베이스 연동
// 임시로 메모리에 저장 (실제로는 DB 사용)
const users: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { channel, token, email } = body;

    if (!channel || !token) {
      return NextResponse.json(
        { error: '필수 파라미터가 없습니다.' },
        { status: 400 }
      );
    }

    // TODO: 실제 소셜 로그인 토큰 검증
    // 여기서는 예시로 간단히 처리

    // 기존 사용자 확인 또는 새 사용자 생성
    let user = users.find((u) => u.loginChannel === channel && u.token === token);

    if (!user) {
      user = {
        id: `user_${Date.now()}`,
        email: email || undefined,
        loginChannel: channel as LoginChannel,
        createdAt: new Date().toISOString(),
        token: token,
      };
      users.push(user);
    }

    // 인증 토큰 생성 (실제로는 JWT 등 사용)
    const authToken = `auth_${user.id}_${Date.now()}`;

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        loginChannel: user.loginChannel,
        createdAt: user.createdAt,
      },
      token: authToken,
    });
  } catch (error) {
    console.error('로그인 에러:', error);
    return NextResponse.json(
      { error: '로그인 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

