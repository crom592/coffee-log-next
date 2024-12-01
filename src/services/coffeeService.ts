import axios from 'axios';

export const fetchBeans = async () => {
  try {
    const response = await axios.get('/api/beans');
    return response.data;
  } catch (error) {
    console.error('Error fetching beans:', error);
    return [];
  }
};

export const fetchMethods = async () => {
  try {
    const response = await axios.get('/api/methods');
    return response.data;
  } catch (error) {
    console.error('Error fetching methods:', error);
    return [];
  }
};

export const createBean = async (name) => {
  try {
    const response = await axios.post('/api/beans', { name });
    return response.data;
  } catch (error) {
    console.error('Error creating bean:', error);
    return null;
  }
};

export const createMethod = async (name) => {
  try {
    const response = await axios.post('/api/methods', { name });
    return response.data;
  } catch (error) {
    console.error('Error creating method:', error);
    return null;
  }
};
