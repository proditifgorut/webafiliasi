import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import { generateMockProducts } from '../utils/mockData';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    priceRange: { min: 0, max: 10000000 },
    sortBy: 'name'
  });

  const allProducts = generateMockProducts(24);

  const categoryNames = {
    furniture: 'Furnitur',
    tools: 'Perkakas',
    decor: 'Dekorasi',
    lighting: 'Pencahayaan',
    storage: 'Penyimpanan'
  };

  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      // Filter by brand
      if (filters.brand && product.brand !== filters.brand) return false;
      
      // Filter by category
      if (filters.category && product.category !== filters.category) return false;
      
      // Filter by price range
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
  }, [allProducts, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {categoryNames[categoryId] || 'Kategori'}
            </h1>
            <p className="text-gray-600">
              Menampilkan {filteredProducts.length} produk
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
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
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Tidak ada produk ditemukan
                  </h3>
                  <p className="text-gray-600">
                    Coba ubah filter pencarian Anda
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

export default CategoryPage;
