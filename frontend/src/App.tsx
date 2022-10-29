import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Login from './pages/singin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
import GreenHouse from './pages/GreenHouse';
import RollingPaper from './pages/RollingPaper';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="/user/signin/redirect"
            element={<KakaoRedirectHandler />}
          />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/greenhouse" element={<GreenHouse />} />
          <Route
            path="/rollingpaper/:url/:paginationId"
            element={<RollingPaper />}
          />
        </Routes>
      </BrowserRouter>
      <Login />
    </div>
  );
}

export default App;
