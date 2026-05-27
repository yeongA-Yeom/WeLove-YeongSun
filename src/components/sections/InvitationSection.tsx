'use client';

// React 사용
import React from 'react';

// styled-components 사용
import styled from 'styled-components';

// 전체 설정 파일 import
import { weddingConfig } from '../../config/wedding-config';

//////////////////////////////////////////////////////
// Props 타입
//////////////////////////////////////////////////////

interface InvitationSectionProps {

  // 배경색 선택
  bgColor?: 'white' | 'beige';
}

//////////////////////////////////////////////////////
// 초대 메시지 섹션 컴포넌트
//////////////////////////////////////////////////////

const InvitationSection = ({ bgColor = 'white' }: InvitationSectionProps) => {

  // 설정 파일에서 invitation 정보 가져오기
  const { invitation } = weddingConfig;

  //////////////////////////////////////////////////////
  // 신랑 부모 정보 존재 여부 확인
  //////////////////////////////////////////////////////

  const hasGroomFather = Boolean(
      invitation.groom.father &&
      invitation.groom.father.trim() !== ''
  );

  const hasGroomMother = Boolean(
      invitation.groom.mother &&
      invitation.groom.mother.trim() !== ''
  );

  // 부모 중 한 명이라도 있으면 true
  const hasGroomParents = hasGroomFather || hasGroomMother;

  //////////////////////////////////////////////////////
  // 신부 부모 정보 존재 여부 확인
  //////////////////////////////////////////////////////

  const hasBrideFather = Boolean(
      invitation.bride.father &&
      invitation.bride.father.trim() !== ''
  );

  const hasBrideMother = Boolean(
      invitation.bride.mother &&
      invitation.bride.mother.trim() !== ''
  );

  // 부모 중 한 명이라도 있으면 true
  const hasBrideParents = hasBrideFather || hasBrideMother;

  //////////////////////////////////////////////////////
  // 부모 이름 조합 함수
  //////////////////////////////////////////////////////

  const getParentsText = (
      father: string,
      mother: string,
      hasFather: boolean,
      hasMother: boolean
  ): string => {

    // 부모 둘 다 있으면 가운데 점으로 연결
    if (hasFather && hasMother) {

      // 예:
      // 홍길동 · 김영희
      return `${father} · ${mother}`;

    } else if (hasFather) {

      // 아버지만 있으면 아버지 이름만
      return father;

    } else if (hasMother) {

      // 어머니만 있으면 어머니 이름만
      return mother;
    }

    return "";
  };

  //////////////////////////////////////////////////////
  // 신랑측 부모 이름 생성
  //////////////////////////////////////////////////////

  const groomParentsText = getParentsText(
      invitation.groom.father || '',
      invitation.groom.mother || '',
      hasGroomFather,
      hasGroomMother
  );

  //////////////////////////////////////////////////////
  // 신부측 부모 이름 생성
  //////////////////////////////////////////////////////

  const brideParentsText = getParentsText(
      invitation.bride.father || '',
      invitation.bride.mother || '',
      hasBrideFather,
      hasBrideMother
  );

  //////////////////////////////////////////////////////
  // 화면 출력
  //////////////////////////////////////////////////////

  return (

      // 전체 초대 섹션
      <InvitationSectionContainer $bgColor={bgColor}>

        {/* 초대 메시지 */}

        <InvitationMessage>
          {invitation.message}
        </InvitationMessage>

        {/* 신랑/신부 정보 영역 */}

        <CoupleContainer>

          {/* 첫 번째 정보 */}


          <CoupleInfo>

            {/* 부모 정보가 있을 경우 */}
            {hasGroomParents ? (

                <ParentsNames>

                  {/* 부모 이름 */}
                  {groomParentsText}

                  {/* 아들/딸 표시 */}
                  <ParentLabel>
                    의 {invitation.groom.label || "아들"}
                  </ParentLabel>

                </ParentsNames>

            ) : (

                //////////////////////////////////////////////////////
                // 부모 정보 없을 경우
                //////////////////////////////////////////////////////

                <ParentsNames>

                  {/* 기본 표시 */}
                  <ParentLabel>
                    {/*신랑*/}
                  </ParentLabel>

                </ParentsNames>
            )}

            {/* 이름 */}
            <CoupleName>
              {invitation.groom.name}
            </CoupleName>

          </CoupleInfo>


          {/*두 번째 정보*/}


          <CoupleInfo>

            {/* 부모 정보가 있을 경우 */}
            {hasBrideParents ? (

                <ParentsNames>

                  {/* 부모 이름 */}
                  {brideParentsText}

                  {/* 아들/딸 표시 */}
                  <ParentLabel>
                    의 {invitation.bride.label || "딸"}
                  </ParentLabel>

                </ParentsNames>

            ) : (

                //////////////////////////////////////////////////////
                // 부모 정보 없을 경우
                //////////////////////////////////////////////////////

                <ParentsNames>

                  <ParentLabel>

                  </ParentLabel>

                </ParentsNames>
            )}

            {/* 이름 */}
            <CoupleName>
              {invitation.bride.name}
            </CoupleName>

          </CoupleInfo>
        </CoupleContainer>

        💌 사랑하는 딸들 올림 💌
      </InvitationSectionContainer>
  );
};

//////////////////////////////////////////////////////
// styled-components 영역
//////////////////////////////////////////////////////

// 전체 초대 섹션
const InvitationSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
  padding: 4rem 1.5rem;
  text-align: center;

  background-color: ${
    props => props.$bgColor === 'beige'
        ? '#F8F6F2'
        : 'white'
};
`;

// 초대 메시지
const InvitationMessage = styled.p`
  white-space: pre-line;

  line-height: 1.8;

  max-width: 36rem;

  margin: 0 auto 2rem auto;

  font-size: 1rem;
  
  @media (min-width: 768px) {
    font-size: 1.125rem;
  }
`;

// 신랑/신부 영역
const CoupleContainer = styled.div`
  display: flex;

  justify-content: center;

  gap: 2rem;

  flex-wrap: wrap;
  
  @media (min-width: 768px) {
    gap: 4rem;
  }
`;

// 각각의 정보 박스
const CoupleInfo = styled.div`
  text-align: center;
`;

// 부모 이름 텍스트
const ParentsNames = styled.p`
  margin-bottom: 0.25rem;
`;

// "의 아들", "의 딸" 부분
const ParentLabel = styled.span`
  font-size: 0.875rem;

  margin-left: 0.25rem;
`;

// 이름
const CoupleName = styled.p`
  font-size: 1.25rem;

  font-weight: 500;
`;

export default InvitationSection;