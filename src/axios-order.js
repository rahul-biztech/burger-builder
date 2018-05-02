import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-3211d.firebaseio.com/'
});

export default instance;