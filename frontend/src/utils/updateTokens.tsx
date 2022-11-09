import { IuserRecoil, userReCoil } from '@src/recoil/userRecoil';
import { useSetRecoilState } from 'recoil';

const updateTokens = (
  accessToken: string,
  refreshToken: string,
  setLoginUser: any,
): void => {
  // const setLoginUser = useSetRecoilState<IuserRecoil>(userReCoil);
  setLoginUser((prev: IuserRecoil) => {
    const variable = { ...prev };
    variable.jwt = accessToken;
    variable.refresh = refreshToken;
    return variable;
  });
};

export default updateTokens;
