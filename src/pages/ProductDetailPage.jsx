import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, MessageCircle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { generateMockProducts } from '../utils/mockData';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Mock product data - in real app, fetch by productId
  const product = {
    id: productId,
    name: 'Kursi Kantor Ergonomis Premium',
    brand: 'Informa',
    price: 2499000,
    originalPrice: 2999000,
    category: 'Kursi',
    description: 'Kursi kantor ergonomis dengan desain modern yang memberikan kenyamanan maksimal untuk aktivitas kerja sehari-hari. Dilengkapi dengan sandaran punggung yang dapat disesuaikan dan bantalan empuk berkualitas tinggi.',
    specifications: [
      { label: 'Material', value: 'Kulit Sintetis Premium' },
      { label: 'Dimensi', value: '65 x 65 x 120 cm' },
      { label: 'Berat Maksimal', value: '120 kg' },
      { label: 'Warna', value: 'Hitam, Coklat' },
      { label: 'Garansi', value: '2 Tahun' }
    ],
    images: [
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x600/3b82f6/ffffff?text=Chair+Front',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x600/3b82f6/ffffff?text=Chair+Side',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x600/3b82f6/ffffff?text=Chair+Back',
      'https://img-wrapper.vercel.app/image?url=https://placehold.co/600x600/3b82f6/ffffff?text=Chair+Detail'
    ],
    affiliateLink: 'https://informa.co.id/product/chair-ergonomic',
    rating: 4.8,
    reviewCount: 156
  };

  const relatedProducts = generateMockProducts(4);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    const message = `Halo, saya tertarik dengan produk ${product.name} (${formatPrice(product.price)})`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank');
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex 
                          ? 'border-blue-500' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <div className="flex items-center space-x-2">
                <img
                  src={product.brand === 'Informa' 
                    ? 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x40/e11d48/ffffff?text=INFORMA'
                    : 'https://img-wrapper.vercel.app/image?url=https://placehold.co/80x40/dc2626/ffffff?text=ACE'
                  }
                  alt={product.brand}
                  className="h-6"
                />
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">{product.category}</span>
              </div>

              {/* Product Name */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="text-3xl font-bold text-blue-600">
                  {formatPrice(product.price)}
                </div>
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="flex items-center space-x-2">
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded">
                      Hemat {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleBuyClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  <span>Beli di {product.brand}</span>
                </button>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat via WhatsApp</span>
                </button>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Deskripsi Produk</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Specifications */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Spesifikasi</h3>
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-600">{spec.label}</span>
                      <span className="font-medium text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Produk Terkait</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ProductDetailPage;
