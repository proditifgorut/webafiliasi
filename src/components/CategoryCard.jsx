import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <Link
      to={`/category/${category.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      <div className="relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between text-white">
            <div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm opacity-90">{category.productCount} produk</p>
            </div>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
