import '@src/App.css';
import Login from '@pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import { RecoilRoot } from 'recoil';
import MainPage from '@pages/MainPage';
import Logout from '@pages/SignOut';
import Layout from '@pages/Layout';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="signout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            <Route path="" element={<MainPage />} />
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
