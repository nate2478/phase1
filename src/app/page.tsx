'use client';

import React, { useState, useEffect } from 'react';
import HomeHeader from '@/components/HomeHeader';
import SubMenu, { SubMenuType } from '@/components/SubMenu';
import ContentRenderer from '@/components/content/ContentRenderer';
import PercolMatching from '@/components/PercolMatching';
import { HomePageConfig } from '@/types/content';
import { PersonalColorType } from '@/types/personalColor';
import styles from './home.module.css';

export default function Home() {
  const [activeMenu, setActiveMenu] = useState<SubMenuType>('recommend');
  const [config, setConfig] = useState<HomePageConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      const response = await fetch('/api/content/home');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('콘텐츠 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderRecommendContent = () => {
    if (!config) return null;

    return (
      <div className={styles.contentArea}>
        {/* 배너 영역 */}
        {config.banners
          .filter((banner) => banner.isActive)
          .sort((a, b) => a.order - b.order)
          .map((banner) => (
            <ContentRenderer key={banner.id} content={banner} />
          ))}

        {/* 아이콘 숏컷 영역 */}
        {config.iconShortcuts
          .filter((icon) => icon.isActive)
          .sort((a, b) => a.order - b.order)
          .map((icon) => (
            <ContentRenderer key={icon.id} content={icon} />
          ))}

        {/* 메인 콘텐츠 영역 */}
        {config.mainContents
          .filter((content) => content.isActive)
          .sort((a, b) => a.order - b.order)
          .map((content) => (
            <ContentRenderer key={content.id} content={content} />
          ))}

        {/* 푸터 영역 */}
        {config.footer
          .filter((footer) => footer.isActive)
          .sort((a, b) => a.order - b.order)
          .map((footer) => (
            <ContentRenderer key={footer.id} content={footer} />
          ))}
      </div>
    );
  };

  const renderMenuContent = () => {
    switch (activeMenu) {
      case 'recommend':
        return renderRecommendContent();
      case 'percol':
        return (
          <PercolMatching
            onComplete={(result: PersonalColorType) => {
              // 결과 저장 및 처리
              console.log('퍼컬매칭 결과:', result);
              // TODO: 결과를 서버에 저장
              alert(`당신의 퍼스널컬러는 ${result}입니다!`);
              setActiveMenu('recommend');
            }}
            onCancel={() => {
              setActiveMenu('recommend');
            }}
          />
        );
      case 'skin':
        return (
          <div className={styles.placeholder}>
            <h2>스킨매칭</h2>
            <p>카메라를 통한 얼굴 진단 기능입니다.</p>
            <p>모공, 여드름, 주름, 유분기 진단 기능은 추후 구현 예정입니다.</p>
          </div>
        );
      case 'cosmetic':
        return (
          <div className={styles.placeholder}>
            <h2>화장품매칭</h2>
            <p>스킨매칭 결과를 기반으로 한 화장품 추천 기능입니다.</p>
            <p>스킨매칭 결과에 따른 화장품 매칭 기능은 추후 구현 예정입니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div>
        <HomeHeader />
        <SubMenu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <div className={styles.loading}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.home}>
      <HomeHeader />
      <SubMenu activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      {renderMenuContent()}
    </div>
  );
}
