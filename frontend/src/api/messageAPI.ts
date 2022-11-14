import api from './api';

const END_POINT = 'message';

interface IReportData {
  messageId: number;
  userId: number;
  content: string;
}

interface IMessageWriteData {
  content: string;
  flowerId: number;
  font: string;
  rollingId: number;
  writer: string;
}

interface IUpdateImgUrl {
  imgUrl: string;
}

const messageAPI = {
  messageCreate(messageId: number) {
    return api({
      method: 'get',
      url: `${END_POINT}/${messageId}`,
    });
  },
  report(data: IReportData) {
    return api({
      method: 'post',
      data: data,
      url: `${END_POINT}/report`,
    });
  },
  messageWrite(data: IMessageWriteData) {
    return api({
      method: 'post',
      url: `${END_POINT}`,
      data: data,
    });
  },
  getRolling(jwt: string, refresh: string, url: string, paginationId: number) {
    return api({
      method: 'get',
      url: `${END_POINT}/${url}/${paginationId}`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
    });
  },
  updateRollingImg(rollingUrl: string, data: IUpdateImgUrl) {
    return api({
      method: 'put',
      url: `${END_POINT}/updateimg/${rollingUrl}`,
      data: data,
    });
  },
  getAllMessage(rollingUrl: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/getall/${rollingUrl}`,
    });
  },
  // loginGetRolling(jwt: string, url: string, paginationId: number) {
  //   return api({
  //     method: 'get',
  //     url: `${END_POINT}/${LOGIN}/${url}/${paginationId}`,
  //     headers: {
  //       'X-AUTH-TOKEN': `Bearer ` + jwt,
  //     },
  //   });
  // },
};

export default messageAPI;
