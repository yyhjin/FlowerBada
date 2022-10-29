import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Login from './pages/singin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/user/signin/redirect"
            element={<KakaoRedirectHandler />}
          />
          <Route path="/" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
      <Login />
    </div>
  );
}

export default App;
