// src/api/addressApi.ts
import axios from 'axios';

// Dùng IP của máy tính thật (KHÔNG dùng localhost)
const BASE_URL = 'http://192.168.6.209:3000';

export const getAddressesByUser = async (userId: string) => {
  const res = await axios.get(`${BASE_URL}/addresses?userId=${userId}`);
  return res.data;
};

export const addAddress = async (address: any) => {
  const res = await axios.post(`${BASE_URL}/addresses`, address);
  return res.data;
};

export const deleteAddress = async (id: number) => {
  const res = await axios.delete(`${BASE_URL}/addresses/${id}`);
  return res.data;
};

export const updateAddress = async (id: number, updated: any) => {
  const res = await axios.put(`${BASE_URL}/addresses/${id}`, updated);
  return res.data;
};
