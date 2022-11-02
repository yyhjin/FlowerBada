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
import NewRoll from '@pages/NewRoll';
import MyPage from '@pages/MyPage';
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
            </>
          ) : (
            <>
              <Route path="" element={<MainPage />}></Route>
              <Route path="/" element={<Layout />}>
                <Route path="greenhouse" element={<GreenHouse />}></Route>
                <Route path="store" element={<Store />}></Route>
                <Route path="newroll" element={<NewRoll />}></Route>
                <Route path="mypage" element={<MyPage />}></Route>
                <Route path="/payment" element={<KakaoPaymentTest />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/fail" element={<PaymentFail />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
