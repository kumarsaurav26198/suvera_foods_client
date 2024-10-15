import axios from 'axios';
import { baseURL } from '../../services/apiEndPoints';

const axiosInstance = axios.create({
  baseURL: baseURL, 
  timeout: 10000, 
});

// Function to set the authorization header
export const setAuthToken = (token) => {
  if (token) {
    console.log("Setting Authorization token");
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log("Removing Authorization token");
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export default axiosInstance;
