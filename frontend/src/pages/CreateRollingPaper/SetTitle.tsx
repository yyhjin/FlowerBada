import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import { css } from '@emotion/react';

export default function SetTitle() {
  const navigate = useNavigate();
  const [createRollingState, setCreateRollingState] =
    useRecoilState<IcreateRollingRecoil>(createRollingRecoil);
  const changeTitle = (e: any) => {
    setCreateRollingState((prev: IcreateRollingRecoil) => {
      const variable = { ...prev };
      variable.title = e.target.value;
      return variable;
    });
  };

  const handleSetOpenDate = () => {
    if (createRollingState.title === '') {
      alert('제목 입력해라');
      return;
    }
    navigate('/newroll/date');
  };
  return (
    <div css={Background}>
      <div>
        <input
          value={createRollingState.title || ''}
          onChange={changeTitle}
          css={TitleInput}
          placeholder="제목을 입력하세요"
        ></input>
      </div>
      <img
        src={createRollingState.url}
        alt="선택한 꽃 사진"
        css={SelectImage}
      />

      <button onClick={handleSetOpenDate} css={NextButton}>
        날짜 선택
      </button>
    </div>
  );
}

const Background = css`
  width: 100vw;
`;

const TitleInput = css`
  padding-left: 10vw;
  font-size: 5vw;
  margin-top: 10vh;
  width: 50vw;
  border-radius: 2vw;
  border: 0;
  height: 5vh;
`;

const SelectImage = css`
  margin-top: 15vw;
  width: 100vw;
`;

const NextButton = css`
  margin-top: 7.3vh;
  height: 7vh;
  width: 94vw;
  border-radius: 3vw;
  color: white;
  font-size: 4vw;
  background-color: #16453e;
`;
