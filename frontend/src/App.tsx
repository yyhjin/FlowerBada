import '@src/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userReCoil } from '@recoil/userRecoil';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import MainPage from '@pages/MainPage';
import GreenHouse from '@pages/GreenHouse';
import Store from '@pages/Store';
import NewRoll from '@pages/CreateRollingPaper/NewRoll';
import MyPage from '@pages/MyPage';
import Layout from '@pages/Layout';
import Login from '@pages/SignIn';

function App() {
  const [loginUser] = useRecoilState(userReCoil);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {loginUser.jwt === '' ? (
            <>
              <Route path="/*" element={<Login />}></Route>
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
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
