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

  return (
    <>
      <button type="button" onClick={handleMyPage}>
        마이페이지
      </button>
    </>
  );
}
