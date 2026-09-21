import React, { useEffect, useState } from 'react';
import { getCategories, createCategory, deleteCategory } from '../api/categoryService';
import { Plus, Trash2, FolderTree } from 'lucide-react';

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await getCategories();
            setCategories(res.data || []);
        } catch (err) {
            console.error('Kategoriler yüklenirken hata oluştu:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        if (!name.trim()) return;

        try {
            await createCategory({ name });
            setName('');
            fetchCategories();
        } catch (err) {
            alert('Kategori eklenirken hata oluştu!');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
            try {
                await deleteCategory(id);
                fetchCategories();
            } catch (err) {
                alert('Kategori silinemedi!');
            }
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FolderTree className="w-7 h-7 text-indigo-600" /> Kategori Yönetimi
            </h1>

            {/* Kategori Ekleme Formu */}
            <form onSubmit={handleCreate} className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
                <input
                    type="text"
                    placeholder="Yeni kategori adı..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                >
                    <Plus className="w-4 h-4" /> Ekle
                </button>
            </form>

            {/* Kategori Listesi */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <ul className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="p-4 text-center text-gray-500">Yükleniyor...</li>
                    ) : categories.length === 0 ? (
                        <li className="p-4 text-center text-gray-500">Henüz kategori bulunmuyor.</li>
                    ) : (
                        categories.map((cat) => (
                            <li key={cat.id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                <span className="font-medium text-gray-800">{cat.name}</span>
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="text-red-600 hover:text-red-900 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CategoriesPage;