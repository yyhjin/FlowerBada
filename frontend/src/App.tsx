import { BrowserRouter, Routes, Route } from 'react-router-dom';
import KakaoPaymentTest from '@pages/KakaoPaymentTest';
import PaymentSuccess from '@pages/Payment/PaymentSuccess';
import PaymentFail from '@pages/Payment/PaymentFail';
import PaymentCancel from '@pages/Payment/PaymentCancel';
import '@src/App.css';
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
import RollingPaper from '@pages/RollingPaper';
import Layout from '@pages/Layout';
import SignIn from '@pages/SignIn';
import MessageRead from '@pages/MessageRead';
import MessageCreate from '@pages/MessageCreate';

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
                <Route path="newroll/">
                  <Route path="item" element={<Item />}></Route>
                  <Route path="title" element={<Title />}></Route>
                  <Route path="date" element={<Date />}></Route>
                  <Route path="link" element={<Link />}></Route>
                </Route>
                <Route path="rolling/:url" element={<RollingPaper />}></Route>

                <Route path="/payment" element={<KakaoPaymentTest />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/fail" element={<PaymentFail />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route path="/rolling/message/read" element={<MessageRead />} />
                <Route
                  path="/rolling/message/create"
                  element={<MessageCreate />}
                />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
