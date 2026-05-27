'use client';

import React, { useMemo } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';

//////////////////////////////////////////////////////
// 워터마크 ID
//////////////////////////////////////////////////////

const watermarkId =
    weddingConfig.meta._jwk_watermark_id ||
    'JWK-NonCommercial';

//////////////////////////////////////////////////////
// 프리지아 꽃잎 이미지 목록
//////////////////////////////////////////////////////

const petalImages = [
    '/images/gallery/bg/bg1.png',
    '/images/gallery/bg/bg2.png',
    '/images/gallery/bg/bg3.png',
    '/images/gallery/bg/bg4.png',
    '/images/gallery/bg/bg5.png',
    '/images/gallery/bg/bg6.png',
    '/images/gallery/bg/bg7.png',
];

//////////////////////////////////////////////////////
// 메인 첫 화면
//////////////////////////////////////////////////////

const MainSection = () => {

    //////////////////////////////////////////////////////
    // 랜덤 꽃잎 생성
    //////////////////////////////////////////////////////

    const petals = useMemo(() => {

        return Array.from({ length: 28 }).map((_, index) => ({

            id: index,

            image:
                petalImages[
                    Math.floor(Math.random() * petalImages.length)
                    ],

            left: Math.random() * 100,

            duration: 9 + Math.random() * 10,

            delay: Math.random() * 8,

            size: 8 + Math.random() * 12,

            drift: -30 + Math.random() * 80,
        }));

    }, []);

    //////////////////////////////////////////////////////
    // 화면 출력
    //////////////////////////////////////////////////////

    return (

        <MainSectionContainer
            className={`wedding-container jwk-${watermarkId.slice(0, 8)}-main`}
        >

            {/* 배경 이미지 */}
            <BackgroundImage
                src={weddingConfig.main.image}
                alt="메인 배경 이미지"
                fill
                priority
                sizes="100vw"
                quality={90}
            />

            {/* 어두운 오버레이 */}
            <Overlay />

            {/* 프리지아 꽃잎 */}
            <PetalContainer>

                {petals.map((petal) => (

                    <Petal
                        key={petal.id}

                        style={{
                            left: `${petal.left}%`,

                            width: `${petal.size}px`,
                            height: `${petal.size}px`,

                            animationDuration: `${petal.duration}s`,

                            animationDelay: `${petal.delay}s`,

                            backgroundImage: `url(${petal.image})`,

                            ['--drift' as any]: `${petal.drift}px`,
                        }}
                    />
                ))}

            </PetalContainer>

            {/* 메인 텍스트 */}
            <MainContent>

                <MainTitle>
                    {weddingConfig.main.title}
                </MainTitle>

                <DateText>
                    {weddingConfig.main.date}
                </DateText>

                <VenueText>
                    {weddingConfig.main.venue}
                </VenueText>

            </MainContent>

            {/* 아래 화살표 */}
            <ScrollIndicator>
                ↓
            </ScrollIndicator>

        </MainSectionContainer>
    );
};

//////////////////////////////////////////////////////
// styled-components
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// 전체 메인 섹션
//////////////////////////////////////////////////////

const MainSectionContainer = styled.section`
  position: relative;

  width: 100vw;

  height: 100vh;

  min-height: 100vh;

  overflow: hidden;

  text-align: center;

  color: white;

  background: #f8f6f2;

  //////////////////////////////////////////////////////
  // 등장 애니메이션
  //////////////////////////////////////////////////////

  animation: fadeIn 1.8s ease;

  @keyframes fadeIn {

    from {
      opacity: 0;
      transform: translateY(20px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  //////////////////////////////////////////////////////
  // PC 비율 유지
  //////////////////////////////////////////////////////

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
// 배경 이미지
//////////////////////////////////////////////////////

const BackgroundImage = styled(Image)`
  z-index: 0;

  object-fit: cover;

  object-position: center center;

  //////////////////////////////////////////////////////
  // 이미지 등장 애니메이션
  //////////////////////////////////////////////////////

  animation: zoomIn 2.5s ease;

  @keyframes zoomIn {

    from {
      transform: scale(1.08);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  //////////////////////////////////////////////////////
  // PC
  //////////////////////////////////////////////////////

  @media (min-width: 768px) {

    object-fit: contain;

    background: #f8f6f2;
  }
`;

//////////////////////////////////////////////////////
// 어두운 오버레이
//////////////////////////////////////////////////////

const Overlay = styled.div`
  position: absolute;

  inset: 0;

  z-index: 1;

  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.35) 0%,
    rgba(0,0,0,0.08) 35%,
    rgba(0,0,0,0) 60%
  );
