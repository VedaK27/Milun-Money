import axios from "axios";

import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' 
    ? 'http://localhost:5001/api/payments' 
    : 'http://10.0.2.2:5001/api/payments';

export const addPayment = async (paymentData) => {
  try {
    const res = await axios.post(`${API_URL}/create`, paymentData);
    return res.data;
  } catch (err) {
    throw err;
  }
};