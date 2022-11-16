import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaymentOption from '@pages/Payment/PaymentOption';
import PaymentReceiverAddress from '@pages/Payment/PaymentReceiverAddress';
import PaymentSenderAddress from '@pages/Payment/PaymentSenderAddress';
import PaymentRequest from '@pages/Payment/PaymentRequest';
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
import MyPage from '@pages/MyPage';
import Item from '@pages/CreateRollingPaper/SelectItem';
import Title from '@pages/CreateRollingPaper/SetTitle';
import Date from '@pages/CreateRollingPaper/SetOpenDate';
import Link from '@pages/CreateRollingPaper/RollingLink';
import RollingPaper from '@pages/RollingPaper';
import Layout from '@pages/Layout';
import SignIn from '@pages/SignIn';
import MessageCreate from '@pages/MessageCreate';
import CaptureTest from '@pages/CaptureTest';
import Print from '@pages/Print';
import Error from '@pages/error/Error';
import Manual from '@pages/Manual';
import View from '@pages/View';
import CaptureRolling from '@pages/CaptureRolling';

function App() {
  const [loginUser] = useRecoilState(userReCoil);
  const [url, setUrl] = useState<string>('');
  const [pageId, setPageId] = useState<number>(1);
  const Props = {
    url,
    pageId,
  };
  const Setters = {
    setUrl,
    setPageId,
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/capture" element={<CaptureTest />}></Route>
          {loginUser.jwt === '' ? (
            <>
              <Route path="/error/:code" element={<Error />}></Route>
              <Route path="*" element={<Error />}></Route>
              <Route path="" element={<SignIn />}></Route>
              <Route
                path="/user/signin/redirect"
                element={<KakaoRedirectHandler />}
              ></Route>
              <Route path="/" element={<Layout props={Props} />}>
                <Route
                  path="rolling/:url"
                  element={<RollingPaper Setters={Setters} />}
                ></Route>
                <Route
                  path="rolling/message/create"
                  element={<MessageCreate />}
                />
                <Route path="newroll/">
                  <Route path="link" element={<Link />}></Route>
                </Route>
              </Route>
            </>
          ) : (
            <>
              <Route path="" element={<MainPage />}></Route>
              <Route path="/" element={<Layout />}>
                <Route path="/error/:code" element={<Error />}></Route>
                <Route path="*" element={<Error />}></Route>
                <Route path="/manual" element={<Manual />}></Route>
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
                <Route path="/payment/option" element={<PaymentOption />} />
                <Route
                  path="/payment/address/receiver"
                  element={<PaymentReceiverAddress />}
                />
                <Route
                  path="/payment/address/sender"
                  element={<PaymentSenderAddress />}
                />
                <Route path="/payment/request" element={<PaymentRequest />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/payment/fail" element={<PaymentFail />} />
                <Route path="/payment/cancel" element={<PaymentCancel />} />
                <Route
                  path="rolling/message/create"
                  element={<MessageCreate />}
                />
              </Route>
              <Route path="/rolling/print" element={<Print />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
