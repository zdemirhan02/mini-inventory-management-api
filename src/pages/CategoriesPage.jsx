import React, { useState, useEffect } from 'react';
import api from '../api/axios';

export default function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await api.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Kategoriler çekilemedi:', error);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        try {
            await api.post('/categories', { name });
            setName('');
            fetchCategories();
        } catch (error) {
            console.error('Kategori eklenemedi:', error);
        }
    };

    return (
        <div className="space-y-6">
            <form onSubmit={handleAddCategory} className="flex gap-4 bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Kategori Adı"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700">
                    Ekle
                </button>
            </form>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-100">
                    <tr>
                        <th className="p-4">ID</th>
                        <th className="p-4">Kategori Adı</th>
                    </tr>
                    </thead>
                    <tbody>
                    {categories.map((cat) => (
                        <tr key={cat.id} className="border-t">
                            <td className="p-4">{cat.id}</td>
                            <td className="p-4">{cat.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}