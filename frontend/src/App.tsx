import './App.css';
import Login from './pages/singin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route
              path="/user/signin/redirect"
              element={<KakaoRedirectHandler />}
            />
          </Routes>
        </BrowserRouter>
        <Login />
      </div>
    </RecoilRoot>
  );
}

export default App;
