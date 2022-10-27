import React from 'react';
import axios from 'axios';

export default function Login() {
  const handleLogin = async () => {
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/user/signin',
      );
      console.log(res);
      let url: string = res.data.response.redirectURL;
      window.location.href = url;
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <>
      <div>Login</div>
      <button type="button" onClick={handleLogin}>
        Kakao Login
      </button>
    </>
  );
}
