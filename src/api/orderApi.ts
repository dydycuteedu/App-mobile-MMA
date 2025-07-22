import axios from 'axios';

const BASE_URL = 'http://192.168.6.209:3000';

export const getOrdersByUser = async (userId: string) => {
  const response = await axios.get(`${BASE_URL}/orders?customerId=${userId}`);
  return response.data;
};

export const createOrder = async (order: any) => {
  console.log('✅ createOrder loaded'); // DI CHUYỂN VÀO TRONG HÀM
  const response = await axios.post(`${BASE_URL}/orders`, order);
  return response.data;
};

export const updateOrderStatus = async (id: string, status: string) => {
  const res = await axios.patch(`${BASE_URL}/orders/${id}`, { status });
  return res.data;
};


