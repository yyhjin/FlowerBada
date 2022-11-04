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
  getRolling(url: string, paginationId: string) {
    return api({
      method: 'get',
      url: `${END_POINT}/${url}/${paginationId}`,
    });
  },
};

export default messageAPI;
