import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import userAPI from '@api/userAPI';

export default function SignOut() {
  const [loginUser, setLoginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const handleLogout = async () => {
    try {
      await userAPI.signOut(loginUser.jwt);
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
