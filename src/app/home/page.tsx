"use client";
import Image from "next/image";
import { QrCode, Package, Milk, Battery, Coffee } from "lucide-react";

export default function Home() {
  const currentPoint = 2600;
  const remainder = currentPoint % 1000;
  const needed = 1000 - remainder;
  const progress = (remainder / 1000) * 100;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* 배경 이미지 */}
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/images/home/home_bg2.jpg"
          fill
          alt="background"
          className="object-cover blur-sm"
          priority
        />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 px-6 py-16 w-[375px] m-auto">
        {/* 포인트 카드 */}
        <div className="rounded-2xl p-6 shadow-2xl mb-6 bg-white/20 backdrop-blur-md">
          <p className="text-white text-sm mb-2">지테크님의 포인트</p>
          <div className="flex items-end gap-2 mb-4">
            <p className="text-white text-4xl font-bold">{currentPoint.toLocaleString()}</p>
            <p className="text-white text-lg mb-1">P</p>
          </div>
          
         {/* 고래 게이지 */}
         <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0">
              {/* 배경 고래 (다크 그레이) */}
              <Image
                src="/icons/whale.svg"
                width={48}
                height={48}
                alt="whale"
                className="w-full h-full"
                style={{ filter: 'brightness(0) saturate(0%) invert(26%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)' }}
              />
              
              {/* 진행 중인 고래 (흰색) */}
              <div 
                className="absolute top-0 left-0 w-full h-full overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
              >
                <Image
                  src="/icons/whale.svg"
                  width={48}
                  height={48}
                  alt="whale"
                  className="w-full h-full"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
            
            <p className="text-white text-xs flex-1">
              <span className="font-bold">{needed}P</span>를 더 적립하면 고래 한 마리를 살릴 수 있어요.
            </p>
          </div>
        </div>

        {/* QR 코드 섹션 */}
        <div className="backdrop-blur-sm rounded-2xl p-6 shadow-2xl bg-white/20 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-white rounded-xl flex items-center justify-center">
              <Image 
                width={160}
                height={160}
                src={"/icons/qr.svg"}
                alt="qr_code"
              />
            </div>
          </div>
        </div>

        {/* 적립 내역 섹션 */}
        <div className="backdrop-blur-sm rounded-2xl p-6  bg-white/20 shadow-2xl">
          <h3 className="text-white font-bold text-lg mb-4">적립 내역</h3>
          
          <div className="grid grid-cols-4 gap-1">
            {/* 페트 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Package className="w-7 h-7 text-[#434343]" />
              </div>
              <span className="text-white text-sm font-medium">페트</span>
            </button>

            {/* 페트&캔 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Package className="w-7 h-7 text-[#434343]" />
              </div>
              <span className="text-white text-sm font-medium">캔</span>
            </button>

            {/* 우유팩 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Milk className="w-7 h-7 text-[#434343]" />
              </div>
              <span className="text-white text-sm font-medium">우유팩</span>
            </button>

            {/* 건전지 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Battery className="w-7 h-7 text-[#434343]" />
              </div>
              <span className="text-white text-sm font-medium">건전지</span>
            </button>

            {/* 종이컵 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Coffee className="w-7 h-7 text-[#434343]" />
              </div>
              <span className="text-white text-sm font-medium">종이컵</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}