import '@src/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import MainPage from '@pages/MainPage';
import Logout from '@pages/SignOut';
import Layout from '@pages/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<MainPage />} />
          <Route path="/" element={<Layout />}>
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
