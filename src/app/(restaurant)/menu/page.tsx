'use client'

import { useState } from 'react'

import type { MenuItem } from '@/lib/types'

interface Category {
  id: string
  name: string
  item_count: number
}

export default function RestaurantMenuPage() {
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Proteins', item_count: 4 },
    { id: '2', name: 'Rice Dishes', item_count: 3 },
    { id: '3', name: 'Sides', item_count: 3 },
    { id: '4', name: 'Drinks', item_count: 3 },
  ])

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: '1', name: 'Grilled Chicken (Half)', description: 'Half grilled chicken with our special marinade', price: 2500, image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', is_available: true, category_name: 'Proteins' },
    { id: '2', name: 'Grilled Chicken (Full)', description: 'Full grilled chicken with our special marinade', price: 4500, image_url: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400', is_available: true, category_name: 'Proteins' },
    { id: '3', name: 'Crispy Chicken Wings', description: '6 pieces of spicy crispy wings', price: 1800, image_url: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?w=400', is_available: true, category_name: 'Proteins' },
    { id: '4', name: 'Jollof Rice', description: 'Our signature jollof rice with grilled chicken', price: 2000, image_url: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400', is_available: true, category_name: 'Rice Dishes' },
    { id: '5', name: 'Fried Rice', description: 'Nigerian fried rice with mixed vegetables', price: 1800, image_url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400', is_available: false, category_name: 'Rice Dishes' },
    { id: '6', name: 'Coleslaw', description: 'Creamy fresh coleslaw', price: 500, image_url: 'https://images.unsplash.com/photo-1625938145744-e380515399bf?w=400', is_available: true, category_name: 'Sides' },
    { id: '7', name: 'Chapman', description: 'Nigerian signature citrus drink', price: 800, image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400', is_available: true, category_name: 'Drinks' },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    image_url: '',
    category: '',
  })

  const filteredItems = activeCategory
    ? menuItems.filter(item => item.category_name === activeCategory)
    : menuItems

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description || '',
      price: item.price,
      image_url: item.image_url || '',
      category: item.category_name || '',
    })
    setShowModal(true)
  }

  const handleAddItem = () => {
    setEditingItem(null)
    setFormData({ name: '', description: '', price: 0, image_url: '', category: categories[0]?.name || '' })
    setShowModal(true)
  }

  const handleSaveItem = () => {
    if (editingItem) {
      setMenuItems(prev => prev.map(item =>
        item.id === editingItem.id
          ? { ...item, ...formData, category_name: formData.category }
          : item
      ))
    } else {
      const newItem: MenuItem = {
        id: `new-${Date.now()}`,
        ...formData,
        is_available: true,
        category_name: formData.category,
      }
      setMenuItems(prev => [...prev, newItem])
    }
    setShowModal(false)
  }

  const handleToggleAvailability = (itemId: string) => {
    setMenuItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, is_available: !item.is_available } : item
    ))
  }

  const handleDeleteItem = (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setMenuItems(prev => prev.filter(item => item.id !== itemId))
    }
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Menu Management
          </h1>
          <p className="text-sm text-[#666666]">Manage your restaurant menu and items</p>
        </div>
        <button
          onClick={handleAddItem}
          className="btn-primary flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"/>
            <path d="M5 12h14"/>
          </svg>
          Add Item
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              !activeCategory ? 'bg-[#E85D04] text-white' : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
            }`}
          >
            All Items ({menuItems.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.name ? 'bg-[#E85D04] text-white' : 'bg-[#F5F5F5] text-[#666666] hover:bg-[#E5E5E5]'
              }`}
            >
              {cat.name} ({cat.item_count})
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F9FA]">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Item</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666] hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Price</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-[#666666]">Status</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-[#666666]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredItems.map((item) => (
                <tr key={item.id} className={!item.is_available ? 'opacity-60' : ''}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover bg-[#F5F5F5]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=Food'
                        }}
                      />
                      <div>
                        <p className="font-medium text-[#1A1A1A]">{item.name}</p>
                        <p className="text-xs text-[#666666] line-clamp-1">{item.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#666666] hidden md:table-cell">{item.category_name}</td>
                  <td className="px-4 py-3 text-sm font-medium text-[#1A1A1A]">₦{item.price.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.is_available
                          ? 'bg-[#2D6A4F]/10 text-[#2D6A4F]'
                          : 'bg-[#DC3545]/10 text-[#DC3545]'
                      }`}
                    >
                      {item.is_available ? 'Available' : 'Unavailable'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="p-2 text-[#666666] hover:text-[#E85D04] hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20h9"/>
                          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-[#666666] hover:text-[#DC3545] hover:bg-[#F5F5F5] rounded-lg transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"/>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#1A1A1A]" style={{ fontFamily: 'var(--font-poppins)' }}>
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18"/>
                  <path d="m6 6 12 12"/>
                </svg>
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Item Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Price (₦)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#666666] mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F5F5F5] text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#E85D04]"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={handleSaveItem}
                className="btn-primary w-full"
              >
                {editingItem ? 'Save Changes' : 'Add Item'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}