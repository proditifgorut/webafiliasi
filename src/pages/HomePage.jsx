import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { generateMockProducts } from '../utils/mockData';

const HomePage = () => {
  const featuredProducts = generateMockProducts(8);
  
  const categories = [
    {
      id: 'furniture',
      name: 'Furnitur',
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/3b82f6/ffffff?text=Furnitur',
      productCount: 1250
    },
    {
      id: 'tools',
      name: 'Perkakas',
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/ef4444/ffffff?text=Perkakas',
      productCount: 890
    },
    {
      id: 'decor',
      name: 'Dekorasi',
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/10b981/ffffff?text=Dekorasi',
      productCount: 670
    },
    {
      id: 'lighting',
      name: 'Pencahayaan',
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/300x200/f59e0b/ffffff?text=Lampu',
      productCount: 420
    }
  ];

  const banners = [
    {
      id: 1,
      title: 'Koleksi Furnitur Terbaru',
      subtitle: 'Dapatkan diskon hingga 30% untuk semua produk Informa',
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/1200x400/2563eb/ffffff?text=Furnitur+Sale',
      cta: 'Belanja Sekarang'
    },
    {
      id: 2,
      title: 'Perkakas Berkualitas',
      subtitle: 'Lengkapi workshop Anda dengan produk ACE Hardware',
      image: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/1200x400/dc2626/ffffff?text=Tools+Collection',
      cta: 'Lihat Koleksi'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Temukan Rumah Impian Anda
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Furnitur berkualitas dan perkakas terpercaya dari brand terbaik
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/category/furniture"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Jelajahi Furnitur
              </Link>
              <Link
                to="/category/tools"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Lihat Perkakas
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kategori Pilihan
            </h2>
            <p className="text-xl text-gray-600">
              Temukan produk yang Anda butuhkan berdasarkan kategori
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {banners.map((banner, index) => (
              <motion.div
                key={banner.id}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{banner.title}</h3>
                    <p className="text-lg mb-4 opacity-90">{banner.subtitle}</p>
                    <button className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                      {banner.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Produk Terlaris
            </h2>
            <p className="text-xl text-gray-600">
              Pilihan terbaik dari brand Informa dan ACE Hardware
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/search"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Partner Resmi Terpercaya
            </h2>
            <div className="flex items-center justify-center space-x-8">
              <img
                src="https://img-wrapper.vercel.app/image?url=https://placehold.co/150x75/e11d48/ffffff?text=INFORMA"
                alt="Informa"
                className="h-12 grayscale hover:grayscale-0 transition-all"
              />
              <img
                src="https://img-wrapper.vercel.app/image?url=https://placehold.co/150x75/dc2626/ffffff?text=ACE"
                alt="ACE Hardware"
                className="h-12 grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
