import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 실제로는 데이터베이스에서 가져오기
    const devices = [
      {
        id: '1',
        name: '장비A',
        lat: 37.5665,
        lng: 126.9780,
        status: 'online',
        type: '정상',
        lastUpdate: new Date().toLocaleString('ko-KR'),
      },
      {
        id: '2',
        name: '장비B',
        lat: 37.5675,
        lng: 126.9790,
        status: 'warning',
        type: '점검중',
        lastUpdate: new Date().toLocaleString('ko-KR'),
      },
      {
        id: '3',
        name: '장비C',
        lat: 37.5655,
        lng: 126.9770,
        status: 'offline',
        type: '모터멈춤',
        lastUpdate: new Date().toLocaleString('ko-KR'),
      },
    ];

    return NextResponse.json(devices);
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}