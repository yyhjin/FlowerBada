import '@src/App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userReCoil } from '@recoil/userRecoil';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import MainPage from '@pages/MainPage';
import GreenHouse from '@pages/GreenHouse';
import Store from '@pages/Store';
import MyPage from './pages/MyPage';
import Item from '@src/pages/CreateRollingPaper/SelectItem';
import Title from '@src/pages/CreateRollingPaper/SetTitle';
import Date from '@src/pages/CreateRollingPaper/SetOpenDate';
import Link from '@src/pages/CreateRollingPaper/RollingLink';
import Layout from '@pages/Layout';
import Login from '@pages/SignIn';
import RollingPaper from './pages/RollingPaper';

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
                <Route path="mypage" element={<MyPage />}></Route>
                <Route
                  path="rolling/:url/:paginationId"
                  element={<RollingPaper />}
                ></Route>
                <Route path="newroll/">
                  <Route path="item" element={<Item />}></Route>
                  <Route path="title" element={<Title />}></Route>
                  <Route path="date" element={<Date />}></Route>
                  <Route path="link" element={<Link />}></Route>
                </Route>
              </Route>
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
