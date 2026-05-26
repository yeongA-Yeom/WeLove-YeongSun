'use client';

// React hook import
import React, { useEffect, useRef, useState } from 'react';

// styled-components 사용
import styled from 'styled-components';

// Next.js dynamic import
// 현재 코드에서는 사용하지 않고 있음
import dynamic from 'next/dynamic';

// 설정 파일 import
import { weddingConfig } from '../../config/wedding-config';

// window 객체에 naver 속성이 있다는 것을 TypeScript에 알려줌
declare global {
  interface Window {
    naver: any;
  }
}

// 텍스트에 들어있는 \n 줄바꿈을 실제 <br /> 태그로 변환하는 함수
const formatTextWithLineBreaks = (text: string) => {
  return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
  ));
};

// 컴포넌트 props 타입
interface VenueSectionProps {
  // 배경색 선택
  bgColor?: 'white' | 'beige';
}

// 장소 안내 섹션
const VenueSection = ({ bgColor = 'white' }: VenueSectionProps) => {
  // 네이버 지도가 들어갈 div 참조
  const mapRef = useRef<HTMLDivElement>(null);

  // 네이버 지도 스크립트 로드 여부
  const [mapLoaded, setMapLoaded] = useState(false);

  // 지도 로딩 디버깅용 문구
  const [debugInfo, setDebugInfo] = useState<string>('');

  // 지도 오류 여부
  const [mapError, setMapError] = useState(false);

  // 배차 안내 펼침/접기 상태
  const [expandedShuttle, setExpandedShuttle] = useState<'groom' | 'bride' | null>(null);

  // 배차 안내 펼침/접기 토글 함수
  const toggleShuttle = (shuttle: 'groom' | 'bride') => {
    if (expandedShuttle === shuttle) {
      setExpandedShuttle(null);
    } else {
      setExpandedShuttle(shuttle);
    }
  };

  // 네이버 지도 Client ID 일부를 디버그 문구로 저장
  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || '';
    const debug = `클라이언트 ID: ${clientId.substring(0, 3)}...`;
    setDebugInfo(debug);
  }, []);

  // 네이버 지도 API 스크립트 동적 로드
  useEffect(() => {
    const loadNaverMapScript = () => {
      // 이미 네이버 지도 객체가 있으면 재로드하지 않음
      if (window.naver && window.naver.maps) {
        setMapLoaded(true);
        return;
      }

      // script 태그 생성
      const script = document.createElement('script');
      script.async = true;

      // 네이버 지도 API URL
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}`;

      // 스크립트 로드 성공
      script.onload = () => {
        console.log('네이버 지도 스크립트 로드 완료');
        setMapLoaded(true);
      };

      // 스크립트 로드 실패
      script.onerror = (error) => {
        console.error('네이버 지도 스크립트 로드 실패:', error);
        setMapError(true);
      };

      // head에 script 추가
      document.head.appendChild(script);

      // 인증 오류 감지용 타임아웃
      setTimeout(() => {
        if (document.querySelector('div[style*="position: absolute; z-index: 100000000"]')) {
          console.log('네이버 지도 인증 오류 발견');
          setMapError(true);
        }
      }, 3000);
    };

    loadNaverMapScript();

    // 컴포넌트가 사라질 때 지도 영역 비우기
    return () => {
      if (mapRef.current) {
        mapRef.current.innerHTML = '';
      }
    };
  }, []);

  // 네이버 지도 초기화
  useEffect(() => {
    // 지도 로드 전이거나, div가 없거나, 에러가 있으면 중단
    if (!mapLoaded || !mapRef.current || mapError) return;

    const initMap = () => {
      try {
        console.log('네이버 지도 초기화 시작');

        // 기본 좌표
        const defaultLocation = new window.naver.maps.LatLng(37.5666805, 126.9784147);

        // 지도 생성
        const map = new window.naver.maps.Map(mapRef.current, {
          center: defaultLocation,
          zoom: parseInt(weddingConfig.venue.mapZoom, 10) || 15,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.RIGHT_TOP
          }
        });

        console.log('네이버 지도 객체 생성 성공');

        // config에 설정된 장소 좌표
        const venueLocation = new window.naver.maps.LatLng(
            weddingConfig.venue.coordinates.latitude,
            weddingConfig.venue.coordinates.longitude
        );

        // 마커 생성
        const marker = new window.naver.maps.Marker({
          position: venueLocation,
          map: map
        });

        // 마커 위 정보창 생성
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:10px;min-width:150px;text-align:center;font-size:14px;"><strong>${weddingConfig.venue.name}</strong></div>`
        });

        // 정보창 열기
        infoWindow.open(map, marker);

        // 지도 중심을 장소 위치로 이동
        map.setCenter(venueLocation);

        console.log('네이버 지도 초기화 완료');

        // 인증 오류 추가 감지
        setTimeout(() => {
          const errorDiv = document.querySelector('div[style*="position: absolute; z-index: 100000000"]');
          if (errorDiv) {
            console.log('인증 오류 감지됨');
            setMapError(true);
          }
        }, 1000);

      } catch (error) {
        console.error('네이버 지도 초기화 오류:', error);
        setMapError(true);
      }
    };

    initMap();
  }, [mapLoaded, mapError]);

  // 네이버 지도 API 실패 시 보여줄 대체 지도 이미지
  const renderStaticMap = () => {
    return (
        <StaticMapContainer>
          <StaticMapImage
              src="https://navermaps.github.io/maps.js.ncp/docs/img/example-static-map.png"
              alt="호텔 위치"
          />
          <MapOverlay>
            <VenueName style={{ color: 'white', marginBottom: '0.5rem' }}>
              {weddingConfig.venue.name}
            </VenueName>
            <VenueAddress style={{ color: 'white', fontSize: '0.9rem' }}>
              {weddingConfig.venue.address}
            </VenueAddress>
          </MapOverlay>
        </StaticMapContainer>
    );
  };

  // 네이버 지도 길찾기
  const navigateToNaver = () => {
    if (typeof window !== 'undefined') {
      const naverMapsUrl =
          `https://map.naver.com/p/directions/-/-/-/walk/place/${weddingConfig.venue.placeId}?c=${weddingConfig.venue.mapZoom},0,0,0,dh`;

      window.open(naverMapsUrl, '_blank');
    }
  };

  // 카카오맵 길찾기
  const navigateToKakao = () => {
    if (typeof window !== 'undefined') {
      const lat = weddingConfig.venue.coordinates.latitude;
      const lng = weddingConfig.venue.coordinates.longitude;
      const name = encodeURIComponent(weddingConfig.venue.name);

      const kakaoMapsUrl = `https://map.kakao.com/link/to/${name},${lat},${lng}`;

      window.open(kakaoMapsUrl, '_blank');
    }
  };

  // TMAP 길찾기
  const navigateToTmap = () => {
    if (typeof window !== 'undefined') {
      const lat = weddingConfig.venue.coordinates.latitude;
      const lng = weddingConfig.venue.coordinates.longitude;
      const name = encodeURIComponent(weddingConfig.venue.name);

      // 모바일에서 TMAP 앱 실행 시도
      window.location.href = `tmap://route?goalname=${name}&goaly=${lat}&goalx=${lng}`;

      // 앱이 없으면 TMAP 웹사이트로 이동
      setTimeout(() => {
        if(document.hidden) return;
        window.location.href = 'https://tmap.co.kr';
      }, 1000);
    }
  };
  return (
      <VenueSectionContainer $bgColor={bgColor}>

        {/* 섹션 제목 */}
        <SectionTitle>장소</SectionTitle>

        {/* 장소 기본 정보 */}
        <VenueInfo>

          {/* 장소 이름 */}
          <VenueName>
            {weddingConfig.venue.name}
          </VenueName>

          {/* 주소 */}
          <VenueAddress>
            {formatTextWithLineBreaks(weddingConfig.venue.address)}
          </VenueAddress>

          {/* 전화번호 */}
          <VenueTel href={`tel:${weddingConfig.venue.tel}`}>
            {weddingConfig.venue.tel}
          </VenueTel>
        </VenueInfo>

        {/* 지도 오류 시 정적 이미지 표시 */}
        {mapError ? (

            renderStaticMap()

        ) : (

            // 정상일 경우 네이버 지도 출력
            <MapContainer ref={mapRef}>
              {!mapLoaded && (
                  <MapLoading>
                    지도를 불러오는 중...{debugInfo}
                  </MapLoading>
              )}
            </MapContainer>
        )}

        {/* 길찾기 버튼 */}
        <NavigateButtonsContainer>

          <NavigateButton
              onClick={navigateToNaver}
              $mapType="naver"
          >
            네이버 지도
          </NavigateButton>

          <NavigateButton
              onClick={navigateToKakao}
              $mapType="kakao"
          >
            카카오맵
          </NavigateButton>

          <NavigateButton
              onClick={navigateToTmap}
              $mapType="tmap"
          >
            TMAP
          </NavigateButton>

        </NavigateButtonsContainer>

        {/* 대중교통 안내 */}
        <TransportCard>

          <CardTitle>
            대중교통 안내
          </CardTitle>

          {/* 지하철 */}
          <TransportItem>

            <TransportLabel>
              지하철
            </TransportLabel>

            <TransportText>
              {weddingConfig.venue.transportation.subway}
            </TransportText>

          </TransportItem>

          {/* 버스 */}
          <TransportItem>

            <TransportLabel>
              버스
            </TransportLabel>

            <TransportText>
              {weddingConfig.venue.transportation.bus}
            </TransportText>

          </TransportItem>

        </TransportCard>

        {/* 주차 안내 */}
        <ParkingCard>

          <CardTitle>
            주차 안내
          </CardTitle>

          <TransportText>
            {weddingConfig.venue.parking}
          </TransportText>

        </ParkingCard>

        //////////////////////////////////////////////////////
        // 신랑측 배차 안내
        //////////////////////////////////////////////////////

        {/* 정보가 있을 경우만 표시 */}
        {weddingConfig.venue.groomShuttle && (

            <ShuttleCard>

              {/* 헤더 */}
              <ShuttleCardHeader
                  onClick={() => toggleShuttle('groom')}
                  $isExpanded={expandedShuttle === 'groom'}
              >

                <CardTitle>
                  신랑측 배차 안내
                </CardTitle>

                {/* 펼침 아이콘 */}
                <ExpandIcon $isExpanded={expandedShuttle === 'groom'}>
                  {expandedShuttle === 'groom' ? '−' : '+'}
                </ExpandIcon>

              </ShuttleCardHeader>

              {/* 펼쳐졌을 때만 내용 표시 */}
              {expandedShuttle === 'groom' && (

                  <ShuttleContent>

                    {/* 탑승 장소 */}
                    <ShuttleInfo>

                      <ShuttleLabel>
                        탑승 장소
                      </ShuttleLabel>

                      <ShuttleText>
                        {formatTextWithLineBreaks(
                            weddingConfig.venue.groomShuttle.location
                        )}
                      </ShuttleText>

                    </ShuttleInfo>

                    {/* 출발 시간 */}
                    <ShuttleInfo>

                      <ShuttleLabel>
                        출발 시간
                      </ShuttleLabel>

                      <ShuttleText>
                        {weddingConfig.venue.groomShuttle.departureTime}
                      </ShuttleText>

                    </ShuttleInfo>

                    {/* 인솔자 */}
                    <ShuttleInfo>

                      <ShuttleLabel>
                        인솔자
                      </ShuttleLabel>

                      <ShuttleText>

                        {weddingConfig.venue.groomShuttle.contact.name}
                        (
                        {weddingConfig.venue.groomShuttle.contact.tel}
                        )

                        {/* 전화 버튼 */}
                        <ShuttleCallButton
                            href={`tel:${weddingConfig.venue.groomShuttle.contact.tel}`}
                        >
                          전화
                        </ShuttleCallButton>

                      </ShuttleText>

                    </ShuttleInfo>

                  </ShuttleContent>
              )}
            </ShuttleCard>
        )}

        //////////////////////////////////////////////////////
        // 신부측 배차 안내
        //////////////////////////////////////////////////////

        {weddingConfig.venue.brideShuttle && (

            <ShuttleCard>

              <ShuttleCardHeader
                  onClick={() => toggleShuttle('bride')}
                  $isExpanded={expandedShuttle === 'bride'}
              >

                <CardTitle>
                  신부측 배차 안내
                </CardTitle>

                <ExpandIcon $isExpanded={expandedShuttle === 'bride'}>
                  {expandedShuttle === 'bride' ? '−' : '+'}
                </ExpandIcon>

              </ShuttleCardHeader>

              {expandedShuttle === 'bride' && (

                  <ShuttleContent>

                    {/* 탑승 장소 */}
                    <ShuttleInfo>

                      <ShuttleLabel>
                        탑승 장소
                      </ShuttleLabel>

                      <ShuttleText>
                        {formatTextWithLineBreaks(
                            weddingConfig.venue.brideShuttle.location
                        )}
                      </ShuttleText>

                    </ShuttleInfo>

                    {/* 출발 시간 */}
                    <ShuttleInfo>

                      <ShuttleLabel>
                        출발 시간
                      </ShuttleLabel>

                      <ShuttleText>
                        {weddingConfig.venue.brideShuttle.departureTime}
                      </ShuttleText>

                    </ShuttleInfo>

                    {/* 인솔자 */}
                    <ShuttleInfo>

                      <ShuttleLabel>
                        인솔자
                      </ShuttleLabel>

                      <ShuttleText>

                        {weddingConfig.venue.brideShuttle.contact.name}
                        (
                        {weddingConfig.venue.brideShuttle.contact.tel}
                        )

                        {/* 전화 버튼 */}
                        <ShuttleCallButton
                            href={`tel:${weddingConfig.venue.brideShuttle.contact.tel}`}
                        >
                          전화
                        </ShuttleCallButton>

                      </ShuttleText>

                    </ShuttleInfo>

                  </ShuttleContent>
              )}
            </ShuttleCard>
        )}
      </VenueSectionContainer>
  );
};

