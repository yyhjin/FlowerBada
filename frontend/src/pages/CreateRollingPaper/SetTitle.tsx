import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';
import { css } from '@emotion/react';
import MySwal from '@components/SweetAlert';

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
    if (createRollingState.title.trimStart().trimEnd() === '') {
      MySwal.fire({
        title: '제목을 입력하세요!',
        icon: 'warning',
        confirmButtonColor: '#16453e',
        confirmButtonText: '확인',
      });
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
          placeholder="제목을 입력하세요."
          maxLength={20}
        ></input>
        <div className="maxlength">{createRollingState.title.length} / 20</div>
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
  .maxlength {
    margin-right: 17vw;
    display: flex;
    justify-content: end;
  }
`;

const TitleInput = css`
  padding-left: 10vw;
  padding-right: 10vw;
  font-size: 5vw;
  margin-top: 10vh;
  width: 50vw;
  border-radius: 2vw;
  border: 0;
  height: 5vh;
  text-align: center;
`;

const SelectImage = css`
  margin-top: 15vw;
  width: 85vw;
  @media screen and (min-width: 400px) {
    margin-top: 20px;
    width: 250px;
  }
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
