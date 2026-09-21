import React, { useState } from 'react';
import CategoriesPage from './pages/CategoriesPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';

function App() {
    const [currentPage, setCurrentPage] = useState('categories');

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-slate-900 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold">Mini Envanter Yönetimi</h1>
                    <div className="space-x-4">
                        <button
                            onClick={() => setCurrentPage('products')}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                currentPage === 'products'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                            }`}
                        >
                            Ürünler
                        </button>
                        <button
                            onClick={() => setCurrentPage('categories')}
                            className={`px-4 py-2 rounded-lg font-semibold transition ${
                                currentPage === 'categories'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-slate-800 hover:bg-slate-700 text-gray-300'
                            }`}
                        >
                            Kategoriler
                        </button>
                    </div>
                </div>
            </nav>

            {/* Sayfa İçeriği */}
            <main className="container mx-auto p-6">
                {currentPage === 'categories' ? <CategoriesPage /> : <ProductsPage />}
            </main>
        </div>
    );
}

export default App;