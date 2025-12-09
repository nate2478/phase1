import { NextRequest, NextResponse } from 'next/server';
import { PersonalColorType } from '@/types/personalColor';

// TODO: 실제 데이터베이스 연동
// 퍼컬매칭 결과 저장

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, personalColorType } = body;

    if (!personalColorType) {
      return NextResponse.json(
        { error: '퍼스널컬러 타입이 필요합니다.' },
        { status: 400 }
      );
    }

    // TODO: 실제 DB에 저장
    // 예시:
    // await db.users.update({
    //   where: { id: userId },
    //   data: { personalColorType }
    // });

    return NextResponse.json({
      success: true,
      message: '퍼컬매칭 결과가 저장되었습니다.',
    });
  } catch (error) {
    console.error('결과 저장 에러:', error);
    return NextResponse.json(
      { error: '결과 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

