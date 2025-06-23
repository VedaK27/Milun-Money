import axios from "axios" ;

const API_BASE_URL = "http://localhost:5001/api/user" ;

export const getIndividualPayments = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/individual/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching individual payments:", error);
        throw error;
    }
};

export const getPendingPaymentsFromUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pending/from/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pending payments from user:", error);
        throw error;
    }
};

export const getPendingPaymentsToUser = async (userId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/pending/to/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching pending payments to user:", error);
        throw error;
    }
};