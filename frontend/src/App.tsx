import '@src/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import MainPage from '@pages/MainPage';
import GreenHouse from '@pages/GreenHouse';
import Store from '@pages/Store';
import NewRoll from '@pages/NewRoll';
import MyPage from '@pages/MyPage';
import Layout from '@pages/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />}></Route>
          <Route path="/" element={<Layout />}>
            <Route path="greenhouse" element={<GreenHouse />}></Route>
            <Route path="store" element={<Store />}></Route>
            <Route path="newroll" element={<NewRoll />}></Route>
            <Route path="mypage" element={<MyPage />}></Route>
            {/* <Route path="mypage" element={<MyPage />} />
            <Route path="greenhouse" element={<GreenHouse />} />
            <Route path="store" element={<Store />} />
            <Route path="rollingpaper" element={<CreateRolling />} /> */}
          </Route>
          <Route
            path="/user/signin/redirect"
            element={<KakaoRedirectHandler />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