`;

//////////////////////////////////////////////////////
// 꽃잎 영역
//////////////////////////////////////////////////////

const PetalContainer = styled.div`
  position: absolute;

  inset: 0;

  overflow: hidden;

  pointer-events: none;

  z-index: 2;
`;

//////////////////////////////////////////////////////
// 프리지아 꽃잎
//////////////////////////////////////////////////////

const Petal = styled.div`
  position: absolute;

  top: -12%;

  background-size: contain;

  background-repeat: no-repeat;

  background-position: center;

  opacity: 0;

  filter: blur(0.1px);

  animation-name: fallingPetal;

  animation-timing-function: linear;

  animation-iteration-count: infinite;

  @keyframes fallingPetal {

    0% {

      transform:
        translateY(-10vh)
        translateX(0)
        rotate(0deg);

      opacity: 0;
    }

    10% {
      opacity: 0.85;
    }

    50% {

      transform:
        translateY(55vh)
        translateX(calc(var(--drift) / 2))
        rotate(180deg);

      opacity: 0.75;
    }

    100% {

      transform:
        translateY(115vh)
        translateX(var(--drift))
        rotate(360deg);

      opacity: 0;
    }
  }
`;

//////////////////////////////////////////////////////
// 메인 텍스트 영역
//////////////////////////////////////////////////////

const MainContent = styled.div`
  position: absolute;

  top: 7vh;

  left: 50%;

  transform: translateX(-50%);

  width: 100%;

  padding: 0 1rem;

  z-index: 3;

  @media (max-width: 450px) {

    top: 6vh;
  }

  @media (min-width: 768px) {

    top: 6vh;
  }
`;

//////////////////////////////////////////////////////
// 메인 제목
//////////////////////////////////////////////////////

const MainTitle = styled.h1`
  font-family:
    'PlayfairDisplay',
    'Times New Roman',
    serif;

  font-size: 3rem;

  font-weight: 400;

  letter-spacing: 2px;

  line-height: 1.2;

  margin-bottom: 1rem;

  @media (max-width: 768px) {

    font-size: 2.5rem;
  }

  @media (max-width: 450px) {

    font-size: 2rem;
  }

  @media (max-width: 360px) {

    font-size: 1.8rem;
  }
`;

//////////////////////////////////////////////////////
// 날짜
//////////////////////////////////////////////////////

const DateText = styled.p`
  font-size: 1.25rem;

  margin-bottom: 0.5rem;

  @media (max-width: 768px) {

    font-size: 1.15rem;
  }

  @media (max-width: 450px) {

    font-size: 1rem;
  }
`;

//////////////////////////////////////////////////////
// 장소 / 문구
//////////////////////////////////////////////////////

const VenueText = styled.p`
  font-size: 1rem;

  @media (max-width: 768px) {

    font-size: 0.95rem;
  }

  @media (max-width: 450px) {

    font-size: 0.9rem;
  }
`;

//////////////////////////////////////////////////////
// 아래 화살표
//////////////////////////////////////////////////////

const ScrollIndicator = styled.div`
  position: absolute;

  left: 50%;

  bottom: 2rem;

  transform: translateX(-50%);

  z-index: 3;

  font-size: 1.5rem;

  opacity: 0.9;

  animation: bounce 2s infinite;

  @keyframes bounce {

    0%, 20%, 50%, 80%, 100% {

      transform:
        translateX(-50%)
        translateY(0);
    }

    40% {

      transform:
        translateX(-50%)
        translateY(-10px);
    }

    60% {

      transform:
        translateX(-50%)
        translateY(-5px);
    }
  }
`;

export default MainSection;