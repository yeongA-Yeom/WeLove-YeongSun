'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { weddingConfig } from '../../config/wedding-config';

const watermarkId =
    weddingConfig.meta._jwk_watermark_id ||
    'JWK-NonCommercial';

const petalImages = [
    '/images/gallery/bg/bg1.png',
    '/images/gallery/bg/bg2.png',
    '/images/gallery/bg/bg3.png',
    '/images/gallery/bg/bg4.png',
    '/images/gallery/bg/bg5.png',
    '/images/gallery/bg/bg6.png',
    '/images/gallery/bg/bg7.png',
];

type PetalType = {
    id: number;
    image: string;
    left: number;
    duration: number;
    delay: number;
    size: number;
    drift: number;
};

const MainSection = () => {
    const [petals, setPetals] = useState<PetalType[]>([]);
    const [currentImage, setCurrentImage] = useState(0);

    //꽃잎 변경
    useEffect(() => {
        const generatedPetals = Array.from({ length: 28 }).map((_, index) => ({
            id: index,
            image: petalImages[Math.floor(Math.random() * petalImages.length)],
            left: Math.random() * 100,
            duration: 9 + Math.random() * 10,
            delay: Math.random() * 8,
            size: 8 + Math.random() * 12,
            drift: -30 + Math.random() * 80,
        }));

        setPetals(generatedPetals);
    }, []);

    // 이미지 변경
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => {
                return (prev + 1) % weddingConfig.gallery.images.length;
            });
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <MainSectionContainer
            className={`wedding-container jwk-${watermarkId.slice(0, 8)}-main`}
        >
            {/* 배경 이미지 */}
            <BackgroundImage
                src={weddingConfig.gallery.images[currentImage]}
                alt="메인 배경 이미지"
                fill
                priority
                sizes="100vw"
                quality={90}
            />

            {/* 어두운 오버레이 */}
            <Overlay />

            {/* 프리지아 꽃잎 흩날림 */}
            <PetalContainer>
                {petals.map((petal) => (
                    <Petal
                        key={petal.id}
                        style={
                            {
                                left: `${petal.left}%`,
                                width: `${petal.size}px`,
                                height: `${petal.size}px`,
                                animationDuration: `${petal.duration}s`,
                                animationDelay: `${petal.delay}s`,
                                backgroundImage: `url(${petal.image})`,
                                '--drift': `${petal.drift}px`,
                            } as React.CSSProperties
                        }
                    />
                ))}
            </PetalContainer>

            {/* 메인 텍스트 */}
            <MainContent>
                <MainTitle>{weddingConfig.main.title}</MainTitle>
                <DateText>{weddingConfig.main.date}</DateText>
                <VenueText>{weddingConfig.main.venue}</VenueText>
            </MainContent>

            {/* 아래 화살표 */}
            <ScrollIndicator>↓</ScrollIndicator>
        </MainSectionContainer>
    );
};

const MainSectionContainer = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
  text-align: center;
  color: white;
  background: #f8f6f2;
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

  @media (min-width: 768px) and (min-height: 780px) {
    aspect-ratio: 9 / 16;
    max-width: calc(100vh * 9 / 16);
    width: auto;
    margin: 0 auto;
    border-radius: 24px;
    box-shadow: 0 0 32px rgba(0,0,0,0.08);
  }
`;

const BackgroundImage = styled(Image)`
  z-index: 0;

  object-fit: cover;

  object-position: center center;

  animation:
          fadeImage 10s linear;


  @media (min-width: 768px) {

    object-fit: contain;

    background: #f8f6f2;
  }
`;


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

const PetalContainer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 5;
  overflow: hidden;
  pointer-events: none;
`;

const Petal = styled.div`
  position: absolute;
  top: -40%;
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
      transform: translateY(-10vh) translateX(0) rotate(0deg);
      opacity: 0;
    }

    10% {
      opacity: 0.9;
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

const MainContent = styled.div`
  position: absolute;
  top: 6vh;
  left: 50%;
  transform: translateX(-50%);
  z-index: 6;
  width: 100%;
  padding: 0 1rem;
`;

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

const VenueText = styled.p`
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }

  @media (max-width: 450px) {
    font-size: 0.9rem;
  }
`;

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