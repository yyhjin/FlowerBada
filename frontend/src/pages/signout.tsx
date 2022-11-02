import axios from 'axios';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';

export default function SignOut() {
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const handleLogout = async () => {
    try {
      const res: any = await axios.post(
        'http://localhost:8080/api/v1/user/signout',
        {},
        {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        },
      );
      setLoginUser((prev: IuserRecoil) => {
        const variable = { ...prev };
        variable.id = 0;
        variable.userToken = '';
        variable.nickname = '';
        variable.points = 0;
        variable.jwt = '';
        return variable;
      });
      // alert('logout success!');
      window.location.href = '/';
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div>Logout</div>
      <button type="button" onClick={handleLogout}>
        Kakao Logout
      </button>
    </>
  );
}
