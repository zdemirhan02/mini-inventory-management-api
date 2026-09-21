import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, FolderTree } from 'lucide-react';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path
            ? 'bg-indigo-700 text-white'
            : 'text-indigo-100 hover:bg-indigo-500 hover:text-white';
    };

    return (
        <nav className="bg-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center gap-2 text-white font-bold text-xl">
                            <Package className="h-8 w-8" />
                            <span>Stok Takip</span>
                        </div>
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link
                                to="/"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/')}`}
                            >
                                <Package className="h-4 w-4" />
                                Ürünler
                            </Link>
                            <Link
                                to="/categories"
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/categories')}`}
                            >
                                <FolderTree className="h-4 w-4" />
                                Kategoriler
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;