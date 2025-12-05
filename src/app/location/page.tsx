'use client';

import { useState, useEffect } from 'react';
import KakaoMap from './KakaoMap';

interface Device {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'online' | 'offline' | 'warning';
  type: string;
  lastUpdate?: string;
}

interface UserLocation {
  lat: number;
  lng: number;
}

export default function LocationPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [userLocation, setUserLocation] = useState<UserLocation>({
    lat: 37.5665,
    lng: 126.9780,
  });

  // 네이티브 앱에서 위치 정보 받기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Flutter에서 위치 수신
      (window as any).receiveLocation = (lat: number, lng: number) => {
        console.log('Flutter에서 위치 수신:', { lat, lng });
        setUserLocation({ lat, lng });
      };

      // Flutter에 위치 요청
      if ((window as any).FlutterBridge) {
        (window as any).FlutterBridge.postMessage(
          JSON.stringify({ type: 'requestLocation' })
        );
      }
    }
  }, []);

  // 서버에서 장비 데이터 가져오기
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices');
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error('장비 데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();

    const interval = setInterval(fetchDevices, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleDeviceClick = (device: Device) => {
    setSelectedDevice(device);
    console.log('선택된 장비:', device);
  };

  const handleMapClick = (lat: number, lng: number) => {
    console.log('클릭 위치:', { lat, lng });
  };

  // 내 위치로 이동
  const goToMyLocation = () => {
    // 네이티브 앱에 위치 재요청
    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(
        JSON.stringify({ type: 'requestLocation' })
      );
    } else if ((window as any).Android) {
      (window as any).Android.requestLocation();
    } else if ((window as any).webkit?.messageHandlers?.requestLocation) {
      (window as any).webkit.messageHandlers.requestLocation.postMessage({});
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">지도 로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* 지도 영역 */}
      <div className="flex-1 relative">
        <KakaoMap
          center={userLocation}
          level={3}
          devices={devices}
          onDeviceClick={handleDeviceClick}
          onMapClick={handleMapClick}
        />
        
        {/* 내 위치 버튼 */}
        <button
          onClick={goToMyLocation}
          className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100"
          title="내 위치로 이동"
        >
          <svg
            className="w-6 h-6 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* 사이드바 - 장비 목록 */}
      <div className="w-80 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">장비 목록</h2>
          <p className="text-sm text-gray-500">총 {devices.length}개</p>
          <p className="text-xs text-gray-400 mt-1">
            현재 위치: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
          </p>
        </div>
        
        <div className="divide-y">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 ${
                selectedDevice?.id === device.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedDevice(device)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">{device.name}</h3>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    device.status === 'online'
                      ? 'bg-green-100 text-green-800'
                      : device.status === 'warning'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {device.status === 'online' ? '온라인' : 
                   device.status === 'warning' ? '점검' : '오프라인'}
                </span>
              </div>
              <p className="text-sm text-gray-600">유형: {device.type}</p>
              <p className="text-xs text-gray-400">
                위치: {device.lat.toFixed(4)}, {device.lng.toFixed(4)}
              </p>
              {device.lastUpdate && (
                <p className="text-xs text-gray-400 mt-1">
                  업데이트: {device.lastUpdate}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}