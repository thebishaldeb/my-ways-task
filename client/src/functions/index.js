import axios from 'axios';

export const getInternships = async () => {
  const request = await axios
    .get('/internships')
    .then(response => response.data);
  return request;
};

export const getInternship = async id => {
  const request = await axios
    .get(`/getInternship?id=${id}`)
    .then(response => response.data)
    .catch(e => console.log(e));
  return request;
};

export const getMessages = async (id, userId) => {
  const request = await axios
    .get(`/message?id=${id}&userId=${userId}`)
    .then(response => response.data)
    .catch(e => console.log(e));
  return request;
};
