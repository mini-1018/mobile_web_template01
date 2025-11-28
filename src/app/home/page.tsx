"use client";
import Image from "next/image";

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
          src="https://res.cloudinary.com/dqdmfbrfb/image/upload/v1764319529/home_bg2_di4vlf.jpg"
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
          <div className="flex items-start gap-4">
            <div className="relative flex-shrink-0">
              <div className="relative w-16 h-16">
                {/* 배경 원 */}
                <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                  <circle 
                    cx="32" cy="32" r="28"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle 
                    cx="32" cy="32" r="28"
                    stroke="white"
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${(progress / 100) * 176} 176`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* 배경 고래 (다크 그레이) */}
                  <div className="relative w-8 h-8">
                    <Image 
                      src="/icons/whale.svg" 
                      width={32} 
                      height={32} 
                      alt="whale"
                      className="absolute"
                      style={{ filter: 'brightness(0) saturate(0%) invert(26%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(95%) contrast(90%)' }}
                    />
                    
                    {/* 진행 중인 고래 (흰색) */}
                    <div 
                      className="absolute left-0 overflow-hidden"
                      style={{ 
                        width: '32px',
                        height: '32px',
                        clipPath: `inset(0 ${100 - progress}% 0 0)` 
                      }}
                    >
                      <Image
                        src="/icons/whale.svg"
                        width={32}
                        height={32}
                        alt="whale"
                        style={{ filter: 'brightness(0) invert(1)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 pt-1">
              <p className="text-white text-xs mb-1">
                <span className="font-bold text-base">{progress.toFixed(0)}%</span> 달성
              </p>
              <p className="text-white/80 text-xs">
                <span className="font-bold">{needed}P</span> 더 모으면 고래를 살릴 수 있어요!
              </p>
            </div>
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
          
          <div className="grid grid-cols-3 gap-1">
            {/* 페트 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/icons/pet.png"
                  width={48}
                  height={48}
                  alt="pet"
                />
              </div>
              <span className="text-white text-sm font-medium">페트</span>
            </button>

            {/* 캔 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/icons/can.png"
                  width={36}
                  height={36}
                  alt="can"
                />
              </div>
              <span className="text-white text-sm font-medium">캔</span>
            </button>

            {/* 우유팩 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/icons/milk.png"
                  width={36}
                  height={36}
                  alt="milk"
                />
              </div>
              <span className="text-white text-sm font-medium">우유팩</span>
            </button>

            {/* 건전지 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/icons/bettery.png"
                  width={36}
                  height={36}
                  alt="bettery"
                />
              </div>
              <span className="text-white text-sm font-medium">건전지</span>
            </button>

            {/* 종이컵 */}
            <button className="flex flex-col items-center gap-2 p-2 rounded-xl transition-colors">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/icons/cup.png"
                  width={36}
                  height={36}
                  alt="cup"
                />
              </div>
              <span className="text-white text-sm font-medium">종이컵</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}