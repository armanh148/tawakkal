import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from './AdminContext';
import {
  LayoutDashboard, Package, ShoppingCart, Users, MessageSquare,
  LogOut, TrendingUp, Bell, Settings, Menu, X, ChevronUp, ChevronDown,
  Search, MoreVertical, CheckCircle, Clock, XCircle, Truck, Save,
  Eye, EyeOff, Trash2, Edit2, Check, Plus, Image
} from 'lucide-react';

const STATUS = {
  delivered: { label: 'Delivered', icon: CheckCircle, cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  shipped:   { label: 'Shipped',   icon: Truck,        cls: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  processing:{ label: 'Processing',icon: Clock,        cls: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  cancelled: { label: 'Cancelled', icon: XCircle,      cls: 'bg-red-500/10 text-red-400 border-red-500/20' },
};

/* ── Dashboard Home ── */
function DashHome() {
  const { products, orders, messages, totalRevenue, unreadCount, pendingOrders } = useAdmin();
  const activeProducts = products.filter(p => p.active).length;

  const stats = [
    { label: 'Total Revenue',   value: `PKR ${(totalRevenue || 0).toLocaleString()}`, icon: TrendingUp, color: '#e6a13b', sub: `${orders.filter(o=>o.status==='delivered').length} delivered` },
    { label: 'Total Orders',    value: orders.length,    icon: ShoppingCart,    color: '#6366f1', sub: `${pendingOrders} processing` },
    { label: 'Active Products', value: activeProducts,   icon: Package,         color: '#10b981', sub: `${products.length} total` },
    { label: 'Unread Messages', value: unreadCount,      icon: MessageSquare,   color: '#f43f5e', sub: `${messages.length} total` },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-gold/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2.5 rounded-xl" style={{ background: `${s.color}18` }}>
                <s.icon size={18} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white mb-1">{s.value}</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest">{s.label}</p>
            <p className="text-gray-600 text-xs mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-white font-semibold">Recent Orders</h3>
          <span className="text-xs text-gray-500">Showing latest 5</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/5">
              {['Order','Customer','Product','Amount','Status','Date'].map(h=>(
                <th key={h} className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-600">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {orders.slice(0,5).map(o=>{
                const s=STATUS[o.status]||STATUS.processing;
                return (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3 text-gold text-sm font-semibold">{o.id}</td>
                    <td className="px-5 py-3 text-white text-sm">{o.customer}</td>
                    <td className="px-5 py-3 text-gray-400 text-sm max-w-[180px] truncate">{o.product}</td>
                    <td className="px-5 py-3 text-white text-sm font-semibold">PKR {(Number(o.amount) || 0).toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${s.cls}`}>
                        <s.icon size={10}/>{s.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-gray-500 text-sm">{o.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Orders View ── */
function OrdersView() {
  const { orders, updateOrderStatus, deleteOrder } = useAdmin();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = orders.filter(o => {
    const q = search.toLowerCase();
    const orderId = String(o.order_id || o.id).toLowerCase();
    const customer = String(o.customer || '').toLowerCase();
    const product = String(o.product || '').toLowerCase();
    const match = orderId.includes(q) || customer.includes(q) || product.includes(q);
    return match && (filter === 'all' || o.status === filter);
  });

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <h2 className="text-xl font-serif text-white flex-1">Orders ({orders.length})</h2>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 w-44"
            placeholder="Search orders…"/>
        </div>
        <select value={filter} onChange={e=>setFilter(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/40">
          <option value="all">All Status</option>
          {Object.keys(STATUS).map(s=><option key={s} value={s}>{STATUS[s].label}</option>)}
        </select>
      </div>
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              {['Order','Customer','Product','Amount','Status','Date','Actions'].map(h=>(
                <th key={h} className="text-left px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(o=>{
                const s=STATUS[o.status]||STATUS.processing;
                return (
                  <tr key={o.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 text-gold text-sm font-semibold">{o.order_id || `#${o.id}`}</td>
                    <td className="px-5 py-3.5">
                      <p className="text-white text-sm">{o.customer}</p>
                      <p className="text-gray-500 text-xs">{o.email}</p>
                    </td>
                    <td className="px-5 py-3.5 text-gray-400 text-sm max-w-[160px] truncate">{o.product}</td>
                    <td className="px-5 py-3.5 text-white text-sm font-semibold">PKR {(Number(o.amount) || 0).toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <select value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)}
                        className={`text-[10px] font-bold uppercase rounded-full px-2.5 py-1 border bg-transparent cursor-pointer focus:outline-none ${s.cls}`}>
                        {Object.keys(STATUS).map(st=><option key={st} value={st} className="bg-gray-900 text-white">{STATUS[st].label}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-3.5 text-gray-500 text-sm">{o.date}</td>
                    <td className="px-5 py-3.5">
                      <button onClick={()=>deleteOrder(o.id)} className="p-1.5 text-gray-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5">
                        <Trash2 size={14}/>
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length===0&&<tr><td colSpan={7} className="px-5 py-10 text-center text-gray-500">No orders found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Products View ── */
function ProductsView() {
  const { products, createProduct, updateProduct, toggleProductActive } = useAdmin();
  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${import.meta.env.VITE_API_BASE_URL}${path}`;
  };
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showCreate, setShowCreate] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVals, setEditVals] = useState({});
  const [createVals, setCreateVals] = useState({ name: '', category: 'Ready to Wear', price: 'PKR 4,500', stock: 10, image: null, sizes: ['M', 'L'], colors: [{name: 'Black', hex: '#1a1a1a'}] });
  const [imagePreview, setImagePreview] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [editGalleryPreviews, setEditGalleryPreviews] = useState([]);
  const [customColorHex, setCustomColorHex] = useState('#ff0000');
  const [customColorName, setCustomColorName] = useState('');

  const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const ALL_COLORS = [
    { name: 'Black', hex: '#1a1a1a' },
    { name: 'Navy', hex: '#1e3a5f' },
    { name: 'Maroon', hex: '#800000' },
    { name: 'Beige', hex: '#d4c4b0' },
    { name: 'White', hex: '#f5f5f5' },
  ];

  const handleSizeToggle = (size) => {
    setCreateVals(v => ({
      ...v,
      sizes: v.sizes.includes(size) ? v.sizes.filter(s => s !== size) : [...v.sizes, size]
    }));
  };

  const handleColorToggle = (color) => {
    setCreateVals(v => {
      const exists = v.colors.some(c => c.name === color.name);
      return {
        ...v,
        colors: exists ? v.colors.filter(c => c.name !== color.name) : [...v.colors, color]
      };
    });
  };

  const handleAddCustomColor = () => {
    const name = customColorName.trim() || customColorHex.toUpperCase();
    const newColor = { name, hex: customColorHex };
    setCreateVals(v => {
      if (!v.colors.some(c => c.hex === customColorHex)) {
        return { ...v, colors: [...v.colors, newColor] };
      }
      return v;
    });
    setCustomColorName('');
  };

  const allAvailableColors = [...ALL_COLORS];
  createVals.colors.forEach(c => {
    if (!allAvailableColors.some(ac => ac.name === c.name)) {
      allAvailableColors.push(c);
    }
  });

  const removeCustomColor = (color) => {
    setCreateVals(v => ({
      ...v,
      colors: v.colors.filter(c => c.hex !== color.hex)
    }));
  };

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'all' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  const startEdit = (p) => { 
    setEditVals({ 
      ...p, 
      image: null, 
      sizes: p.sizes || [], 
      colors: p.colors || [] 
    }); 
    setEditImagePreview(getImageUrl(p.image));
    setEditGalleryPreviews(p.gallery?.map(img => ({ id: img.id, url: getImageUrl(img.image) })) || []);
    setShowEditModal(true); 
  };

  const saveEdit = async () => {
    try {
      const fd = new FormData();
      Object.keys(editVals).forEach(key => {
        if (key === 'sizes' || key === 'colors') {
          fd.append(key, JSON.stringify(editVals[key]));
        } else if (key === 'image') {
          if (editVals[key]) fd.append(key, editVals[key]);
        } else if (key === 'gallery') {
          if (editVals[key]) {
            editVals[key].forEach(file => fd.append('gallery', file));
          }
        } else if (key === 'id' || key === 'gallery_list') {
           // Skip id and existing gallery list from direct append
        } else {
          fd.append(key, editVals[key]);
        }
      });
      await updateProduct(editVals.id, fd); 
      setShowEditModal(false); 
      setEditVals({});
      setEditImagePreview(null);
      setEditGalleryPreviews([]);
    } catch (e) {
      alert("Failed to update product");
    }
  };

  const handleCreate = async () => {
    try {
      const fd = new FormData();
      Object.keys(createVals).forEach(key => {
        if (key === 'sizes' || key === 'colors') {
          fd.append(key, JSON.stringify(createVals[key]));
        } else if (key === 'gallery') {
          if (createVals[key]) {
            createVals[key].forEach(file => fd.append('gallery', file));
          }
        } else {
          fd.append(key, createVals[key]);
        }
      });
      await createProduct(fd);
      setShowCreate(false);
      setCreateVals({ name: '', category: 'Ready to Wear', price: 'PKR 4,500', stock: 10, image: null, gallery: [], sizes: ['M', 'L'], colors: [{name: 'Black', hex: '#1a1a1a'}] });
      setImagePreview(null);
      setGalleryPreviews([]);
    } catch (e) {
      alert("Failed to create product");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-serif text-white flex-1">Products ({products.length})</h2>
        <div className="relative hidden sm:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"/>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg pl-8 pr-4 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-gold/40 w-44"
            placeholder="Search products…"/>
        </div>
        <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-gold/40 hidden sm:block">
          <option value="all">All Categories</option>
          <option value="Ready to Wear">Ready to Wear</option>
          <option value="Unstitched">Unstitched</option>
          <option value="Luxe Edition">Luxe Edition</option>
          <option value="Embroidered">Embroidered</option>
          <option value="Accessories">Accessories</option>
          <option value="Jewelry">Jewelry</option>
        </select>
        <button onClick={() => setShowCreate(true)} className="gold-button px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
          <Plus size={14} /> New Product
        </button>
      </div>

      {showCreate && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-serif text-white mb-4">Create New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
              <input value={createVals.name} onChange={e=>setCreateVals(v=>({...v,name:e.target.value}))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all"/>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Category</label>
              <select value={createVals.category} onChange={e=>setCreateVals(v=>({...v,category:e.target.value}))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all">
                <option value="Ready to Wear" className="bg-charcoal text-white">Ready to Wear</option>
                <option value="Unstitched" className="bg-charcoal text-white">Unstitched</option>
                <option value="Luxe Edition" className="bg-charcoal text-white">Luxe Edition</option>
                <option value="Embroidered" className="bg-charcoal text-white">Embroidered</option>
                <option value="Accessories" className="bg-charcoal text-white">Accessories</option>
                <option value="Jewelry" className="bg-charcoal text-white">Jewelry</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Price (e.g. PKR 4,500)</label>
              <input value={createVals.price} onChange={e=>setCreateVals(v=>({...v,price:e.target.value}))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all"/>
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Initial Stock</label>
              <input type="number" value={createVals.stock} onChange={e=>setCreateVals(v=>({...v,stock:Number(e.target.value)}))}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all"/>
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Product Image (Main)</label>
              <div className="flex items-center gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    <button onClick={() => { setCreateVals(v => ({ ...v, image: null })); setImagePreview(null); }}
                      className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors">
                      <X size={10} />
                    </button>
                  </div>
                )}
                <label className="flex-1 cursor-pointer">
                  <div className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-5 text-center hover:border-gold/40 transition-all">
                    <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">
                      {createVals.image ? createVals.image.name : 'Click to Upload Main Image'}
                    </p>
                    <p className="text-gray-600 text-[10px]">PNG, JPG, WEBP up to 5MB</p>
                    <input type="file" accept="image/*" className="hidden" 
                      onChange={e => {
                        const file = e.target.files[0];
                        if (file) {
                          setCreateVals(v => ({ ...v, image: file }));
                          setImagePreview(URL.createObjectURL(file));
                        }
                      }} />
                  </div>
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Gallery Images</label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-3">
                {galleryPreviews.map((img, idx) => (
                  <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                    <img src={img.url} className="w-full h-full object-cover" />
                    <button type="button" onClick={() => {
                      setGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
                      setCreateVals(v => ({ ...v, gallery: v.gallery.filter(f => f !== img.file) }));
                    }} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X size={8} />
                    </button>
                  </div>
                ))}
                <label className="aspect-square bg-white/5 border border-white/10 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:border-gold/50 transition-all">
                  <Plus size={20} className="text-gray-500" />
                  <input type="file" accept="image/*" multiple className="hidden" 
                    onChange={e => {
                      const files = Array.from(e.target.files);
                      const newPreviews = files.map(f => ({ url: URL.createObjectURL(f), file: f }));
                      setGalleryPreviews(prev => [...prev, ...newPreviews]);
                      setCreateVals(v => ({ ...v, gallery: [...(v.gallery || []), ...files] }));
                    }} />
                </label>
              </div>
            </div>
            
            {/* Sizes Selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Available Sizes</label>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map(size => (
                  <button key={size} type="button" onClick={() => handleSizeToggle(size)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${createVals.sizes.includes(size) ? 'bg-gold text-charcoal' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Selection */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Available Colors</label>
              <div className="flex flex-wrap gap-2 mb-3">
                {allAvailableColors.map(color => {
                  const isSelected = createVals.colors.some(c => c.hex === color.hex);
                  const isCustom = !ALL_COLORS.some(ac => ac.hex === color.hex);
                  return (
                    <div key={color.hex} className="relative group">
                      <button key={color.name} type="button" onClick={() => handleColorToggle(color)} title={color.name}
                        style={{ backgroundColor: color.hex }}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex-shrink-0 ${isSelected ? 'border-gold scale-110 shadow-[0_0_10px_rgba(230,161,59,0.5)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                      />
                      {isCustom && (
                        <button type="button" 
                          onClick={(e) => { e.stopPropagation(); removeCustomColor(color); }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                          <X size={8} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 cursor-pointer">
                  <input type="color" value={customColorHex} 
                    onChange={e=>{
                      const hex = e.target.value;
                      setCustomColorHex(hex);
                      const name = customColorName.trim() || hex.toUpperCase();
                      setCreateVals(v => {
                        if (!v.colors.some(c => c.hex === hex)) {
                          return { ...v, colors: [...v.colors, { name, hex }] };
                        }
                        return v;
                      });
                    }}
                    className="absolute inset-[-10px] w-16 h-16 cursor-pointer p-0 m-0 border-0 outline-none" title="Choose color" />
                </div>
                <input value={customColorName} onChange={e=>setCustomColorName(e.target.value)} placeholder="Color Name (optional)"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-gold/40" />
                <button type="button" onClick={handleAddCustomColor}
                  className="gold-button px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex-shrink-0">
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={handleCreate} disabled={!createVals.name || !createVals.image} className="gold-button px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider disabled:opacity-50">
              Save Product
            </button>
            <button onClick={() => setShowCreate(false)} className="px-6 py-2.5 rounded-xl text-gray-400 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-white/10">
              {['Image','Name','Category','Price','Stock','Status','Actions'].map(h=>(
                <th key={h} className="text-left px-4 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.slice(0,50).map(p=>(
                <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <img src={getImageUrl(p.image)} alt={p.name} className="w-10 h-12 object-cover rounded-lg"/>
                  </td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-white text-sm truncate">{p.name}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {p.category}
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-gold text-sm font-semibold">{p.price}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-bold ${p.stock===0?'text-red-400':p.stock<15?'text-amber-400':'text-emerald-400'}`}>{p.stock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={()=>toggleProductActive(p.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border transition-all ${p.active?'bg-emerald-500/10 text-emerald-400 border-emerald-500/20':'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {p.active?'Active':'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="p-2 hover:bg-gold/10 text-gray-400 hover:text-gold rounded-lg transition-all">
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowEditModal(false)} />
          <div className="relative bg-[#1a1a1a] border border-white/10 rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl p-10">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Edit Product</h2>
                <p className="text-gray-500 text-sm tracking-wide">Customize your product details and variations</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-red-500/10 hover:text-red-500 rounded-full text-gray-400 transition-all">
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column: Basic Details */}
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3">Product Title</label>
                  <input value={editVals.name} onChange={e=>setEditVals(v=>({...v,name:e.target.value}))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-base focus:outline-none focus:border-gold/50 focus:bg-white/[0.08] transition-all"/>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3">Category</label>
                    <select value={editVals.category} onChange={e=>setEditVals(v=>({...v,category:e.target.value}))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-base focus:outline-none focus:border-gold/50 transition-all appearance-none">
                      <option value="Ready to Wear">Ready to Wear</option>
                      <option value="Unstitched">Unstitched</option>
                      <option value="Luxe Edition">Luxe Edition</option>
                      <option value="Embroidered">Embroidered</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Jewelry">Jewelry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3">Badge (Optional)</label>
                    <input value={editVals.badge || ''} onChange={e=>setEditVals(v=>({...v,badge:e.target.value}))} placeholder="e.g. New Arrival"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-base focus:outline-none focus:border-gold/50 transition-all"/>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3">Price</label>
                    <input value={editVals.price} onChange={e=>setEditVals(v=>({...v,price:e.target.value}))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-base focus:outline-none focus:border-gold/50 transition-all"/>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-3">Stock Units</label>
                    <input type="number" value={editVals.stock} onChange={e=>setEditVals(v=>({...v,stock:Number(e.target.value)}))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-base focus:outline-none focus:border-gold/50 transition-all"/>
                  </div>
                </div>

                {/* Sizes Selection */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-4">Available Sizes</label>
                  <div className="flex flex-wrap gap-3">
                    {['XS','S','M','L','XL','XXL'].map(s => {
                      const isSelected = editVals.sizes?.includes(s);
                      return (
                        <button key={s} type="button" 
                          onClick={() => {
                            const newsizes = isSelected 
                              ? editVals.sizes.filter(x => x !== s)
                              : [...(editVals.sizes || []), s];
                            setEditVals(v => ({ ...v, sizes: newsizes }));
                          }}
                          className={`w-12 h-12 rounded-2xl text-xs font-black transition-all border-2 ${isSelected ? 'bg-gold text-charcoal border-gold shadow-[0_0_20px_rgba(230,161,59,0.3)]' : 'bg-white/5 text-gray-500 border-white/10 hover:border-gold/50'}`}>
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Visuals & Variations */}
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-4">Product Visual (Main Image)</label>
                  <div className="flex items-center gap-6">
                    {editImagePreview && (
                      <div className="relative w-28 h-36 rounded-[1.5rem] overflow-hidden border-2 border-gold/30 flex-shrink-0 shadow-xl group">
                        <img src={editImagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <p className="text-[10px] text-white font-black uppercase tracking-widest">Replace</p>
                        </div>
                      </div>
                    )}
                    <label className="flex-1 cursor-pointer">
                      <div className="w-full h-36 bg-white/5 border-2 border-white/10 border-dashed rounded-[1.5rem] flex flex-col items-center justify-center hover:border-gold/50 hover:bg-white/[0.08] transition-all group">
                        <Plus className="text-gray-500 group-hover:text-gold mb-2 transition-colors" size={24} />
                        <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                          {editVals.image ? editVals.image.name : 'Upload New Main Image'}
                        </p>
                        <input type="file" accept="image/*" className="hidden" 
                          onChange={e => {
                            const file = e.target.files[0];
                            if (file) {
                              setEditVals(v => ({ ...v, image: file }));
                              setEditImagePreview(URL.createObjectURL(file));
                            }
                          }} />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Gallery Images */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-4">Gallery Images</label>
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    {editGalleryPreviews.map((img, idx) => (
                      <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                        <img src={img.url} className="w-full h-full object-cover" />
                        <button type="button" 
                          onClick={() => {
                            setEditGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
                            // If it's a new file
                            if (img.file) {
                              setEditVals(v => ({ ...v, gallery: v.gallery.filter(f => f !== img.file) }));
                            }
                            // Note: Existing images on server are not deleted here for simplicity
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                    <label className="aspect-square bg-white/5 border border-white/10 border-dashed rounded-xl flex items-center justify-center cursor-pointer hover:border-gold/50 transition-all">
                      <Plus size={20} className="text-gray-500" />
                      <input type="file" accept="image/*" multiple className="hidden" 
                        onChange={e => {
                          const files = Array.from(e.target.files);
                          const newPreviews = files.map(f => ({ url: URL.createObjectURL(f), file: f }));
                          setEditGalleryPreviews(prev => [...prev, ...newPreviews]);
                          setEditVals(v => ({ ...v, gallery: [...(v.gallery || []), ...files] }));
                        }} />
                    </label>
                  </div>
                </div>

                {/* Colors Selection */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gold mb-4">Color Palette</label>
                  <div className="flex flex-wrap gap-4 mb-6">
                    {[...ALL_COLORS, ...(editVals.colors || []).filter(c => !ALL_COLORS.some(ac => ac.hex === c.hex))].map(color => {
                      const isSelected = editVals.colors?.some(c => c.hex === color.hex);
                      const isCustom = !ALL_COLORS.some(ac => ac.hex === color.hex);
                      return (
                        <div key={color.hex} className="relative group">
                          <button type="button" 
                            onClick={() => {
                              const exists = editVals.colors?.some(c => c.hex === color.hex);
                              const newcolors = exists 
                                ? editVals.colors.filter(c => c.hex !== color.hex)
                                : [...(editVals.colors || []), color];
                              setEditVals(v => ({ ...v, colors: newcolors }));
                            }}
                            style={{ backgroundColor: color.hex }}
                            className={`w-10 h-10 rounded-full border-2 transition-all ${isSelected ? 'border-gold scale-125 shadow-[0_0_15px_rgba(230,161,59,0.5)] z-10' : 'border-transparent opacity-40 hover:opacity-100 hover:scale-110'}`}
                            title={color.name}
                          />
                          {isCustom && (
                            <button type="button" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditVals(v => ({ ...v, colors: v.colors.filter(c => c.hex !== color.hex) }));
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-lg">
                              <X size={10} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Add Custom Color</p>
                    <div className="flex gap-4">
                      <input type="color" value={customColorHex} onChange={e => {
                        setCustomColorHex(e.target.value);
                        const newColor = { name: e.target.value, hex: e.target.value };
                        if (!editVals.colors?.some(c => c.hex === newColor.hex)) {
                          setEditVals(v => ({ ...v, colors: [...(v.colors || []), newColor] }));
                        }
                      }} className="w-14 h-14 bg-transparent cursor-pointer rounded-2xl overflow-hidden border-2 border-white/10 hover:border-gold/50 transition-all" />
                      <div className="flex-1 space-y-2">
                        <input placeholder="Color Name (e.g. Midnight Blue)" value={customColorName} onChange={e => setCustomColorName(e.target.value)}
                          className="w-full bg-white/10 border border-white/5 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-gold/40" />
                        <p className="text-[9px] text-gray-600 italic">Tip: Color is added instantly when picked</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-12 pt-8 border-t border-white/5">
              <button onClick={saveEdit} className="gold-button flex-[2] py-5 rounded-[1.5rem] text-base font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                Push Changes
              </button>
              <button onClick={() => setShowEditModal(false)} className="flex-1 py-5 rounded-[1.5rem] text-gray-400 hover:text-white border border-white/10 text-base font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
                Discard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Messages View ── */
function MessagesView() {
  const { messages, markRead, deleteMessage, addReply } = useAdmin();
  const [active, setActive] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sent, setSent] = useState(false);
  const unread = messages.filter(m => !m.read).length;

  const openMessage = (m) => {
    setActive(m);
    markRead(m.id);
    setReplyText('');
    setSent(false);
  };

  const handleReply = () => {
    if (!replyText.trim() || !active) return;
    addReply(active.id, replyText.trim());
    setActive(prev => ({ ...prev, reply: replyText.trim() }));
    setSent(true);
    setReplyText('');
  };

  return (
    <div>
      <h2 className="text-xl font-serif text-white mb-6">
        Messages {unread > 0 && <span className="ml-2 bg-gold text-charcoal text-xs font-black px-2 py-0.5 rounded-full">{unread} new</span>}
      </h2>
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Inbox list */}
        <div className="space-y-2">
          {messages.map(m => (
            <div key={m.id} onClick={() => openMessage(m)}
              className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer border transition-all ${active?.id === m.id ? 'border-gold/40 bg-gold/5' : m.read ? 'border-white/5 bg-white/3 hover:bg-white/5' : 'border-gold/20 bg-gold/5'}`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-charcoal font-bold text-sm flex-shrink-0">
                {m.name[0]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-white text-sm font-semibold">{m.name}</p>
                  <span className="text-gray-600 text-xs">{new Date(m.time).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-400 text-xs truncate">{m.message}</p>
                {m.reply && <p className="text-emerald-400 text-[10px] mt-0.5">✓ Replied</p>}
              </div>
              {!m.read && <div className="w-2 h-2 rounded-full bg-gold flex-shrink-0 mt-1.5" />}
            </div>
          ))}
          {messages.length === 0 && <p className="text-gray-500 text-sm p-4">No messages yet. Messages from the Contact form will appear here.</p>}
        </div>

        {/* Message detail + reply */}
        {active ? (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white font-semibold">{active.name}</p>
                <a href={`mailto:${active.email}`} className="text-gold text-xs hover:underline">{active.email}</a>
              </div>
              <button onClick={() => { deleteMessage(active.id); setActive(null); }}
                className="p-1.5 text-gray-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5">
                <Trash2 size={14} />
              </button>
            </div>

            {/* Subject + message */}
            <div className="bg-white/5 rounded-xl p-4">
              <span className="inline-block text-[10px] uppercase tracking-widest text-gold font-bold bg-gold/10 px-2 py-0.5 rounded-full mb-2">{active.subject}</span>
              <p className="text-white/80 text-sm leading-relaxed">{active.message}</p>
              <p className="text-gray-600 text-xs mt-3">{new Date(active.time).toLocaleString()}</p>
            </div>

            {/* Previous reply bubble */}
            {active.reply && (
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1">Your Reply</p>
                <p className="text-white/80 text-sm leading-relaxed">{active.reply}</p>
              </div>
            )}

            {/* Reply box */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
                {active.reply ? 'Send Another Reply' : 'Reply'}
              </label>
              {sent && (
                <div className="mb-3 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  <p className="text-emerald-400 text-xs font-semibold">Reply sent and saved successfully!</p>
                </div>
              )}
              <textarea
                value={replyText}
                onChange={e => { setReplyText(e.target.value); setSent(false); }}
                rows={3}
                placeholder={`Reply to ${active.name}…`}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gold/40 resize-none transition-all"
              />
              <button
                onClick={handleReply}
                disabled={!replyText.trim()}
                className="mt-3 gold-button px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Save size={13} /> Send Reply
              </button>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex items-center justify-center bg-white/3 border border-white/5 rounded-2xl p-10 text-center">
            <div>
              <MessageSquare size={32} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">Select a message to read and reply</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Settings View ── */
function SettingsView() {
  const { settings, saveSettings } = useAdmin();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSave = () => { saveSettings(form); setSaved(true); setTimeout(()=>setSaved(false),2500); };

  return (
    <div>
      <h2 className="text-xl font-serif text-white mb-6">Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        {[
          { label:'Store Name', key:'storeName' },
          { label:'Admin Email', key:'email' },
          { label:'Phone', key:'phone' },
          { label:'WhatsApp Number', key:'whatsapp' },
          { label:'Currency', key:'currency' },
        ].map(f=>(
          <div key={f.key}>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{f.label}</label>
            <input value={form[f.key]||''} onChange={e=>setForm(v=>({...v,[f.key]:e.target.value}))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all"/>
          </div>
        ))}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Store Address</label>
          <textarea value={form.address||''} onChange={e=>setForm(v=>({...v,address:e.target.value}))} rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 resize-none"/>
        </div>
      </div>
      <button onClick={handleSave} className="mt-6 gold-button px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2">
        <Save size={14}/>{saved?'Saved!':'Save Changes'}
      </button>
    </div>
  );
}

/* ── Hero Banner View ── */
function BannerView() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bgPreview, setBgPreview] = useState(null);
  const [leftPreview, setLeftPreview] = useState(null);
  const [rightPreview, setRightPreview] = useState(null);
  const [form, setForm] = useState({ title: '', subtitle: '', bg_image: null, left_image: null, right_image: null });

  const token = sessionStorage.getItem('adminToken');
  const BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${BASE}/api/hero-banner/`)
      .then(r => r.json())
      .then(data => {
        if (data && data.id) {
          setBanner(data);
          setForm(f => ({ ...f, title: data.title || '', subtitle: data.subtitle || '' }));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFileChange = (field, file, setPreview) => {
    setForm(f => ({ ...f, [field]: file }));
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('subtitle', form.subtitle);
      fd.append('is_active', 'true');
      if (form.bg_image) fd.append('bg_image', form.bg_image);
      if (form.left_image) fd.append('left_image', form.left_image);
      if (form.right_image) fd.append('right_image', form.right_image);

      // If no bg_image is provided for new banner, we must have one
      const method = banner?.id ? 'PATCH' : 'POST';
      const url = banner?.id
        ? `${BASE}/api/hero-banner-manage/${banner.id}/`
        : `${BASE}/api/hero-banner-manage/`;

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (res.ok) {
        const data = await res.json();
        setBanner(data);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Save failed. Please try again.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setSaving(false);
    }
  };

  const ImageUploadBox = ({ label, field, preview, currentUrl, setPreview }) => (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">{label}</label>
      <div className="flex items-start gap-4">
        {/* Current/Preview Image */}
        <div className="relative w-20 h-24 rounded-xl overflow-hidden border border-white/10 flex-shrink-0 bg-white/5">
          {(preview || currentUrl) ? (
            <img src={preview || currentUrl} alt={label} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Image size={20} className="text-gray-600" />
            </div>
          )}
        </div>
        {/* Upload Area */}
        <label className="flex-1 cursor-pointer">
          <div className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-4 text-center hover:border-gold/40 transition-all">
            <p className="text-gray-400 text-[10px] uppercase tracking-widest font-bold mb-1">
              {form[field] ? form[field].name : 'Click to Upload'}
            </p>
            <p className="text-gray-600 text-[10px]">PNG, JPG, WEBP</p>
            <input type="file" accept="image/*" className="hidden"
              onChange={e => {
                const file = e.target.files[0];
                if (file) handleFileChange(field, file, setPreview);
              }} />
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-serif text-white mb-6">Hero Banner</h2>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center text-gray-500">Loading current banner…</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Current Banner Preview */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4">Current Live Banner</p>
            {banner?.bg_image ? (
              <div className="space-y-3">
                <div className="relative rounded-xl overflow-hidden aspect-video">
                  <img src={banner.bg_image} alt="Banner BG" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      {banner.title && <p className="text-white font-bold text-sm">{banner.title}</p>}
                      {banner.subtitle && <p className="text-gold text-xs">{banner.subtitle}</p>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {banner.left_image && (
                    <div>
                      <p className="text-[10px] text-gray-600 mb-1">Left Card</p>
                      <img src={banner.left_image} alt="Left" className="w-full aspect-[3/4] object-cover rounded-lg" />
                    </div>
                  )}
                  {banner.right_image && (
                    <div>
                      <p className="text-[10px] text-gray-600 mb-1">Right Card</p>
                      <img src={banner.right_image} alt="Right" className="w-full aspect-[3/4] object-cover rounded-lg" />
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-40 text-gray-600">
                <div className="text-center">
                  <Image size={32} className="mx-auto mb-2" />
                  <p className="text-sm">No banner uploaded yet</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Upload Form */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Upload New Banner</p>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Banner Title (Optional)</label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Luxury Defined"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all" />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Subtitle (Optional)</label>
              <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                placeholder="e.g. Experience the Art of Elegance"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-all" />
            </div>

            <ImageUploadBox label="Background Image" field="bg_image" preview={bgPreview} currentUrl={banner?.bg_image} setPreview={setBgPreview} />
            <ImageUploadBox label="Left Card Image (Unstitched)" field="left_image" preview={leftPreview} currentUrl={banner?.left_image} setPreview={setLeftPreview} />
            <ImageUploadBox label="Right Card Image (Ready to Wear)" field="right_image" preview={rightPreview} currentUrl={banner?.right_image} setPreview={setRightPreview} />

            {success && (
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                <CheckCircle size={14} className="text-emerald-400" />
                <p className="text-emerald-400 text-xs font-semibold">Banner saved and live on your website!</p>
              </div>
            )}

            <button onClick={handleSave} disabled={saving || (!banner?.id && !form.bg_image)}
              className="w-full gold-button py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50">
              <Save size={13} />
              {saving ? 'Saving…' : banner?.id ? 'Update Banner' : 'Upload Banner'}
            </button>

            {!banner?.id && !form.bg_image && (
              <p className="text-gray-600 text-[10px] text-center">Background image is required to create a banner</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Sidebar ── */
const NAV = [
  { id:'dashboard', label:'Dashboard', icon:LayoutDashboard },
  { id:'orders',    label:'Orders',    icon:ShoppingCart },
  { id:'products',  label:'Products',  icon:Package },
  { id:'messages',  label:'Messages',  icon:MessageSquare },
  { id:'banner',    label:'Hero Banner', icon:Image },
  { id:'settings',  label:'Settings',  icon:Settings },
];

function SidebarContent({ active, setActive, onClose, onLogout, unread, pending }) {
  return (
    <div className="w-64 h-full flex flex-col" style={{background:'#0a0a0a',borderRight:'1px solid rgba(255,255,255,0.07)'}}>
      <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <p className="text-gold font-serif text-xl italic">Tawakkal</p>
          <p className="text-gray-600 text-[10px] uppercase tracking-widest">Admin Panel</p>
        </div>
        {onClose&&<button onClick={onClose} className="text-gray-500 hover:text-white lg:hidden"><X size={20}/></button>}
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(item=>{
          const badge = item.id==='messages'?unread:item.id==='orders'?pending:0;
          return (
            <button key={item.id} onClick={()=>{setActive(item.id);onClose&&onClose();}}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${active===item.id?'bg-gold/10 text-gold border border-gold/20':'text-gray-500 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={17}/>
              <span className="flex-1 text-left">{item.label}</span>
              {badge>0&&<span className="bg-gold text-charcoal text-[10px] font-black px-1.5 py-0.5 rounded-full">{badge}</span>}
            </button>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-white/10">
        <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all">
          <LogOut size={17}/>Logout
        </button>
      </div>
    </div>
  );
}

/* ── Main ── */
function Dashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { unreadCount, pendingOrders } = useAdmin();
  const navigate = useNavigate();

  const token = sessionStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin');
    }
  }, [token, navigate]);

  if (!token) return null;

  const logout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('refreshToken');
    navigate('/admin');
  };

  const VIEWS = { dashboard:<DashHome/>, orders:<OrdersView/>, products:<ProductsView/>, messages:<MessagesView/>, banner:<BannerView/>, settings:<SettingsView/> };

  return (
    <div className="min-h-screen flex" style={{background:'#111',fontFamily:'Montserrat,sans-serif'}}>
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <SidebarContent active={active} setActive={setActive} onLogout={logout} unread={unreadCount} pending={pendingOrders}/>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen&&(
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setSidebarOpen(false)}/>
          <div className="relative z-10">
            <SidebarContent active={active} setActive={setActive} onClose={()=>setSidebarOpen(false)} onLogout={logout} unread={unreadCount} pending={pendingOrders}/>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b border-white/10"
          style={{background:'rgba(17,17,17,0.92)',backdropFilter:'blur(12px)'}}>
          <button onClick={()=>setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-white"><Menu size={22}/></button>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm capitalize">{active}</p>
            <p className="text-gray-600 text-xs">Welcome back, Admin</p>
          </div>
          <a href="/" target="_blank" className="hidden md:block text-xs text-gray-500 hover:text-gold transition-colors">View Site →</a>
          <div className="relative">
            <Bell size={18} className="text-gray-500 hover:text-white cursor-pointer transition-colors"/>
            {unreadCount>0&&<span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full"/>}
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-amber-700 flex items-center justify-center text-charcoal font-black text-xs">A</div>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          {VIEWS[active]}
        </main>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return <AdminProvider><Dashboard/></AdminProvider>;
}
