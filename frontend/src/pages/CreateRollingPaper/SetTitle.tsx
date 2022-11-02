import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  IcreateRollingRecoil,
  createRollingRecoil,
} from '@recoil/createRollingRecoil';

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
    <>
      <div>제목 정해</div>
      <div>{createRollingState.url}</div>
      <div>
        <input
          value={createRollingState.title || ''}
          onChange={changeTitle}
        ></input>
      </div>
      <button onClick={handleSetOpenDate}>날짜 선택</button>
    </>
  );
}
