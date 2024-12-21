import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch posts
export const fetchPosts = async () => {
  const response = await apiClient.get('/posts');
  return response.data;
};

// Function to fetch a single post
export const fetchPostById = async (id) => {
  const response = await apiClient.get(`/posts/${id}`);
  return response.data;
};
