import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import messageAPI from '@api/messageAPI';

interface IRolling {
  imgUrl?: string;
  title?: string;
  date?: string;
  messages?: IMessage[];
}

interface IMessage {
  imgUrl: string;
  writer: string;
  flowerId: number;
  messageId: number;
}

export default function RollingPaper() {
  const [loading, setLoading] = useState<Boolean>(false);
  const [rolling, setRolling] = useState<IRolling>({});
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [paginationId, setPaginationId] = useState<Number>();
  let paramCopy: any = {};
  paramCopy = useParams();

  async function getRolling() {
    setLoading(false);
    let url = paramCopy.url;
    // console.log(paramCopy);

    setPaginationId(paramCopy.paginationId);
    try {
      const res: any = await messageAPI.getRolling(url, paramCopy.paginationId);
      console.log(res.data.response);
      setRolling(res.data.response);
      setLoading(true);
    } catch (err: any) {
      // console.log(err);
    }
  }

  useEffect(() => {
    getRolling();
  }, []);
  return (
    <>
      <div>롤링페이퍼</div>
      {loading && rolling ? (
        <div>
          <div>롤페 꽃다발 이미지 {rolling.imgUrl}</div>
          <div>롤페 제목 {rolling.title}</div>
          <div>개봉 시간 {rolling.date}</div>
          {rolling.messages &&
            rolling.messages.map((message: IMessage) => {
              return (
                <div key={message.messageId}>
                  <div id={String(message.messageId)}>
                    꽃 이미지 {message.imgUrl}
                  </div>
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
