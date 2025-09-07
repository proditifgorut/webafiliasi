import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const categories = [
    { id: 'furniture', name: 'Furnitur', path: '/category/furniture' },
    { id: 'tools', name: 'Perkakas', path: '/category/tools' },
    { id: 'decor', name: 'Dekorasi', path: '/category/decor' },
    { id: 'lighting', name: 'Pencahayaan', path: '/category/lighting' },
    { id: 'storage', name: 'Penyimpanan', path: '/category/storage' }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">RumaKita</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk, brand, atau kategori..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-blue-600"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Admin Login */}
          <div className="hidden md:flex items-center">
            <Link
              to="/admin/login"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Admin</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-blue-600"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Categories - Desktop */}
        <nav className="hidden md:block border-t border-gray-200">
          <div className="flex space-x-8 py-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.path}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk..."
                  className="w-full pl-4 pr-12 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Mobile Categories */}
          <nav className="py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={category.path}
                className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="block px-4 py-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 border-t border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
