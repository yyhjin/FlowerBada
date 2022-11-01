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
