'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { weddingConfig } from '../../config/wedding-config';

// 이 섹션에서 받을 수 있는 props 타입
// bgColor 값에 따라 배경색을 white / beige 중 선택
interface DateSectionProps {
  bgColor?: 'white' | 'beige';
}

const DateSection = ({ bgColor = 'white' }: DateSectionProps) => {
  // 디데이 카운트다운에 표시할 남은 시간 상태값
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 목표 날짜가 이미 지났는지 여부
  const [isWeddingPassed, setIsWeddingPassed] = useState(false);

  // 달력 생성 로직
  const generateCalendar = () => {
    // 설정 파일에서 년/월/일 가져오기
    const { year, month, day } = weddingConfig.date;

    // 해당 월의 첫째 날과 마지막 날 계산
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const startDayOfWeek = firstDay.getDay(); // 0 = 일요일, 1 = 월요일, ...
    const daysInMonth = lastDay.getDate();

    const calendarDays = [];

    // 달력 첫 주에서 시작 요일 전까지 빈 칸 추가
    for (let i = 0; i < startDayOfWeek; i++) {
      calendarDays.push(<div key={`empty-${i}`}></div>);
    }

    // 실제 날짜들 추가
    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(year, month - 1, date);
      const dayOfWeek = currentDate.getDay();

      // 설정한 기념일인지 확인
      // 기존 이름은 WeddingDay지만 퇴직기념일 표시용으로 그대로 써도 됨
      const isWeddingDay = date === day;

      // 주말 색상 구분용 값
      let weekendType: string | undefined;
      if (dayOfWeek === 0) weekendType = 'sun';
      else if (dayOfWeek === 6) weekendType = 'sat';

      if (isWeddingDay) {
        // 기념일 날짜는 동그라미로 강조
        calendarDays.push(
            <WeddingDay key={date}>{date}</WeddingDay>
        );
      } else {
        // 일반 날짜
        calendarDays.push(
            <Day key={date} $isWeekend={weekendType}>
              {date}
            </Day>
        );
      }
    }

    return calendarDays;
  };

  useEffect(() => {
    // 현재 시간 기준으로 목표 날짜까지 남은 시간 계산
    const calculateTimeLeft = () => {
      const weddingDate = new Date(
          weddingConfig.date.year,
          weddingConfig.date.month - 1,
          weddingConfig.date.day,
          weddingConfig.date.hour,
          weddingConfig.date.minute
      );

      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        // 밀리초를 일/시/분/초로 변환
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsWeddingPassed(false);
      } else {
        // 목표 날짜가 지났으면 카운트다운 숨김
        setIsWeddingPassed(true);
      }
    };

    // 처음 한 번 계산
    calculateTimeLeft();

    // 이후 1초마다 갱신
    const timer = setInterval(calculateTimeLeft, 1000);

    // 컴포넌트가 사라질 때 타이머 정리
    return () => clearInterval(timer);
  }, []);

  return (
      <DateSectionContainer $bgColor={bgColor}>
        {/* 섹션 제목 */}
        <SectionTitle>일정</SectionTitle>

        {/* 달력 영역 */}
        <CalendarCard>
          <CalendarHeader>
            {/* 달력 상단 년월 표시 */}
            <span>{weddingConfig.date.year}년 {weddingConfig.date.month}월</span>

            {/* 이전/다음 버튼 UI만 있음. 실제 월 이동 기능은 아직 없음 */}
            <div>
              <button aria-label="이전 달"><i className="fas fa-chevron-left"></i></button>
              <button aria-label="다음 달"><i className="fas fa-chevron-right"></i></button>
            </div>
          </CalendarHeader>

          <CalendarGrid>
            {/* 요일 헤더 */}
            <DayName $isWeekend="sun">일</DayName>
            <DayName>월</DayName>
            <DayName>화</DayName>
            <DayName>수</DayName>
            <DayName>목</DayName>
            <DayName>금</DayName>
            <DayName $isWeekend="sat">토</DayName>

            {/* 실제 달력 날짜 */}
            {generateCalendar()}
          </CalendarGrid>
        </CalendarCard>

        {/* 목표 날짜가 지나지 않았을 때만 카운트다운 표시 */}
        {!isWeddingPassed && (
            <CountdownContainer>
              <CountdownTitle>엄마의 새로운 시작까지</CountdownTitle>

              <CountdownWrapper>
                <CountdownItem>
                  <CountdownValue>{timeLeft.days} 일</CountdownValue>
                </CountdownItem>
              </CountdownWrapper>
            </CountdownContainer>
        )}

        {/* 하단 날짜 텍스트 */}
        <WeddingDate>
          {weddingConfig.main.date}
        </WeddingDate>
      </DateSectionContainer>
  );
};

