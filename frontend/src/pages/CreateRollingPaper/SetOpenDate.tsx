import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import { css } from '@emotion/react';
import rollingAPI from '@api/rollingAPI';
import updateTokens from '@src/utils/updateTokens';
import MySwal from '@components/SweetAlert';

export default function SetOpenDate() {
  const curr = new Date();
  const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;

  const today = new Date(utc + KR_TIME_DIFF);
  const tomorrow = new Date(utc + KR_TIME_DIFF);
  // console.log(today);

  tomorrow.setDate(today.getDate() + 1);
  const navigate = useNavigate();
  const [userState, setUserState] = useRecoilState<IuserRecoil>(userReCoil);
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  const [date, setDate] = useState<Date>(tomorrow);

  const changeDate = (date: Date): void => {
    setDate(date);
  };

  const handleRollingLink = async (e: any): Promise<void> => {
    if (date === null) {
      MySwal.fire({
        title: '날짜를 다시 선택해 주세요.',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
      return;
    }
    e.target.disabled = true;
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1);
    let day = String(date.getDate());

    if (String(month).length === 1) {
      month = '0' + month;
    }
    if (String(day).length === 1) {
      day = '0' + day;
    }
    let localDateTime = year + '-' + month + '-' + day + 'T00:00';

    try {
      const res: any = await rollingAPI.makeRolling(
        userState.jwt,
        userState.refresh,
        {
          itemId: createRollingState.itemId,
          openDate: localDateTime,
          title: createRollingState.title,
        },
      );
      setCreateRollingState((prev: IcreateRollingRecoil): any => {
        const variable = { ...prev };
        variable.itemId = 0;
        variable.itemIndex = 0;
        variable.url = '';
        variable.title = '';
        return variable;
      });

      navigate('/newroll/link', {
        state: { url: res.data.response, title: createRollingState.title },
      });
    } catch (err: any) {
      if (err.response.headers.get('x-auth-token') === 'EXPIRED') {
        MySwal.fire({
          title: '로그인이 필요합니다!',
          icon: 'warning',
          confirmButtonColor: '#16453e',
          confirmButtonText: '확인',
        });
        setUserState((prev: IuserRecoil) => {
          const variable = { ...prev };
          variable.id = 0;
          variable.userToken = '';
          variable.nickname = '';
          variable.points = 0;
          variable.jwt = '';
          variable.refresh = '';
          return variable;
        });
        navigate('/');
      } else {
        let accessToken: string = err.response.headers.get('x-auth-token');
        let refreshToken: string = err.response.headers.get('refresh-token');
        if (accessToken && refreshToken) {
          accessToken = accessToken.split(' ')[1];
          refreshToken = refreshToken.split(' ')[1];
          updateTokens(accessToken, refreshToken, setUserState);
          const res: any = await rollingAPI.makeRolling(
            accessToken,
            refreshToken,
            {
              itemId: createRollingState.itemId,
              openDate: localDateTime,
              title: createRollingState.title,
            },
          );
          setCreateRollingState((prev: IcreateRollingRecoil): any => {
            const variable = { ...prev };
            variable.itemId = 0;
            variable.itemIndex = 0;
            variable.url = '';
            variable.title = '';
            return variable;
          });

          navigate('/newroll/link', { state: res.data.response });
        } else {
          console.log('No access or refresh token');
          navigate('/');
        }
      }
    }
  };

  const datePickerFocus = (e: any) => {
    // console.log((e.target.readOnly = true));
  };

  const datePickerFocusOut = (e: any) => {
    // console.log((e.target.readOnly = false));
  };

  return (
    <div css={Background}>
      <div css={Info}>
        <div css={Writing}>롤링페이퍼 개봉 날짜를</div>
        <div css={Writing}>선택해주세요.</div>
      </div>
      <div css={Calendar}>
        <DatePicker
          locale={ko} // 언어설정 기본값은 영어
          dateFormat="yyyy-MM-dd" // 날짜 형식 설정
          className="input-datepicker" // 클래스 명 지정 css주기 위해
          minDate={tomorrow} // 선택할 수 있는 최소 날짜값 지정 오늘 +1        \
          popperPlacement="auto" // 화면 중앙에 팝업이 뜨도록
          closeOnScroll={true} // 스크롤을 움직였을 때 자동으로 닫히도록 설정 기본값 false
          placeholderText="롤링페이퍼 개봉 날짜 선택" // placeholder
          selected={date} // value
          onChange={(date: Date) => changeDate(date)} // 날짜를 선택하였을 때 실행될 함수
          onFocus={datePickerFocus}
          onBlur={datePickerFocusOut}
        />
      </div>
      <button onClick={handleRollingLink} css={CreateButton}>
        롤링페이퍼 생성
      </button>
    </div>
  );
}

const Background = css`
  position: relative;
  max-width: 500px;
  width: 100vw;
  height: 100%;
`;

const Info = css`
  padding-top: 15vh;
  font-size: 30px;
  @media screen and (max-width: 300px) {
    font-size: 20px;
  }
  margin-bottom: 2rem;
`;

const Writing = css`
  margin-top: 1vh;
  padding: 1vw;
  font-size: 1em;
`;

const Calendar = css`
  position: relative;
  margin-top: 5vh;
  text-align: center;
  @media screen and (min-width: 500px) {
    margin: 0 auto;
  }

  .react-datepicker-wrapper {
    margin-top: 2rem;
    input {
      height: 36px;
      text-align: center;
      border: solid 2px;
      border-radius: 5rem;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const CreateButton = css`
  position: absolute;
  bottom: 30px;
  margin: auto;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  color: white;
  background-color: #16453e;
  height: 60px;
  left: 5%;
  width: 90%;
  @media screen and (min-width: 500px) {
    bottom: 30px;
    left: 5%;
    width: 90%;
    height: 60px;
  }
`;
