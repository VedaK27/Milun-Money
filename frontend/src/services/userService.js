import axios from "axios";

import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' 
    ? 'http://localhost:5001/api/users' 
    : 'http://10.0.2.2:5001/api/users';

export const fetchUserByIdAPI = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`API Error while fetching user ${userId}:`, error);
    throw error;
  }
};

export const searchUsersAPI = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("API Error while searching users:", error);
    throw error;
  }
};