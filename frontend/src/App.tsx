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
import SelectItem from './pages/CreateRollingPaper/SelectItem';
import SetTitle from './pages/CreateRollingPaper/SetTitle';
import SetOpenDate from './pages/CreateRollingPaper/SetOpenDate';
import RollingLink from './pages/CreateRollingPaper/RollingLink';
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
          <Route path="/selectitem" element={<SelectItem />} />
          <Route path="/settitle" element={<SetTitle />} />
          <Route path="/setOpenDate" element={<SetOpenDate />} />
          <Route path="/rollinglink" element={<RollingLink />} />
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
