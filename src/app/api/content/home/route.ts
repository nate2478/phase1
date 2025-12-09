import { NextRequest, NextResponse } from 'next/server';
import { HomePageConfig, Content } from '@/types/content';

// TODO: 실제 백오피스 API 연동
// 임시로 더미 데이터 반환
export async function GET(request: NextRequest) {
  try {
    // 실제로는 백오피스에서 동적으로 콘텐츠를 가져와야 함
    const config: HomePageConfig = {
      banners: [
        {
          id: 'banner1',
          type: 'banner',
          position: 'header',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          imageUrl: 'https://via.placeholder.com/800x200',
          linkUrl: '#',
          title: '메인 배너',
          description: '메인 배너 설명',
        },
      ],
      iconShortcuts: [
        {
          id: 'icons1',
          type: 'icon',
          position: 'main',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          iconUrl: '',
          title: '빠른 메뉴',
          items: [
            { id: 'icon1', iconUrl: 'https://via.placeholder.com/56', title: '메뉴1', linkUrl: '#' },
            { id: 'icon2', iconUrl: 'https://via.placeholder.com/56', title: '메뉴2', linkUrl: '#' },
            { id: 'icon3', iconUrl: 'https://via.placeholder.com/56', title: '메뉴3', linkUrl: '#' },
            { id: 'icon4', iconUrl: 'https://via.placeholder.com/56', title: '메뉴4', linkUrl: '#' },
          ],
        },
      ],
      mainContents: [
        {
          id: 'list1',
          type: 'listview',
          position: 'main',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          title: '추천 콘텐츠',
          layout: 'grid',
          items: [
            {
              id: 'item1',
              imageUrl: 'https://via.placeholder.com/150',
              title: '콘텐츠 1',
              description: '설명 1',
              linkUrl: '#',
            },
            {
              id: 'item2',
              imageUrl: 'https://via.placeholder.com/150',
              title: '콘텐츠 2',
              description: '설명 2',
              linkUrl: '#',
            },
          ],
        },
      ],
      footer: [
        {
          id: 'footer1',
          type: 'footer',
          position: 'footer',
          order: 1,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          links: [
            { id: 'link1', title: '이용약관', linkUrl: '#' },
            { id: 'link2', title: '개인정보처리방침', linkUrl: '#' },
            { id: 'link3', title: '고객센터', linkUrl: '#' },
          ],
          copyright: '© 2025 Phase1. All rights reserved.',
        },
      ],
    };

    return NextResponse.json(config);
  } catch (error) {
    console.error('콘텐츠 조회 에러:', error);
    return NextResponse.json(
      { error: '콘텐츠를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

