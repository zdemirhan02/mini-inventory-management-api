import React, { useState, useEffect } from 'react';
import api from '../api/axios.js';

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [categoryId, setCategoryId] = useState('');

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data);
        } catch (err) {
            console.error('Ürünler yüklenemedi:', err);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (err) {
            console.error('Kategoriler yüklenemedi:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !price || !stock || !categoryId) {
            alert('Lütfen tüm alanları doldurun!');
            return;
        }

        const payload = {
            name: name.trim(),
            description: 'Ürün açıklaması', // <-- Eklenen eksik alan!
            price: parseFloat(price),
            stockQuantity: parseInt(stock, 10),
            categoryId: parseInt(categoryId, 10)
        };

        try {
            await api.post('/products', payload);
            setName('');
            setPrice('');
            setStock('');
            setCategoryId('');
            fetchProducts();
        } catch (err) {
            console.error('Ürün eklenemedi:', err);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Yeni Ürün Ekle</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Ürün Adı"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Fiyat"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                    />
                    <input
                        type="number"
                        placeholder="Stok Miktarı"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                    />
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="p-2 border rounded-lg w-full"
                    >
                        <option value="">Kategori Seçin</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                    Ekle
                </button>
            </form>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Ürün Listesi</h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="border-b bg-gray-50">
                        <th className="p-3">ID</th>
                        <th className="p-3">Ürün Adı</th>
                        <th className="p-3">Fiyat</th>
                        <th className="p-3">Stok</th>
                        <th className="p-3">Kategori</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p) => (
                        <tr key={p.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">{p.id}</td>
                            <td className="p-3">{p.name}</td>
                            <td className="p-3">{p.price} ₺</td>
                            <td className="p-3">{p.stockQuantity ?? p.stock ?? '-'}</td>
                            <td className="p-3">{p.categoryName || p.category?.name || '-'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}