import { instance } from './axios';

export const getCategories = async () => {
    return (await instance.get('/categories')).data;
};
