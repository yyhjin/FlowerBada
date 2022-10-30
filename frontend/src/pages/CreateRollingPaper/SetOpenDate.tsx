import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SetOpenDate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState('2022-10-30T15:26:53.744Z');

  const getDate = () => {
    if (sessionStorage.getItem('date') !== null) {
      setDate(sessionStorage.getItem('date'));
    }
  };

  const changeDate = (e) => {
    setDate(e.target.value);
  };

  const handleSetTitle = async () => {
    sessionStorage.setItem('date', date);
    try {
      navigate('/settitle');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleRollingLink = async () => {
    try {
      const res: any = await axios.post(
        'http://localhost:8080/api/v1/rolling',
        {
          itemId: Number(sessionStorage.getItem('selectId')),
          openDate: date,
          title: sessionStorage.getItem('title'),
        },
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        },
      );
      console.log(res.data.response);
      sessionStorage.removeItem('selectId');
      sessionStorage.removeItem('selectIndex');
      sessionStorage.removeItem('selectUrl');
      sessionStorage.removeItem('title');
      sessionStorage.removeItem('date');
      navigate('/rollinglink', { state: res.data.response });
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <>
      <div>날짜 선택</div>
      <div>
        나중에 데이트피커로 바꾸기
        <input value={date} onChange={changeDate}></input>
        {/* 현재 날짜보다 뒤로만 가능한 검증 필요, 날짜 선택 안하면 못 만들게 하는 검증도 필요*/}
      </div>
      <button onClick={handleSetTitle}>제목 정하기</button>
      <button onClick={handleRollingLink}>롤페 생성</button>
    </>
  );
}
