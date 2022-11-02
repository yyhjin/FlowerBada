import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';
import { Grid, Box } from '@mui/material';

interface FlowerItem {
  flowerId: number;
  name: string;
  point: number;
  flowerLanguage: string;
  season: string;
  price: number;
  imgUrl: string;
  imgBud: string;
  isOwned: boolean;
}

interface RollingItem {
  rollingId: number;
  name: string;
  capacity: number;
  point: number;
  price: number;
  imgUrl: string;
  imgFront: string;
  imgBack: string;
  isOwned: boolean;
}

const Store = () => {
  const [loginUser] = useRecoilState<IuserRecoil>(userReCoil);
  const [buying, setBuying] = useState(false); // 구매하기 버튼 눌렀는지 여부
  const [flowerItemList, setFlowerItemList] = useState<FlowerItem[]>();
  const [rollingItemList, setRollingItemList] = useState<RollingItem[]>();
  const [isFlower, setIsFlower] = useState(false); // 꽃다발이면 false, 꽃이면 true
  const [imgList, setImgList] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>();
  const [flowerName, setFlowerName] = useState<string>();
  const [flowerLanguage, setFlowerLanguage] = useState<string>();

  const imgRef = useRef();

  const handleBuying = () => {
    setBuying(true);
  };
  const handleList = () => {
    setIsFlower(!isFlower);
  };
  const setRolling = () => {
    setIsFlower(false);
  };
  const setFlower = () => {
    setIsFlower(true);
  };
  const toggleImg = (index: number) => {
    if (isFlower && flowerItemList) {
      setSelectedImg(flowerItemList[index].imgUrl);
      setFlowerName(flowerItemList[index].name);
      setFlowerLanguage(flowerItemList[index].flowerLanguage);
    } else if (!isFlower && rollingItemList) {
      setSelectedImg(rollingItemList[index].imgUrl);
      setFlowerName('');
      setFlowerLanguage('');
    }
  };

  function updateImgList() {
    let tmp: string[] = [];
    if (isFlower && flowerItemList) {
      flowerItemList.map((item: FlowerItem): void => {
        tmp.push(item.imgUrl);
      });
    } else if (rollingItemList) {
      rollingItemList.map((item: RollingItem): void => {
        tmp.push(item.imgUrl);
      });
    }
    setImgList(tmp);
    console.log(tmp);
  }

  // 탭 바뀔 때마다 해당하는 품목 리스트 가져오기
  useEffect(() => {
    if (isFlower) {
      axios
        .get('http://localhost:8080/api/v1/store/flower', {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        })
        .then((res: any) => {
          setFlowerItemList(res.data.response);
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      axios
        .get('http://localhost:8080/api/v1/store/rolling', {
          headers: {
            'X-AUTH-TOKEN': `Bearer ${loginUser.jwt}`,
          },
        })
        .then((res: any) => {
          setRollingItemList(res.data.response);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
    console.log(isFlower);
  }, [isFlower]);

  // 품목 리스트 가져오면 이미지 배열 갱신
  useEffect(() => {
    updateImgList();
  }, [flowerItemList, rollingItemList]);

  return (
    <div css={StoreDiv}>
      <div css={SelectedImgDiv}>
        {selectedImg ? (
          <div>
            <img src={selectedImg} />
            <div>{flowerName}</div>
            <div>{flowerLanguage}</div>
          </div>
        ) : null}
      </div>
      <button onClick={handleList}>toggle</button>
      <div css={TEMP}></div>
      <Grid container columns={12}>
        {imgList.map((image, index) => (
          <Grid xs={4} item key={index}>
            <img css={ItemImage} src={image} onClick={() => toggleImg(index)} />
          </Grid>
        ))}
      </Grid>
      <div>
        <button css={BuyButton} type="button" onClick={handleBuying}>
          <span css={BuyText}>구매하기</span>
        </button>
        {buying && (
          <Modal closeModal={() => setBuying(!buying)} isFlower={isFlower}>
            <Receipt />
          </Modal>
        )}
      </div>
    </div>
  );
};

const TEMP = css`
  margin: 20px;
`;

const SelectedImgDiv = css`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  div img {
    width: 160px;
    height: 160px;
  }
`;

const SelectedImg = css`
  width: 160px;
  height: 160px;
`;

const ItemImage = css`
  width: 80px;
  height: 80px;
`;

const StoreDiv = css`
  // margin-top: 70px;
`;

const BuyButton = css`
  position: absolute;
  left: 220px;
  top: 560px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
  background-color: #16453e;
  width: 300px;
`;

const BuyText = css`
  color: white;
  font-size: 10px
  margin-left: 30px;
  margin-right: 30px;
`;

export default Store;
