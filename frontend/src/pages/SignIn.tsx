import axios from 'axios';
import Logout from '@pages/SignOut';
import { userReCoil } from '@recoil/userRecoil';
import { useRecoilState } from 'recoil';

export default function Login() {
  const [loginUser] = useRecoilState(userReCoil);
  // console.log('Login()', loginUser);
  const handleLogin = async () => {
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/user/signin',
      );
      let url: string = res.data.response.redirectURL;
      window.location.href = url;
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      {loginUser.jwt === '' ? (
        <>
          <div>Login</div>
          <button type="button" onClick={handleLogin}>
            Kakao Login
          </button>
        </>
      ) : (
        <Logout />
      )}
    </>
  );
}