// 전체 일정 섹션 컨테이너
const DateSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  text-align: center;
  background-color: ${props => props.$bgColor === 'beige' ? '#F8F6F2' : 'white'};
`;

// 섹션 제목
const SectionTitle = styled.h2`
  position: relative;
  display: inline-block;
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1.5rem;

  /*
  &::after {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--secondary-color);
  }*/
`;

// 달력 카드 박스
const CalendarCard = styled.div`
  background-color: white;
  border-radius: 40px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
`;

// 달력 상단 년월/버튼 영역
const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-family: 'dday', 'Noto Serif KR', serif;
  font-size: 1.5rem;

  div {
    display: none;
  }
`;

// 달력 7열 그리드
const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  text-align: center;
`;

// 요일 텍스트
const DayName = styled.div<{ $isWeekend?: string }>`
  color: ${props =>
      props.$isWeekend === 'sun' ? '#e57373' :
          props.$isWeekend === 'sat' ? '#64b5f6' :
              'inherit'
  };
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

// 일반 날짜
const Day = styled.div<{ $isWeekend?: string }>`
  color: ${props =>
      props.$isWeekend === 'sun' ? '#e57373' :
          props.$isWeekend === 'sat' ? '#64b5f6' :
              'inherit'
  };
  padding: 0.5rem 0;
  font-size: 0.875rem;
`;

// 강조 날짜
const WeddingDay = styled.div`
  background-color: var(--secondary-color);
  color: white;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 0.875rem;
`;

// 카운트다운 전체 영역
const CountdownContainer = styled.div`
  margin: 1rem 0 0.5rem 0;
  width: 100%;

  @media (max-width: 600px) {
    overflow-x: hidden;
  }
`;

// 카운트다운 제목
const CountdownTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
  font-weight: 500;
`;

// 카운트다운 숫자들을 가로로 배치하는 영역
const CountdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
  min-width: fit-content;
  margin: 0 auto;

  @media (max-width: 400px) {
    transform: scale(0.95);
    transform-origin: center center;
  }

  @media (max-width: 370px) {
    transform: scale(0.8);
    transform-origin: center center;
  }

  @media (max-width: 340px) {
    transform: scale(0.65);
    transform-origin: center center;
  }

  @media (max-width: 300px) {
    transform: scale(0.5);
    transform-origin: center center;
  }
`;

// 일/시간/분/초 각각의 박스
const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;

  @media (max-width: 480px) {
    padding: 0 0.75rem;
  }
`;

// 카운트다운 숫자
const CountdownValue = styled.div`
  font-size: 2rem;
  font-weight: 500;
  color: var(--secondary-color);
  font-family: 'dday', 'Noto Serif KR', serif;
  min-width: 3rem;
  text-align: center;
  display: inline-block;

  @media (max-width: 480px) {
    font-size: 1.85rem;
    min-width: 2.5rem;
  }
`;

// 일/시간/분/초 라벨
const CountdownLabel = styled.div`
  font-size: 0.875rem;
  color: var(--text-medium);
  margin-top: 0.25rem;
  white-space: nowrap;
`;

// 카운트다운 사이 세로 구분선
const VerticalDivider = styled.div`
  height: 4.5rem;
  width: 1px;
  min-width: 1px;
  flex-shrink: 0;
  background-color: var(--secondary-color);
  margin: 0 0.75rem;
  opacity: 0.8;

  @media (max-width: 480px) {
    height: 3.75rem;
    margin: 0 0.25rem;
    width: 0.5px;
  }
`;

// 하단 날짜 텍스트
const WeddingDate = styled.p`
  font-size: 1.1rem;
  margin-top: 0.7rem;
  line-height: 1.3;
`;

export default DateSection;