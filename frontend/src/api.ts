const BASE_URL = 'http://localhost:8080/api/v1';

const USER_URL = '/user';
const ROLLING_URL = '/rolling';
const MESSAGE_URL = '/message';
const ADMIN_URL = '/admin';
const STORE_URL = '/store';
const GREENHOUSE_URL = '/greenhouse';
const MYPAGE_URL = '/mypage';
const PAYMENT_URL = '/payment';

const SIGNIN_URL = '/signin';
const SIGNOUT_URL = '/signout';

const CALLBACK_URL = '/callback';

const BOOKMARK_URL = '/bookmark';

const REPORT_URL = '/report';

const DELETE_URL = '/delete';

const BUY_URL = '/buy';
const FLOWER_URL = '/flower';
const SENT_URL = '/sent';

const DELIVERY_URL = '/delivery';
const MYPOINT_URL = '/mypoint';
const api = {
  // user
  signIn: () => BASE_URL + USER_URL + SIGNIN_URL,
  callBack: () => BASE_URL + USER_URL + SIGNIN_URL + CALLBACK_URL,
  signOut: () => BASE_URL + USER_URL + SIGNOUT_URL,

  // rolling
  rolling: () => BASE_URL + ROLLING_URL,
  rollingBookMark: () => BASE_URL + ROLLING_URL + BOOKMARK_URL,

  // message
  message: () => BASE_URL + MESSAGE_URL,
  messageReport: () => BASE_URL + MESSAGE_URL + REPORT_URL,

  // admin
  adminMessage: () => BASE_URL + ADMIN_URL + MESSAGE_URL + DELETE_URL,
  adminRolling: () => BASE_URL + ADMIN_URL + ROLLING_URL + DELETE_URL,

  //store
  storeFlower: () => BASE_URL + STORE_URL + BUY_URL + FLOWER_URL,
  storeRolling: () => BASE_URL + STORE_URL + BUY_URL + ROLLING_URL,

  //greenhouse
  houseSelect: () => BASE_URL + GREENHOUSE_URL + SENT_URL,
  houseBookMark: () => BASE_URL + GREENHOUSE_URL + BOOKMARK_URL,

  // mypage
  delivery: () => BASE_URL + MYPAGE_URL + DELIVERY_URL,
  myPoint: () => BASE_URL + MYPAGE_URL + MYPOINT_URL,

  //payment
  payment: () => BASE_URL + PAYMENT_URL,
};
export default api;
