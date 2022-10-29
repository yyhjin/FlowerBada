import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function RollingPaper() {
  const [loading, setLoading] = useState(false);
  const [rolling, setRolling] = useState({});
  const [paginationId, setPaginationId] = useState();
  let paramCopy: any = {};
  paramCopy = useParams();
  // 이 부분은 타입스크립트 공부를 좀 해봐야 할듯??

  async function getRolling() {
    setLoading(false);
    let url = paramCopy.url;
    setPaginationId(paramCopy.paginationId);
    sessionStorage.setItem('url', `/rollingpaper/${url}/${paginationId}`);
    try {
      const res: any = await axios.get(
        `http://localhost:8080/api/v1/rolling/${url}/${paramCopy.paginationId}`,
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        },
      );
      console.log(res.data.response);
      setRolling(res.data.response);
      setLoading(true);
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRolling();
  }, []);
  return (
    <>
      <div>롤링페이퍼</div>
      {loading ? (
        <div>
          <div>롤페 꽃다발 이미지 {rolling.imgUrl}</div>
          <div>롤페 제목 {rolling.title}</div>
          <div>개봉 시간 {rolling.date}</div>
          {rolling.messages.map((message) => {
            return (
              <div key={message.messageId}>
                <div id={message.messageId}>꽃 이미지 {message.imgUrl}</div>
                <div>flowerId {message.flowerId}</div>
                <div>writer {message.writer}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
}
