import api from './axios';

export const getCategories = () => {
    return api.get('/categories');
};

export const createCategory = (categoryData) => {
    return api.post('/categories', categoryData);
};

export const deleteCategory = (id) => {
    return api.delete(`/categories/${id}`);
};