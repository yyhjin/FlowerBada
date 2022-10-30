import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const handleRollingPaper = async (e) => {
    try {
      navigate(`/rollingpaper/${state}/1`);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <div>롤페 링크</div>
      <div onClick={handleRollingPaper}>
        {root}
        {state}/1
      </div>
      <button onClick={handleMainPage}>메인가기</button>
    </>
  );
}
