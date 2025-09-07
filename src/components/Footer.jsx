import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">RumaKita</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Platform terpercaya untuk menemukan furnitur berkualitas dan perkakas terbaik dari brand Informa dan ACE Hardware.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+62 812-3456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@rumakita.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Kategori</h3>
            <ul className="space-y-2">
              <li><Link to="/category/furniture" className="hover:text-blue-400 transition-colors">Furnitur</Link></li>
              <li><Link to="/category/tools" className="hover:text-blue-400 transition-colors">Perkakas</Link></li>
              <li><Link to="/category/decor" className="hover:text-blue-400 transition-colors">Dekorasi</Link></li>
              <li><Link to="/category/lighting" className="hover:text-blue-400 transition-colors">Pencahayaan</Link></li>
              <li><Link to="/category/storage" className="hover:text-blue-400 transition-colors">Penyimpanan</Link></li>
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="text-white font-semibold mb-4">Partner Resmi</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Informa</li>
              <li className="text-gray-400">ACE Hardware</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 RumaKita. Semua hak dilindungi. Platform afiliasi resmi Informa dan ACE Hardware.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
