import { NextRequest, NextResponse } from 'next/server';
import { Tone, Season, DetailType, PersonalColorType } from '@/types/personalColor';

// TODO: 실제 백오피스 API 연동
// 백오피스에서 관리하는 색상코드 조회

interface ColorRequest {
  step: number;
  tone?: Tone;
  season?: Season;
  detailType?: DetailType;
}

export async function POST(request: NextRequest) {
  try {
    const body: ColorRequest = await request.json();
    const { step, tone, season } = body;

    // 실제로는 백오피스에서 해당 조건에 맞는 색상코드를 랜덤으로 반환
    // 여기서는 예시 색상코드 반환

    let colors: string[] = [];

    if (step === 1) {
      // 1단계: 웜톤 2개, 쿨톤 2개 랜덤 배열
      const warmColors = [
        '#FF6B6B', '#FF8E53', '#FFB347', '#FFD93D',
        '#FFA07A', '#FF7F50', '#FF6347', '#FF4500',
      ];
      const coolColors = [
        '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
        '#74B9FF', '#0984E3', '#6C5CE7', '#A29BFE',
      ];
      
      // 랜덤으로 2개씩 선택
      const selectedWarm = shuffleArray(warmColors).slice(0, 2);
      const selectedCool = shuffleArray(coolColors).slice(0, 2);
      colors = shuffleArray([...selectedWarm, ...selectedCool]);
    } else if (step === 2) {
      // 2단계: 1단계 결과에 따라 계절 색상
      if (tone === 'warm') {
        // 봄 2개, 가을 2개
        const springColors = [
          '#FFB6C1', '#FFC0CB', '#FFD700', '#FFA500',
          '#FF69B4', '#FF1493', '#FF6347', '#FF4500',
        ];
        const autumnColors = [
          '#CD853F', '#D2691E', '#B8860B', '#8B4513',
          '#A0522D', '#654321', '#8B6914', '#6B4423',
        ];
        const selectedSpring = shuffleArray(springColors).slice(0, 2);
        const selectedAutumn = shuffleArray(autumnColors).slice(0, 2);
        colors = shuffleArray([...selectedSpring, ...selectedAutumn]);
      } else if (tone === 'cool') {
        // 여름 2개, 겨울 2개
        const summerColors = [
          '#87CEEB', '#B0E0E6', '#E0E6E6', '#F0F8FF',
          '#AFEEEE', '#B0C4DE', '#C8E6C9', '#E1F5FE',
        ];
        const winterColors = [
          '#000080', '#191970', '#0000CD', '#4169E1',
          '#0000FF', '#1E90FF', '#00BFFF', '#87CEFA',
        ];
        const selectedSummer = shuffleArray(summerColors).slice(0, 2);
        const selectedWinter = shuffleArray(winterColors).slice(0, 2);
        colors = shuffleArray([...selectedSummer, ...selectedWinter]);
      }
    } else if (step === 3) {
      // 3단계: 세부 타입 결정 (3가지 색상)
      if (season === 'winter') {
        // 겨울: 딥, 브라이트, 트루
        colors = [
          '#000080', // 딥
          '#00BFFF', // 브라이트
          '#4169E1', // 트루
        ];
      } else if (season === 'spring') {
        colors = [
          '#FFB6C1', // 라이트
          '#FF69B4', // 트루
          '#FFD700', // 브라이트
        ];
      } else if (season === 'summer') {
        colors = [
          '#E0E6E6', // 뮤트
          '#B0E0E6', // 라이트
          '#87CEEB', // 트루
        ];
      } else if (season === 'autumn') {
        colors = [
          '#8B4513', // 딥
          '#CD853F', // 뮤트
          '#D2691E', // 트루
        ];
      }
    }

    return NextResponse.json({ colors });
  } catch (error) {
    console.error('색상 조회 에러:', error);
    return NextResponse.json(
      { error: '색상을 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

