import '@src/App.css';
import Login from '@pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import { RecoilRoot } from 'recoil';
import MainPage from '@pages/MainPage';
import GreenHouse from '@pages/GreenHouse';
import Store from '@pages/Store';
import NewRoll from '@pages/NewRoll';
import MyPage from '@pages/MyPage';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<MainPage />}></Route>
            <Route
              path="/user/signin/redirect"
              element={<KakaoRedirectHandler />}
            />
            <Route path="/greenhouse" element={<GreenHouse />}></Route>
            <Route path="/store" element={<Store />}></Route>
            <Route path="/newroll" element={<NewRoll />}></Route>
            <Route path="/mypage" element={<MyPage />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
