import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { Save } from 'lucide-react';

const CategoryFormModal = ({ isOpen, onClose, category, onSave }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (category) {
      setName(category.name || '');
    } else {
      setName('');
    }
  }, [category, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...category, name });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={category ? 'Edit Kategori' : 'Tambah Kategori Baru'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="category-name" className="block text-sm font-medium text-gray-700">Nama Kategori</label>
          <input
            type="text"
            id="category-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500"
          />
        </div>

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

export default CategoryFormModal;
