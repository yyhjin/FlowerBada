import api from '../../api';
import axios from 'axios';
export const UserService = {
  signIn: async () => {
    const { data } = await axios.get(api.signIn());
    return data;
  },
};
