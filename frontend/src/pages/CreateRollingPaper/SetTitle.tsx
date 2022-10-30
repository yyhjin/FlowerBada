import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SetTitle() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const getTitle = () => {
    if (sessionStorage.getItem('title') !== null) {
      setTitle(sessionStorage.getItem('title'));
    }
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectItem = async () => {
    sessionStorage.setItem('title', title);
    try {
      navigate('/selectitem');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleSetOpenDate = async () => {
    if (title === '') {
      console.log('제목 입력해라');
    } else {
      sessionStorage.setItem('title', title);
      try {
        navigate('/setopendate');
      } catch (err: any) {
        console.log(err);
      }
    }
  };
  useEffect(() => {
    getTitle();
  }, []);
  return (
    <>
      <div>제목 정해</div>
      <div>
        <input value={title || ''} onChange={changeTitle}></input>
      </div>
      <button onClick={handleSelectItem}>꽃다발 선택</button>
      <button onClick={handleSetOpenDate}>날짜 선택</button>
    </>
  );
}
