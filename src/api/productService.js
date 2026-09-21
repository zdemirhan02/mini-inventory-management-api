import api from './axios';

export const getProducts = (page = 0, size = 10, search = '') => {
    const params = { page, size };
    if (search) params.name = search;
    return api.get('/products', { params });
};

export const getProductById = (id) => {
    return api.get(`/products/${id}`);
};

export const createProduct = (productData) => {
    return api.post('/products', productData);
};

export const updateProduct = (id, productData) => {
    return api.put(`/products/${id}`, productData);
};

export const deleteProduct = (id) => {
    return api.delete(`/products/${id}`);
};