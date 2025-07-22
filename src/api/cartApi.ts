import axios from 'axios';

const API_URL = 'http://192.168.6.209:3000/cart'; // thay bằng IP thật hoặc localhost

export const getCartByUser = async (userId: string) => {
  const res = await axios.get(`${API_URL}?userId=${userId}`);
  return res.data[0];
};

export const saveCart = async (userId: string, cartItems: any[]) => {
  const existing = await getCartByUser(userId);
  if (existing) {
    return axios.put(`${API_URL}/${existing.id}`, { userId, cartItems });
  } else {
    return axios.post(API_URL, { userId, cartItems });
  }
};
