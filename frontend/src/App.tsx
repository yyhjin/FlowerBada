import './App.css';
import Login from './pages/SignIn';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import { RecoilRoot } from 'recoil';
import MainPage from './pages/MainPage';

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
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
