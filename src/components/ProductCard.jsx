import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const ProductCard = ({ product }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBrandLogo = (brand) => {
    if (brand === 'Informa') {
      return 'https://img-wrapper.vercel.app/image?url=https://placehold.co/60x30/e11d48/ffffff?text=INFORMA';
    }
    return 'https://img-wrapper.vercel.app/image?url=https://placehold.co/60x30/dc2626/ffffff?text=ACE';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <img
              src={getBrandLogo(product.brand)}
              alt={product.brand}
              className="h-6 bg-white rounded px-2 py-1"
            />
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            <span className="text-sm text-gray-500">{product.brand}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
              {product.category}
            </span>
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
