import { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiX, FiUpload, FiImage } from 'react-icons/fi';
import { menuAPI } from '../../services/api';
import Loading from '../../components/common/Loading';

const AdminMenu = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Burgers',
    price: '',
    image: '',
    description: '',
    isAvailable: true
  });

  // Image upload states
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await menuAPI.getAll();
      setMenuItems(response.data.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching menu:', err);
      setError('Failed to fetch menu items. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await menuAPI.delete(id);
        setMenuItems(menuItems.filter(item => item._id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item.');
      }
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      const response = await menuAPI.toggleAvailability(id);
      setMenuItems(menuItems.map(item =>
        item._id === id ? response.data.data : item
      ));
    } catch (err) {
      console.error('Error toggling availability:', err);
      alert('Failed to update availability.');
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        description: item.description || '',
        isAvailable: item.isAvailable
      });
      setImagePreview(item.image);
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        category: 'Burgers',
        price: '',
        image: '',
        description: '',
        isAvailable: true
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);

      let imageUrl = formData.image;

      // Upload image if a new file is selected
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append('image', imageFile);
        const uploadRes = await menuAPI.uploadImage(uploadData);
        imageUrl = uploadRes.data.url;
      }

      const submissionData = { ...formData, image: imageUrl };

      if (editingItem) {
        const response = await menuAPI.update(editingItem._id, submissionData);
        setMenuItems(menuItems.map(item =>
          item._id === editingItem._id ? response.data.data : item
        ));
      } else {
        const response = await menuAPI.create(submissionData);
        setMenuItems([response.data.data, ...menuItems]);
      }
      handleCloseModal();
    } catch (err) {
      console.error('Error saving item:', err);
      alert(err.response?.data?.message || 'Failed to save menu item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && menuItems.length === 0) {
    return <Loading message="Loading menu items..." />;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-dark tracking-tight">Menu <span className="text-primary">Management</span></h1>
          <p className="text-gray-500 mt-1">Add, edit or remove items from your digitized menu.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="btn-primary flex items-center space-x-2 px-8"
        >
          <FiPlus />
          <span>Add New Item</span>
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for items..."
            className="input-field pl-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-all">
          <FiFilter />
          <span>Filters</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-xl font-bold border border-red-100 italic">
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item._id} className="card group overflow-hidden border-b-4 border-transparent hover:border-primary transition-all duration-300">
            <div className="relative h-48">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => handleToggleAvailability(item._id)}
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${item.isAvailable ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}
                >
                  {item.isAvailable ? 'In Stock' : 'Sold Out'}
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{item.category}</span>
                  <h3 className="text-xl font-bold text-dark">{item.name}</h3>
                </div>
                <span className="text-xl font-black text-dark">₹{item.price}</span>
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-50">
                <button
                  onClick={() => handleOpenModal(item)}
                  className="flex-1 flex items-center justify-center space-x-2 py-2.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all"
                >
                  <FiEdit2 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-12 h-10 flex items-center justify-center text-gray-400 border border-gray-100 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && !loading && (
          <div className="col-span-full py-20 text-center">
            <div className="text-gray-400 mb-4">
              <FiSearch size={48} className="mx-auto opacity-20" />
            </div>
            <h3 className="text-xl font-bold text-gray-400">No menu items found</h3>
            <p className="text-gray-500">Try adjusting your search or add a new item.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-scale-up max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-2xl font-black text-dark">
                {editingItem ? 'Edit' : 'Add New'} <span className="text-primary truncate">Menu Item</span>
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
              {/* Image Upload Area */}
              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-600">Item Image</label>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-48 h-48 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 overflow-hidden relative group">
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <label htmlFor="image-upload" className="cursor-pointer p-3 bg-white rounded-full text-dark hover:scale-110 transition-transform">
                            <FiUpload size={20} />
                          </label>
                        </div>
                      </>
                    ) : (
                      <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors">
                        <FiImage size={40} className="text-gray-300 mb-2" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Select Image</span>
                      </label>
                    )}
                    <input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <p className="text-sm text-gray-500 font-medium">Recommended: Square image, at least 800x800px. JPG, PNG or WebP.</p>
                    {imageFile && (
                      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">
                        <FiUpload size={12} />
                        <span>{imageFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Item Name</label>
                  <input
                    type="text"
                    required
                    className="input-field"
                    placeholder="e.g. Classic Burger"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Category</label>
                  <select
                    className="input-field bg-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Burgers">Burgers</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Starters">Starters</option>
                    <option value="Sides">Sides</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600">Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="input-field"
                    placeholder="299"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600">Description</label>
                <textarea
                  className="input-field resize-none h-24"
                  placeholder="Tell us about this delicious item..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                ></textarea>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isAvailable"
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                />
                <label htmlFor="isAvailable" className="text-sm font-bold text-gray-700">Available for ordering</label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || (!imagePreview && !editingItem)}
                  className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:translate-y-0"
                >
                  {isSubmitting ? 'Uploading & Saving...' : (editingItem ? 'Update Item' : 'Add Item')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
