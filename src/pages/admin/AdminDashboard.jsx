import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  BarChart3, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  DollarSign 
} from 'lucide-react';
import { generateMockProducts } from '../../utils/mockData';
import ProductFormModal from '../../components/admin/ProductFormModal';
import CategoryFormModal from '../../components/admin/CategoryFormModal';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState(generateMockProducts(20));
  const [categories, setCategories] = useState([
    { id: 'cat1', name: 'Furnitur', count: 45 },
    { id: 'cat2', name: 'Perkakas', count: 32 },
    { id: 'cat3', name: 'Dekorasi', count: 28 },
    { id: 'cat4', name: 'Pencahayaan', count: 19 },
    { id: 'cat5', name: 'Penyimpanan', count: 15 }
  ]);

  // Modal States
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const stats = [
    { title: 'Total Produk', value: products.length, icon: Package, color: 'blue' },
    { title: 'Klik Afiliasi', value: '1,234', icon: Eye, color: 'green' },
    { title: 'Estimasi Komisi', value: 'Rp 45.6M', icon: DollarSign, color: 'yellow' },
    { title: 'Kategori Aktif', value: categories.length, icon: BarChart3, color: 'purple' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Product Modal Handlers
  const handleOpenProductModal = (product = null) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
    setIsProductModalOpen(false);
  };

  const handleSaveProduct = (productData) => {
    console.log('Saving product:', productData);
    if (selectedProduct) {
      // Logic to update product
      setProducts(products.map(p => p.id === selectedProduct.id ? { ...p, ...productData } : p));
    } else {
      // Logic to add new product
      setProducts([{ id: `prod-${Date.now()}`, ...productData }, ...products]);
    }
    handleCloseProductModal();
  };

  // Category Modal Handlers
  const handleOpenCategoryModal = (category = null) => {
    setSelectedCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleCloseCategoryModal = () => {
    setSelectedCategory(null);
    setIsCategoryModalOpen(false);
  };

  const handleSaveCategory = (categoryData) => {
    console.log('Saving category:', categoryData);
    if (selectedCategory) {
      setCategories(categories.map(c => c.id === selectedCategory.id ? { ...c, ...categoryData } : c));
    } else {
      setCategories([{ id: `cat-${Date.now()}`, name: categoryData.name, count: 0 }, ...categories]);
    }
    handleCloseCategoryModal();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
            <p className="text-gray-600">Kelola produk dan konten website RumaKita</p>
          </motion.div>

          {/* Navigation Tabs */}
          <div className="mb-8">
            <nav className="flex space-x-8 border-b border-gray-200">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'products', label: 'Kelola Produk' },
                { id: 'categories', label: 'Kategori' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-lg shadow-sm p-6"
                  >
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'products' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Kelola Produk</h2>
                  <p className="text-gray-600">Total {products.length} produk</p>
                </div>
                <div className="flex space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Cari produk..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <button onClick={() => handleOpenProductModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Tambah Produk</span>
                  </button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {products.slice(0, 10).map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name.length > 40 ? product.name.substring(0, 40) + '...' : product.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm text-gray-900">{product.brand}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap"><span className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap"><span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">{product.category}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            <button onClick={() => handleOpenProductModal(product)} className="text-blue-600 hover:text-blue-900 transition-colors"><Edit className="w-4 h-4" /></button>
                            <button className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'categories' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Kelola Kategori</h2>
                <button onClick={() => handleOpenCategoryModal()} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                  <Plus className="w-4 h-4" />
                  <span>Tambah Kategori</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.count} produk</p>
                      </div>
                      <div className="flex space-x-2">
                        <button onClick={() => handleOpenCategoryModal(category)} className="text-blue-600 hover:text-blue-900 transition-colors"><Edit className="w-4 h-4" /></button>
                        <button className="text-red-600 hover:text-red-900 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />
      <CategoryFormModal
        isOpen={isCategoryModalOpen}
        onClose={handleCloseCategoryModal}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
    </>
  );
};

export default AdminDashboard;
