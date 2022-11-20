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
  position: relative;
  width: 100vw;
  height: 100%;
  .maxlength {
    margin-top: 1vh;
    margin-right: 17vw;
    display: flex;
    justify-content: end;
  }
  @media screen and (min-width: 500px) {
    .maxlength {
      margin-right: 60px;
    }
  }
`;

const TitleInput = css`
  padding-left: 10vw;
  padding-right: 10vw;
  font-size: 100%;
  margin-top: 10vh;
  width: 50vw;
  border-radius: 8px;
  border: 0;
  height: 5vh;
  text-align: center;
  @media screen and (min-width: 500px) {
    padding-left: 20px;
    padding-right: 20px;
    width: 70%;
  }
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
  /* margin-bottom: 200px; */
  @media screen and (min-width: 500px) {
    bottom: 30px;
    left: 5%;
    width: 90%;
    height: 60px;
  }
`;
