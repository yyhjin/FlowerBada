import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';

export default function SetOpenDate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());

  const changeDate = (datetime) => {
    setDate(datetime);
    console.log(datetime.getMonth());
    console.log(datetime.getFullYear());
    console.log(datetime.getUTCDate());
  };

  const handleSetTitle = async () => {
    try {
      navigate('/settitle');
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleRollingLink = async () => {
    if (date === null) {
      alert('날짜 제대로 입력해');
      return;
    }
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (String(month).length === 1) {
      month = '0' + month;
    }
    if (String(day).length === 1) {
      day = '0' + day;
    }
    let localDateTime = year + '-' + month + '-' + day + 'T10:00';
    console.log(localDateTime);

    try {
      const res: any = await axios.post(
        'http://localhost:8080/api/v1/rolling',
        {
          itemId: Number(sessionStorage.getItem('selectId')),
          openDate: localDateTime,
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
        <DatePicker
          locale={ko} // 언어설정 기본값은 영어
          dateFormat="yyyy-MM-dd" // 날짜 형식 설정
          className="input-datepicker" // 클래스 명 지정 css주기 위해
          minDate={new Date()} // 선택할 수 있는 최소 날짜값 지정 오늘 +1
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          placeholderText="롤링페이퍼 개봉 날짜 선택" // placeholder
          selected={date} // value
          onChange={(date) => changeDate(date)} // 날짜를 선택하였을 때 실행될 함수
        />
      </div>
      <button onClick={handleSetTitle}>제목 정하기</button>
      <button onClick={handleRollingLink}>롤페 생성</button>
    </>
  );
}
