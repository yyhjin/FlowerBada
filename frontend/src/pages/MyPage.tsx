import CenterTab from '../component/CenterTab';
import styled from '@emotion/styled';

export default function MyPage() {
  sessionStorage.setItem('url', '/mypage');
  return (
    <>
      <FixBox>
        <CenterTab></CenterTab>
      </FixBox>
    </>
  );
}

const FixBox = styled.div`
  position: relative;
  width: 500px;
  height: 850px;
`;
