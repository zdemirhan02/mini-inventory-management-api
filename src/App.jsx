import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductsPage from './pages/ProductsPage';
import CategoriesPage from './pages/CategoriesPage';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <Navbar />
                <main>
                    <Routes>
                        <Route path="/" element={<ProductsPage />} />
                        <Route path="/categories" element={<CategoriesPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;