//////////////////////////////////////////////////////
// styled-components 영역
//////////////////////////////////////////////////////

// 전체 장소 섹션
const VenueSectionContainer = styled.section<{ $bgColor: 'white' | 'beige' }>`
`;

// 제목
const SectionTitle = styled.h2`
`;

// 장소 정보
const VenueInfo = styled.div`
`;

// 장소 이름
const VenueName = styled.h3`
`;

// 주소
const VenueAddress = styled.p`
`;

// 전화번호 링크
const VenueTel = styled.a`
`;

// 지도 영역
const MapContainer = styled.div`
`;

// 정적 지도 컨테이너
const StaticMapContainer = styled.div`
`;

// 정적 지도 이미지
const StaticMapImage = styled.img`
`;

// 지도 위 오버레이
const MapOverlay = styled.div`
`;

// 지도 로딩 문구
const MapLoading = styled.div`
`;

// 길찾기 버튼 영역
const NavigateButtonsContainer = styled.div`
`;

// 길찾기 버튼
const NavigateButton = styled.button<{ $mapType?: 'naver' | 'kakao' | 'tmap' }>`
`;

// 카드 공통 스타일
const Card = styled.div`
`;

// 대중교통 카드
const TransportCard = styled(Card)``;

// 주차 카드
const ParkingCard = styled(Card)``;

// 배차 카드
const ShuttleCard = styled(Card)`
`;

// 카드 제목
const CardTitle = styled.h4`
`;

// 교통 항목
const TransportItem = styled.div`
`;

// 교통 라벨
const TransportLabel = styled.p`
`;

// 교통 설명
const TransportText = styled.p`
`;

// 배차 정보
const ShuttleInfo = styled.div`
`;

// 배차 라벨
const ShuttleLabel = styled.p`
`;

// 배차 텍스트
const ShuttleText = styled.p`
`;

// 전화 버튼
const ShuttleCallButton = styled.a`
`;

// 배차 헤더
const ShuttleCardHeader = styled.div<{ $isExpanded: boolean }>`
`;

// 펼침 아이콘
const ExpandIcon = styled.span<{ $isExpanded: boolean }>`
`;

// 펼쳐진 내용
const ShuttleContent = styled.div`
`;

export default VenueSection;