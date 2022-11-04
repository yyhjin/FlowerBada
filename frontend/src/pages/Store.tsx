import { css } from '@emotion/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { IuserRecoil, userReCoil } from '@recoil/userRecoil';
import Modal from '@src/components/store/BuyModal';
import Receipt from '@src/components/store/Receipt';
import { Grid } from '@mui/material';
import itemLocked from '@assets/itemLocked.png';
import coin from '@assets/coin.png';
import rollingImgItem from '@assets/fixed-size/rolling/rollingImgItem';
import flowerImgItem from '@assets/fixed-size/flower/flowerImgItem';

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
  const [isFlower, setIsFlower] = useState(false); // 탭이 꽃다발이면 false, 꽃이면 true
  const [isFlowerSelected, setIsFlowerSelected] = useState<boolean>(false);
  const [imgList, setImgList] = useState<string[]>([]);
  const [selectedImg, setSelectedImg] = useState<string>();
  const [flowerName, setFlowerName] = useState<string>();
  const [flowerLanguage, setFlowerLanguage] = useState<string>();
  const [point, setPoint] = useState<number>(0);
  const [itemId, setItemId] = useState<number>(0);
  const [owned, setOwned] = useState<boolean>(false);

  const handleBuying = () => {
    setBuying(true);
  };
  const setRolling = () => {
    setIsFlower(false);
  };
  const setFlower = () => {
    setIsFlower(true);
  };
  const toggleImg = (index: number) => {
    if (isFlower && flowerItemList) {
      setIsFlowerSelected(true);
      setSelectedImg(flowerImgItem[index].img);
      setFlowerName(flowerItemList[index].name);
      setFlowerLanguage(flowerItemList[index].flowerLanguage);
      setPoint(flowerItemList[index].point);
      setItemId(flowerItemList[index].flowerId);
      setOwned(flowerItemList[index].isOwned);
    } else if (!isFlower && rollingItemList) {
      setIsFlowerSelected(false);
      setSelectedImg(rollingImgItem[index].img);
      setFlowerName('');
      setFlowerLanguage('');
      setPoint(rollingItemList[index].point);
      setItemId(rollingItemList[index].rollingId);
      setOwned(rollingItemList[index].isOwned);
    }
  };
  const isOwned = (index: number): boolean => {
    if (isFlower && flowerItemList && flowerItemList[index]) {
      if (flowerItemList[index].isOwned) return true;
    } else if (!isFlower && rollingItemList && rollingItemList[index]) {
      if (rollingItemList[index].isOwned) return true;
    }
    return false;
  };

  function updateImgList() {
    let tmp: string[] = [];
    if (isFlower && flowerItemList) {
      flowerItemList.map((item: FlowerItem, index): void => {
        tmp.push(flowerImgItem[index].img);
      });
    } else if (rollingItemList) {
      rollingItemList.map((item: RollingItem, index): void => {
        tmp.push(rollingImgItem[index].img);
      });
    }
    setImgList(tmp);
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
  }, [isFlower]);

  // 품목 리스트 가져오면 이미지 배열 갱신
  useEffect(() => {
    updateImgList();
  }, [flowerItemList, rollingItemList]);

  return (
    <div css={StoreDiv}>
      <div css={points}>
        <span className="points">
          <img src={coin} className="coinImg" />
          {loginUser.points}
        </span>
      </div>
      <div css={SelectedImgDiv}>
        {selectedImg ? (
          <div>
            <img src={selectedImg} />
            <div>{flowerName}</div>
            <div>{flowerLanguage}</div>
          </div>
        ) : null}
      </div>
      <div css={SelectBtn}>
        {isFlower ? (
          <div>
            <button className="btn" onClick={setRolling}>
              꽃다발
            </button>
            <button className="active_btn" onClick={setFlower}>
              꽃
            </button>
          </div>
        ) : (
          <div>
            <button className="active_btn" onClick={setRolling}>
              꽃다발
            </button>
            <button className="btn" onClick={setFlower}>
              꽃
            </button>
          </div>
        )}
      </div>
      <div css={TEMP}></div>
      <Grid container columns={12} css={GridContainer}>
        {imgList.map((image: string, index: number) => (
          <Grid xs={4} item key={index}>
            {isOwned(index) ? (
              <div css={GridStyle}>
                <img
                  className="item_image"
                  src={image}
                  onClick={() => toggleImg(index)}
                />
              </div>
            ) : (
              <div css={GridStyle}>
                <img className="item_image" src={image} />
                <img
                  className="locked_image"
                  src={itemLocked}
                  onClick={() => toggleImg(index)}
                />
              </div>
            )}
          </Grid>
        ))}
      </Grid>
      <div>
        {selectedImg && !owned ? (
          <button css={BuyButton} type="button" onClick={handleBuying}>
            <span css={BuyText}>구매하기</span>
          </button>
        ) : null}
        {buying && (
          <Modal
            closeModal={() => setBuying(!buying)}
            isFlower={isFlowerSelected}
            itemId={itemId}
            price={point}
          >
            <Receipt points={loginUser.points} price={point} />
          </Modal>
        )}
      </div>
    </div>
  );
};

const StoreDiv = css`
  width: 100vw;
`;

const points = css`
  width: 30%;
  position: relative;
  float: right;
  text-align: auto;
  margin: auto;
  .coinImg {
    height: 15px;
    display: flex;
    text-align: auto;
    justify-content: center;
    padding-bottom: 2px;
    padding-right: 5px;
  }
  .points {
    display: flex;
    position: relative;
    float: right;
    right: 20px;
    text-align: left;
    font-size: 15px;
  }
`;

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

const SelectBtn = css`
  .btn {
    position: relative;
    top: 25px;
    border-radius: 15px;
    border: 1px solid transparent;
    background-color: #f2f0ef;
    width: 170px;
    height: 40px;
  }
  .active_btn {
    position: relative;
    top: 25px;
    border-radius: 15px;
    border: 1px solid transparent;
    background-color: white;
    width: 170px;
    height: 40px;
  }
`;

const GridContainer = css`
  width: 340px;
  height: 300px;
  overflow: scroll;
  margin: 0 auto;
  background-color: white;
  border-radius: 15px;
`;

const GridStyle = css`
  position: relative;

  .item_image {
    width: 80px;
    height: 80px;
    position: absolute;
  }
  .locked_image {
    width: 80px;
    height: 80px;
    position: absolute;
    z-index: 0;
    opacity: 35%;
  }
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
  font-size: 10px;
  /* margin-left: 30px;
  margin-right: 30px; */
`;

export default Store;
