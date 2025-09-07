import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Save, Upload } from 'lucide-react';

const ProductFormModal = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Informa',
    category: 'Kursi',
    price: '',
    affiliateLink: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        brand: product.brand || 'Informa',
        category: product.category || 'Kursi',
        price: product.price || '',
        affiliateLink: product.affiliateLink || '',
        description: product.description || '',
        image: product.image || '',
      });
    } else {
      // Reset form for new product
      setFormData({
        name: '',
        brand: 'Informa',
        category: 'Kursi',
        price: '',
        affiliateLink: '',
        description: '',
        image: 'https://img-wrapper.vercel.app/image?url=https://img-wrapper.vercel.app/image?url=https://placehold.co/400x400/cccccc/ffffff?text=New+Product',
      });
    }
  }, [product, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const categories = ['Kursi', 'Meja', 'Lemari', 'Lampu', 'Perkakas', 'Dekorasi'];
  const brands = ['Informa', 'ACE'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={product ? 'Edit Produk' : 'Tambah Produk Baru'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Image Section */}
          <div className="md:col-span-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">Gambar Produk</label>
            <img src={formData.image} alt="Preview" className="w-full h-auto rounded-lg object-cover aspect-square" />
            <div className="relative">
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="URL Gambar"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Form Fields Section */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nama Produk</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
              <select
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
              >
                {brands.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Kategori</label>
              <select
                name="category"
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Harga</label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="affiliateLink" className="block text-sm font-medium text-gray-700">Link Afiliasi</label>
              <input
                type="url"
                name="affiliateLink"
                id="affiliateLink"
                value={formData.affiliateLink}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Deskripsi</label>
          <textarea
            name="description"
            id="description"
            rows="4"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ProductFormModal;
