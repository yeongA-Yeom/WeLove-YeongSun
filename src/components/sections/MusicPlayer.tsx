'use client';

import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const MusicPlayer = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // 모바일/브라우저 자동재생 제한 때문에
    // 첫 클릭/터치가 발생하면 음악 재생 시도
    useEffect(() => {
        const startMusic = async () => {
            try {
                if (audioRef.current) {
                    await audioRef.current.play();
                    setIsPlaying(true);
                }
            } catch {
                console.log('자동재생이 제한되었습니다.');
            }

            window.removeEventListener('click', startMusic);
            window.removeEventListener('touchstart', startMusic);
        };

        window.addEventListener('click', startMusic);
        window.addEventListener('touchstart', startMusic);

        return () => {
            window.removeEventListener('click', startMusic);
            window.removeEventListener('touchstart', startMusic);
        };
    }, []);

    // 버튼 클릭 시 재생/정지
    const toggleMusic = async () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            try {
                await audioRef.current.play();
                setIsPlaying(true);
            } catch {
                console.log('음악 재생 실패');
            }
        }
    };

    return (
        <>
            <audio ref={audioRef} loop preload="auto">
                <source src="/music/backgroundMusic.mp3" type="audio/mpeg" />
            </audio>

            <MusicButton onClick={toggleMusic} $isPlaying={isPlaying}>
                <Icon $isPlaying={isPlaying}>
                    {isPlaying ? '🌼' : '🔇'}
                </Icon>
                <Label>{isPlaying ? 'BGM ON' : 'BGM OFF'}</Label>
            </MusicButton>
        </>
    );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const MusicButton = styled.button<{ $isPlaying: boolean }>`
  position: fixed;
  right: 1.2rem;
  bottom: 1.2rem;

  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 0.4rem;

  padding: 0.55rem 0.75rem;

  border: none;
  border-radius: 999px;

  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(10px);

  color: #6b4f3f;
  font-size: 0.8rem;

  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);

  cursor: pointer;

  opacity: ${({ $isPlaying }) => ($isPlaying ? 1 : 0.75)};

  transition:
    opacity 0.2s ease,
    transform 0.2s ease;

  &:active {
    transform: scale(0.96);
  }
`;

const Icon = styled.span<{ $isPlaying: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  font-size: 1.05rem;

  animation: ${({ $isPlaying }) => ($isPlaying ? rotate : 'none')} 4s linear infinite;
`;

const Label = styled.span`
  font-size: 0.75rem;
  white-space: nowrap;
`;

export default MusicPlayer;