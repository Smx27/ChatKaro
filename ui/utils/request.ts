import axios from "axios"; // Importing axios for making HTTP requests

// Base URL for the API, fetched from environment variables
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

/**
 * Props for Axios Request
 */
interface RequestProps {
  /**
   * Optional HTTP method, defaults to "GET" (e.g., 'GET', 'PUT', 'POST', etc.)
   */
  method?: string; 
  /**
   * URL endpoint for the HTTP request
   */
  url: string; 
  /**
   * Optional data to be sent with the request (for methods like 'POST' or 'PUT')
   */
  data?: any; 
}

/**
 * The function makes an HTTP request using axios.
 * 
 * @param {RequestProps} props - The props include the URL, method, and data for the request.
 * @returns {Promise} - Returns a promise that resolves to the response of the HTTP request.
 */
export const request = ({ url, method = "GET", data }: RequestProps) => {
  return axios({
    baseURL: API_BASE_URL, // Base URL for the API
    method: method, // HTTP method (default is 'GET')
    url: url, // URL endpoint for the request
    data: data, // Data to be sent with the request (if any)
  });
};
