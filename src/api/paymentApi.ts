// src/api/paymentApi.ts
import axios from 'axios';

// Dùng IP của máy tính thật (KHÔNG dùng localhost)
const BASE_URL = 'http://192.168.6.209:3000';

export const getPaymentsByUser = async (userId: string) => {
  const res = await axios.get(`${BASE_URL}/paymentMethods?userId=${userId}`);
  return res.data;
};

export const addPayment = async (payment: any) => {
  const res = await axios.post(`${BASE_URL}/paymentMethods`, payment);
  return res.data;
};

export const deletePayment = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/paymentMethods/${id}`);
  return res.data;
};

export const updatePayment = async (id: number, updated: any) => {
  const res = await axios.put(`${BASE_URL}/paymentMethods/${id}`, updated);
  return res.data;
};
