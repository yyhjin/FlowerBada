import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Store() {
  sessionStorage.setItem('url', '/');
  useEffect(() => {
    getFlowerItemListFunc();
  }, []);
  const [flowerList, setFlowerList] = useState([]);
  async function getFlowerItemListFunc() {
    try {
      const res: any = await axios.get(
        'http://localhost:8080/api/v1/store/flower',
        {
          headers: {
            'X-AUTH-TOKEN': 'Bearer ' + sessionStorage.getItem('X-AUTH-TOKEN'),
          },
        },
      );
      console.log(res.data.response);
      setFlowerList(res.data.response);
    } catch (err: any) {
      console.log(err);
    }
  }
  return (
    <>
      <div>Store</div>
    </>
  );
}
