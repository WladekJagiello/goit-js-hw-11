import axios from 'axios';

export const fetchImages = async (q, page, perPage) => {
  const url = 'https://pixabay.com/api/';
  const key = '36947334-1b2cfdcdc118bbb31a8f1e368';

  return await axios.get(
    `${url}?key=${key}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
};
