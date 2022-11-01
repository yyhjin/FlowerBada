import '@src/App.css';
import Login from '@pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from '@kakao/KakaoRedirectHandler';
import { RecoilRoot } from 'recoil';
import MainPage from '@pages/MainPage';
import MyPage from './pages/MyPage';
import GreenHouse from './pages/GreenHouse';
import RollingPaper from './pages/RollingPaper';
import SelectItem from './pages/CreateRollingPaper/SelectItem';
import SetTitle from './pages/CreateRollingPaper/SetTitle';
import SetOpenDate from './pages/CreateRollingPaper/SetOpenDate';
import RollingLink from './pages/CreateRollingPaper/RollingLink';
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
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/greenhouse" element={<GreenHouse />} />
            <Route path="/selectitem" element={<SelectItem />} />
            <Route path="/settitle" element={<SetTitle />} />
            <Route path="/setOpenDate" element={<SetOpenDate />} />
            <Route path="/rollinglink" element={<RollingLink />} />
            <Route
              path="/rollingpaper/:url/:paginationId"
              element={<RollingPaper />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
