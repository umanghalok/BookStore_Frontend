import axios from 'axios';

const API_URL = 'https://bookstore-backend-232e.onrender.com/';


const userSignup = async (signup) => {
    return await axios.post(`${API_URL}/signup`,signup);
  };
  
const userLogin = async (login) => {
    return await axios.post(`${API_URL}/login`,login);
};
  
export {userSignup, userLogin};