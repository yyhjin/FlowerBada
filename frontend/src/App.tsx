import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Login from './pages/singin';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import KakaoRedirectHandler from './kakao/KakaoRedirectHandler';

function App() {
  return (
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
  );
}

export default App;
