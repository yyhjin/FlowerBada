<<<<<<< HEAD
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function MainPage() {
  sessionStorage.setItem('url', '/');
  const navigate = useNavigate();
  const handleMyPage = async () => {
    try {
      navigate('/mypage');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleGreenHouse = async () => {
    try {
      navigate('/greenhouse');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleCreateRolling = async () => {
    try {
      navigate('/selectitem');
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <button type="button" onClick={handleMyPage}>
        마이페이지
      </button>
      <button type="button" onClick={handleGreenHouse}>
        그린하우스
      </button>
      <button type="button" onClick={handleCreateRolling}>
        새로 만들기
      </button>
    </>
  );
}
=======
import { css } from '@emotion/react';

const Mainpage = () => {
  return (
    <div css={TestCSS}>
      Mainpage
      <p className="test">얘는 파란색이야</p>
    </div>
  );
};

const TestCSS = css`
  color: red;
  display: flex;
  .test {
    color: blue;
  }
`;

export default Mainpage;
>>>>>>> ae5ac83c1b57fdf9bd389292f261e3302721e8ae
