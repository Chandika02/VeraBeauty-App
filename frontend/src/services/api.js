import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = () => api.get('/products');
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getAIRecommendation = (quizAnswers) => api.post('/quiz/recommend', quizAnswers);

export default api;