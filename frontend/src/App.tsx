import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoPaymentTest from '@pages/KakaoPaymentTest';
import PaymentSuccess from '@pages/Payment/PaymentSuccess';
import PaymentFail from '@pages/Payment/PaymentFail';
import PaymentCancel from '@pages/Payment/PaymentCancel';
import '@src/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<<<< Temporary merge branch 1
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import MyPage from './pages/MyPage';
import MainPage from './pages/MainPage';
=========
import { useRecoilState } from 'recoil';
import { userReCoil } from '@recoil/userRecoil';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import MainPage from '@pages/MainPage';
import GreenHouse from '@pages/GreenHouse';
import Store from '@pages/Store';
import MyPage from './pages/MyPage';
import Item from '@pages/CreateRollingPaper/SelectItem';
import Title from '@pages/CreateRollingPaper/SetTitle';
import Date from '@pages/CreateRollingPaper/SetOpenDate';
import Link from '@pages/CreateRollingPaper/RollingLink';
import Layout from '@pages/Layout';
import SignIn from '@pages/SignIn';

function App() {
  const [loginUser] = useRecoilState(userReCoil);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {loginUser.jwt === '' ? (
            <>
              <Route path="/*" element={<SignIn />}></Route>
              <Route
                path="/user/signin/redirect"
                element={<KakaoRedirectHandler />}
              ></Route>
              <Route
                path="/rolling/:url/:paginationId"
                element={<RollingPaper />}
              ></Route>
            </>
          ) : (
            <>
              <Route path="" element={<MainPage />}></Route>
              <Route path="/" element={<Layout />}>
                <Route path="greenhouse" element={<GreenHouse />}></Route>
                <Route path="store" element={<Store />}></Route>
                <Route path="mypage" element={<MyPage />}></Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
