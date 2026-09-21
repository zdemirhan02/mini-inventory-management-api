import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct } from '../api/productService';
import { Search, Plus, Trash2, Edit } from 'lucide-react';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts(page, 10, search);
            setProducts(res.data.content || []);
            setTotalPages(res.data.totalPages || 0);
        } catch (err) {
            console.error('Ürünler yüklenirken hata oluştu:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page, search]);

    const handleDelete = async (id) => {
        if (window.confirm('Bu ürünü silmek istediğinize emin misiniz?')) {
            try {
                await deleteProduct(id);
                fetchProducts();
            } catch (err) {
                alert('Ürün silinemedi!');
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Ürün Yönetimi</h1>
                <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
                    onClick={() => alert('Ürün Ekleme Modalı yakında eklenecek')}
                >
                    <Plus className="w-4 h-4" /> Yeni Ürün Ekle
                </button>
            </div>

            {/* Arama Alanı */}
            <div className="mb-6 relative">
                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Ürün adı ile ara..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(0);
                    }}
                />
            </div>

            {/* Ürün Tablosu */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ürün Adı</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Açıklama</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Kategori</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fiyat</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stok</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">İşlemler</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {loading ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4">Yükleniyor...</td>
                        </tr>
                    ) : products.length === 0 ? (
                        <tr>
                            <td colSpan="6" className="text-center py-4 text-gray-500">Ürün bulunamadı.</td>
                        </tr>
                    ) : (
                        products.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.name}</td>
                                <td className="px-6 py-4 text-gray-500">{item.description || '-'}</td>
                                <td className="px-6 py-4 text-gray-500">{item.categoryName}</td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">{item.price} ₺</td>
                                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.stockQuantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.stockQuantity} adet
                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="w-5 h-5 inline" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* Sayfalama (Pagination) */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-6">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Önceki
                    </button>
                    <span className="text-sm font-medium">Sayfa {page + 1} / {totalPages}</span>
                    <button
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Sonraki
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;