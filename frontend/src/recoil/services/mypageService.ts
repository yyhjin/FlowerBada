import api from '../../api';
import axios from 'axios';
export const MypageService = {
  delivery: async (paginationId: number) => {
    const { data } = await axios.get(api.delivery());
    return data;
  },
};
