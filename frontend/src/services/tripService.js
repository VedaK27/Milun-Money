import axios from "axios";

import { Platform } from 'react-native';

const API_URL = Platform.OS === 'ios' 
    ? 'http://localhost:5001/api/trips' 
    : 'http://10.0.2.2:5001/api/trips';


export const createTripAPI = async (tripData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, tripData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server Error" };
  }
};

// Get a specific trip by tripId
export const getTripByIdAPI = async (tripId) => {
  try {
    const response = await axios.get(`${API_URL}/${tripId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server Error" };
  }
};

// Get all trips
export const getAllTripsAPI = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Server Error" };
  }
};

// Get all trips for a specific user by userId
export const getUserTripsAPI = async (userId) => {
    try {
        const res = await axios.get(`${API_URL}/users/${userId}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching trips:", err.message);
        throw err;
    }
};

// export const getUserTrips = async (userId) => {
//   try {
//     console.log("In api services of getUserTrip:")
//     console.log("Making request to :" ,`${API_BASE_URL}/user/${userId}`)
//     const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user trips:", error.response?.data || error.message);
//     return { success: false, message: error.response?.data.message || error.message };
//   }
// };

export const fetchMembersByTrip = async (tripId) => {
    try {
      const response = await api.get(`${API_URL}/${tripId}/members`);
      return response.data;
    } catch (error) {
      throw error;
    }
};
