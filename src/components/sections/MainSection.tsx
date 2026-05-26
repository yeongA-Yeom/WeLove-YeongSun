'use client';

// React 사용
import React from 'react';

// styled-components 사용
import styled from 'styled-components';

// Next.js 이미지 최적화 컴포넌트
import Image from 'next/image';

// 전체 설정 파일 import
import { weddingConfig } from '../../config/wedding-config';

// 워터마크 ID (템플릿 식별용)
const watermarkId = weddingConfig.meta._jwk_watermark_id || 'JWK-NonCommercial';

// 메인 첫 화면 컴포넌트
const MainSection = () => {
    return (
        // 전체 메인 화면 영역
        <MainSectionContainer className={`wedding-container jwk-${watermarkId.slice(0, 8)}-main`}>

            {/* 배경 이미지 */}
            <BackgroundImage
                src={weddingConfig.main.image} // 설정파일의 메인 이미지
                alt="웨딩 배경 이미지"
                fill
                priority
                sizes="100vw"
                quality={90}
                style={{ objectFit: 'cover', objectPosition: 'center 10%' }}
            />

            {/* 어둡게 덮는 오버레이 */}
            <Overlay />

            {/* 중앙 텍스트 영역 */}
            <MainContent>

                {/* 메인 제목 */}
                {/* 예: ❤️축 퇴 직❤️ */}
                <MainTitle>
                    {weddingConfig.main.title}
                </MainTitle>

                {/* 날짜 */}
                {/* 예: 2026년 5월 16일 */}
                <DateText>
                    {weddingConfig.main.date}
                </DateText>

                {/* 장소 or 한줄 문구 */}
                {/* 예: 사랑하는 엄마의 새로운 시작 */}
                <VenueText>
                    {weddingConfig.main.venue}
                </VenueText>

            </MainContent>

            {/* 아래로 스크롤 유도 아이콘 */}
            <ScrollIndicator>
                <i className="fas fa-chevron-down"></i>
            </ScrollIndicator>
        </MainSectionContainer>
    );
};

//////////////////////////////////////////////////////
// 전체 메인 섹션 스타일
//////////////////////////////////////////////////////

const MainSectionContainer = styled.section`
  position: relative;
  height: 100vh; // 화면 전체 높이
  min-height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: start;

  padding-top: 3.5vh;

  text-align: center;
  color: white;

  overflow: hidden;

  background: #f8f6f2;

  /* 태블릿 이상에서는 9:16 비율 유지 */
  @media (min-width: 768px) and (min-height: 780px) {
    aspect-ratio: 9 / 16;

    max-width: calc(100vh * 9 / 16);

    width: auto;

    margin: 0 auto;

    border-radius: 24px;

    box-shadow: 0 0 32px rgba(0,0,0,0.08);
  }
`;

//////////////////////////////////////////////////////
// 배경 이미지 스타일
//////////////////////////////////////////////////////

const BackgroundImage = styled(Image)`
  z-index: 0;
`;

//////////////////////////////////////////////////////
// 검정 그라데이션 오버레이
//////////////////////////////////////////////////////

const Overlay = styled.div`
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  /* 위쪽은 어둡고 아래는 투명 */
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.4) 0%,
    rgba(0,0,0,0) 40%
  );

  z-index: 1;
`;

//////////////////////////////////////////////////////
// 텍스트 영역
//////////////////////////////////////////////////////

const MainContent = styled.div`
  position: relative;

  z-index: 2;

  margin-top: 0.5vh;

  @media (max-width: 600px) {
    margin-top: 0.5vh;

    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

//////////////////////////////////////////////////////
// 메인 제목 스타일
//////////////////////////////////////////////////////

const MainTitle = styled.h1`
  /* 폰트 */
  font-family: 'PlayfairDisplay', 'Times New Roman', serif;

  /* 이탤릭 */
  font-style: normal;

  /* 글자 크기 */
  font-size: 3rem;

  min-height: 3rem;

  /* 글자 간격 */
  letter-spacing: 2px;

  /* 아래 여백 */
  margin-bottom: 1rem;

  font-weight: 400;

  line-height: 1.2;

  //////////////////////////////////////////////////////
  // 반응형 스타일
  //////////////////////////////////////////////////////

  /* 화면 높이가 작을 때 */
  @media (min-width: 769px) and (max-height: 700px) {
    letter-spacing: 1.5px;
    margin-bottom: 0.8rem;
  }

  @media (min-width: 769px) and (max-height: 600px) {
    letter-spacing: 1px;
    margin-bottom: 0.6rem;
  }

  /* 태블릿 이하 */
  @media (max-width: 768px) {
    font-size: 2.5rem;
    min-height: 2.5rem;
  }

  /* 모바일 */
  @media (max-width: 450px) {
    font-size: 2rem;
    min-height: 2rem;
    letter-spacing: 1.5px;
  }

  /* 작은 모바일 */
  @media (max-width: 360px) {
    font-size: 1.8rem;
    min-height: 1.8rem;
    letter-spacing: 1px;
  }

  /* 초소형 모바일 */
  @media (max-width: 295px) {
    font-size: 1.6rem;
    min-height: 1.6rem;
    letter-spacing: 0.5px;
  }
`;

//////////////////////////////////////////////////////
// 날짜 텍스트 스타일
//////////////////////////////////////////////////////

const DateText = styled.p`
  font-size: 1.25rem;

  margin-bottom: 0.5rem;

  /* 모바일 대응 */
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 450px) {
    font-size: 1.1rem;
  }

  @media (max-width: 360px) {
    font-size: 1rem;
  }

  @media (max-width: 295px) {
    font-size: 0.9rem;
  }
`;

//////////////////////////////////////////////////////
// 장소 / 한줄 문구 스타일
//////////////////////////////////////////////////////

const VenueText = styled.p`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 450px) {
    font-size: 0.9rem;
  }

  @media (max-width: 360px) {
    font-size: 0.85rem;
  }

  @media (max-width: 295px) {
    font-size: 0.75rem;
  }
`;

//////////////////////////////////////////////////////
// 아래 화살표 애니메이션
//////////////////////////////////////////////////////

const ScrollIndicator = styled.div`
  position: absolute;

  bottom: 2rem;

  left: 50%;

  transform: translateX(-50%);

  z-index: 2;

  animation: bounce 2s infinite;

  /* 위아래 움직이는 애니메이션 */
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }

    40% {
      transform: translateX(-50%) translateY(-20px);
    }

    60% {
      transform: translateX(-50%) translateY(-10px);
    }
  }
`;

//////////////////////////////////////////////////////
// 숨겨진 워터마크
//////////////////////////////////////////////////////

const HiddenWatermark = styled.span`
  position: absolute;

  opacity: 0.01;

  font-size: 1px;

  color: rgba(255, 255, 255, 0.01);

  pointer-events: none;

  user-select: none;

  z-index: -9999;

  bottom: 0;
  right: 0;
`;

export default MainSection;