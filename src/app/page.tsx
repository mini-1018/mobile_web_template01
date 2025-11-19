import Image from "next/image";

export default function Home() {
return (
      <div className="relative h-screen w-full overflow-hidden">
        {/* 배경 비디오 */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
        >
          <source src="/video/login_01.mp4" type="video/mp4" />
        </video>
  
        {/* 로그인 폼 */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">
          <div className="w-full max-w-sm">
            {/* 로고 */}
            <div className="flex justify-center mb-12">
              <div className="relative w-[100px] h-[30px] flex items-center justify-center">
                <Image src={"/images/logo/logo_white.webp"} fill alt="logo_coda"/>
              </div>
            </div>
  
            {/* 입력 폼 */}
            <div className="space-y-4">
              {/* 아이디 입력 */}
              <input
                type="text"
                placeholder="아이디"
                className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
              
              {/* 비밀번호 입력 */}
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full px-5 py-4 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg"
              />
  
              {/* 로그인 버튼 */}
              <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl shadow-lg transition-colors duration-200">
                로그인
              </button>
            </div>
  
            {/* 하단 링크 */}
            <div className="flex items-center justify-center gap-4 mt-8 text-sm">
              <button className="text-white/90 hover:text-white font-medium">
                아이디 찾기
              </button>
              <span className="text-white/60">|</span>
              <button className="text-white/90 hover:text-white font-medium">
                비밀번호 찾기
              </button>
              <span className="text-white/60">|</span>
              <button className="text-white/90 hover:text-white font-medium">
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
