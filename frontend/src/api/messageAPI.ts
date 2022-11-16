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

interface IImgUrl {
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

  updateRollingImg(jwt: string, refresh: string, url: string, data: IImgUrl) {
    return api({
      method: 'put',
      url: `${END_POINT}/updateimg/${url}`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
      data: data,
    });
  },

  getRollingImgUrl(jwt: string, refresh: string, url: string, data: IImgUrl) {
    return api({
      method: 'post',
      url: `${END_POINT}/getimgurl/${url}`,
      headers: {
        'X-AUTH-TOKEN': `Bearer ` + jwt,
        'REFRESH-TOKEN': 'Bearer ' + refresh,
      },
      data: data,
    });
  },
};

export default messageAPI;
