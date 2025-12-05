"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // 임시 로그인 로직 (실제로는 API 호출)
      console.log('로그인 시도:', { id, password });
      
      // Flutter 앱에 로그인 성공 알림
      if (typeof window !== 'undefined') {
        // Flutter InAppWebView
        if ((window as any).flutter_inappwebview) {
          (window as any).flutter_inappwebview.callHandler('loginSuccess', {
            user: {
              id: id,
              name: '사용자',
              token: 'temp_token_123'
            }
          });
          return;
        }
        
        // Flutter WebView
        if ((window as any).FlutterBridge) {
          (window as any).FlutterBridge.postMessage(
            JSON.stringify({ 
              type: 'loginSuccess',
              data: {
                id: id,
                name: '사용자',
                token: 'temp_token_123'
              }
            })
          );
          return;
        }
      }
      
      // 홈 화면으로 이동
      router.push('/home');
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다.');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 배경 비디오 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
      >
        {/* <source src="/video/login_bg.mp4" type="video/mp4" /> */}
        <source src="/video/login_bg.webm" type="video/webm" />
      </video>

      {/* 로그인 폼 */}
      <div className="relative z-10 flex items-center justify-center h-full px-6">
        <div className="w-[280px]">
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
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-5 py-4 bg-white backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary shadow-lg"
            />
            
            {/* 비밀번호 입력 */}
            <input
              type="password"
              placeholder="패스워드"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleLogin();
                }
              }}
              className="w-full px-5 py-4 bg-white backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-primary shadow-lg"
            />

            {/* 로그인 버튼 */}
            <button 
              className="w-full py-4 bg-blue-primary hover:bg-blue-secondary active:bg-blue-800 text-white font-semibold rounded-xl shadow-lg transition-colors duration-200"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>

          {/* 하단 링크 */}
          <div className="flex items-center justify-center gap-4 mt-8 text-sm">
            <button className="text-[#434343] font-bold">
              아이디 찾기
            </button>
            <span className="text-[#434343]">|</span>
            <button className="text-[#434343] font-bold">
              비밀번호 찾기
            </button>
            <span className="text-[#434343]">|</span>
            <button className="text-[#434343] font-bold">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
