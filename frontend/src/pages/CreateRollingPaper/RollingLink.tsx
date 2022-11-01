import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '../../recoil/userRecoil';

export default function RollingLink() {
  const { state } = useLocation();
  const root = 'localhost:5173/rollingpaper/';
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleMainPage = async () => {
    try {
      navigate('/');
    } catch (err: any) {
      console.log(err);
    }
  };
  const handleRollingPaper = async () => {
    try {
      navigate(`/rollingpaper/${state}/1`);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <div css={DefaultColor}>링크를 복사해</div>
      <div>롤링페이퍼를 공유하세요</div>
      <div onClick={handleRollingPaper}>
        {root}
        {state}/1
      </div>
      <button onClick={handleMainPage}>메인가기</button>
    </>
  );
}

const DefaultColor = css`
  background-color: #f2f0ef;
  color: red;
`;
