import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Header from '../components/header/Header';
import { userReCoil } from '../recoil/userRecoil';
import Login from './SignIn';

export default function Layout() {
  const [loginUser] = useRecoilState(userReCoil);

  return (
    <>
      {loginUser.jwt === '' ? (
        <Login />
      ) : (
        <>
          <Header />
          <div>
            <h2>
              <strong>Main Page</strong>
            </h2>
            <Link to="/signout">로그아웃 하기</Link>
          </div>
          <Outlet />
        </>
      )}
    </>
  );
}
