import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '43667424-dd140ea76a88c51b2026f12f2';

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`

  const response = await axios.get(url)
  return response.data;
    };