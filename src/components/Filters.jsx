import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const Filters = ({ filters, onFiltersChange, isOpen, onToggle }) => {
  const [tempFilters, setTempFilters] = useState(filters);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...tempFilters, [key]: value };
    setTempFilters(newFilters);
  };

  const handlePriceRangeChange = (min, max) => {
    const newFilters = { 
      ...tempFilters, 
      priceRange: { min: parseInt(min) || 0, max: parseInt(max) || 10000000 }
    };
    setTempFilters(newFilters);
  };

  const applyFilters = () => {
    onFiltersChange(tempFilters);
    onToggle();
  };

  const resetFilters = () => {
    const resetFilters = {
      brand: '',
      category: '',
      priceRange: { min: 0, max: 10000000 },
      sortBy: 'name'
    };
    setTempFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) {
    return (
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filter</span>
      </button>
    );
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">Filter & Urutkan</h3>
        <button onClick={onToggle} className="p-1 text-gray-400 hover:text-gray-600">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
        <select
          value={tempFilters.brand}
          onChange={(e) => handleFilterChange('brand', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua Brand</option>
          <option value="Informa">Informa</option>
          <option value="ACE">ACE Hardware</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
        <select
          value={tempFilters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Semua Kategori</option>
          <option value="Kursi">Kursi</option>
          <option value="Meja">Meja</option>
          <option value="Lemari">Lemari</option>
          <option value="Lampu">Lampu</option>
          <option value="Perkakas">Perkakas</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Rentang Harga</label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={tempFilters.priceRange?.min || ''}
            onChange={(e) => handlePriceRangeChange(e.target.value, tempFilters.priceRange?.max)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Max"
            value={tempFilters.priceRange?.max === 10000000 ? '' : tempFilters.priceRange?.max || ''}
            onChange={(e) => handlePriceRangeChange(tempFilters.priceRange?.min, e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Sort By */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Urutkan</label>
        <select
          value={tempFilters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="name">Nama A-Z</option>
          <option value="price-asc">Harga Termurah</option>
          <option value="price-desc">Harga Termahal</option>
          <option value="newest">Terbaru</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Terapkan
        </button>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Filters;
