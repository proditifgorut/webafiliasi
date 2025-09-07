import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { generateMockProducts } from '../utils/mockData';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    priceRange: { min: 0, max: 10000000 },
    sortBy: 'name'
  });

  const allProducts = generateMockProducts(32);

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !product.name.toLowerCase().includes(query) &&
          !product.brand.toLowerCase().includes(query) &&
          !product.category.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // Brand filter
      if (filters.brand && product.brand !== filters.brand) return false;
      
      // Category filter
      if (filters.category && product.category !== filters.category) return false;
      
      // Price range filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) return false;
      
      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [allProducts, searchQuery, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Results Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Hasil pencarian "${searchQuery}"` : 'Semua Produk'}
            </h1>
            <p className="text-gray-600">
              Menampilkan {filteredProducts.length} produk
              {searchQuery && ` untuk "${searchQuery}"`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <Filters
                  filters={filters}
                  onFiltersChange={setFilters}
                  isOpen={isFilterOpen}
                  onToggle={() => setIsFilterOpen(!isFilterOpen)}
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              {filteredProducts.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="text-center py-16"
                >
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {searchQuery 
                      ? `Tidak ada hasil untuk "${searchQuery}"`
                      : 'Tidak ada produk ditemukan'
                    }
                  </h3>
                  <p className="text-gray-600">
                    {searchQuery 
                      ? 'Coba gunakan kata kunci yang berbeda atau ubah filter pencarian'
                      : 'Coba ubah filter pencarian Anda'
                    }
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SearchPage;
