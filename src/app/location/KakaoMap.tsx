// components/KakaoMap.tsx
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface Device {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'warning';
  type: string;
  lastUpdate?: string;
}

interface KakaoMapProps {
  center?: { lat: number; lng: number };
  level?: number;
  devices?: Device[];
  onMapClick?: (lat: number, lng: number) => void;
  onDeviceClick?: (device: Device) => void;
}

export default function KakaoMap({
  center = { lat: 37.5665, lng: 126.9780 },
  level = 3,
  devices = [],
  onMapClick,
  onDeviceClick,
}: KakaoMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);
  
  // 콜백 함수들을 ref로 저장
  const onMapClickRef = useRef(onMapClick);
  const onDeviceClickRef = useRef(onDeviceClick);
  
  useEffect(() => {
    onMapClickRef.current = onMapClick;
    onDeviceClickRef.current = onDeviceClick;
  }, [onMapClick, onDeviceClick]);

  // 카카오 맵 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isLoaded || !mapRef.current) return;

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: level,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);

    // 지도 클릭 이벤트
    window.kakao.maps.event.addListener(kakaoMap, 'click', (mouseEvent: any) => {
      const latLng = mouseEvent.latLng;
      if (onMapClickRef.current) {
        onMapClickRef.current(latLng.getLat(), latLng.getLng());
      }
    });

    setMap(kakaoMap);
  }, [isLoaded, center.lat, center.lng, level]);

  // 디바이스 마커 생성 및 업데이트
  useEffect(() => {
    if (!map || !isLoaded) return;

    const newMarkers = new Map<string, any>();
    const currentMarkers = markersRef.current;

    devices.forEach((device) => {
      const position = new window.kakao.maps.LatLng(device.lat, device.lng);

      // 커스텀 마커 이미지 생성 (상태별 색상)
      const markerImage = createDeviceMarkerImage(device.status);

      const marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
        image: markerImage,
        title: device.name,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        if (onDeviceClickRef.current) {
          onDeviceClickRef.current(device);
        }
      });

      // 인포윈도우 생성
      const infowindow = new window.kakao.maps.InfoWindow({
        content: createInfoWindowContent(device),
        removable: false,
      });

      // 마커 hover 이벤트
      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
        infowindow.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
        infowindow.close();
      });

      newMarkers.set(device.id, marker);
    });

    // 이전 마커 제거
    currentMarkers.forEach((marker, id) => {
      if (!newMarkers.has(id)) {
        marker.setMap(null);
      }
    });

    markersRef.current = newMarkers;

    // Cleanup
    return () => {
      markersRef.current.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [map, devices, isLoaded]);

  // 커스텀 마커 이미지 생성
  const createDeviceMarkerImage = (status: string) => {
    const colors = {
      online: '#10b981',  // green
      offline: '#ef4444', // red
      warning: '#f59e0b', // yellow
    };

    const color = colors[status as keyof typeof colors] || colors.offline;

    const imageSrc = `data:image/svg+xml;base64,${btoa(`
      <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24C32 7.163 24.837 0 16 0z" 
              fill="${color}" 
              stroke="white" 
              stroke-width="2"/>
        <circle cx="16" cy="15" r="6" fill="white"/>
      </svg>
    `)}`;

    const imageSize = new window.kakao.maps.Size(32, 40);
    const imageOption = { offset: new window.kakao.maps.Point(16, 40) };

    return new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  };

  // 인포윈도우 컨텐츠 생성
  const createInfoWindowContent = (device: Device) => {
    const statusColors = {
      online: '#10b981',
      offline: '#ef4444',
      warning: '#f59e0b',
    };

    const statusText = {
      online: '온라인',
      offline: '오프라인',
      warning: '경고',
    };

    return `
      <div style="
        padding: 12px;
        min-width: 200px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      ">
        <div style="
          font-weight: bold;
          font-size: 14px;
          margin-bottom: 8px;
          color: #1f2937;
        ">
          ${device.name}
        </div>
        <div style="
          display: flex;
          align-items: center;
          margin-bottom: 4px;
        ">
          <span style="
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: ${statusColors[device.status]};
            margin-right: 6px;
          "></span>
          <span style="font-size: 12px; color: #6b7280;">
            ${statusText[device.status]}
          </span>
        </div>
        <div style="font-size: 11px; color: #9ca3af; margin-top: 4px;">
          유형: ${device.type}
        </div>
        ${device.lastUpdate ? `
          <div style="font-size: 11px; color: #9ca3af; margin-top: 2px;">
            최종 업데이트: ${device.lastUpdate}
          </div>
        ` : ''}
      </div>
    `;
  };

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '400px'
      }}
    />
  );
}