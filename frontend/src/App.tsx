import './App.css';
import Login from './pages/SignIn';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import { RecoilRoot, useRecoilState } from 'recoil';
import { userReCoil } from './recoil/userRecoil';
import Logout from './pages/SignOut';
import Layout from './pages/Layout';

function App() {
  const [loginUser] = useRecoilState(userReCoil);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="signout" element={<Logout />} />
          <Route path="/" element={<Layout />}>
            {/* <Route path="" element={<Main />} />
            <Route path="mypage" element={<MyPage />} />
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
