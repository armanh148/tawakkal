import React, { useState, useEffect } from 'react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Clock, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: '',
    street: '',
    city: '',
    zip: '',
    isDefault: false
  });
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/auth');
      return;
    }

    setUser({
      name: 'Syed Jawwad',
      email: 'syedjawwad.tms@gmail.com',
      joined: 'May 2026',
      phone: '0300-1234567',
      image: null
    });

    setAddresses([
      {
        id: 1,
        type: 'Shipping Address',
        name: 'Syed Jawwad',
        street: 'Opposite GC University, Kotwali Road',
        city: 'Faisalabad',
        province: 'Punjab',
        zip: '38000',
        country: 'Pakistan',
        isDefault: true
      }
    ]);

    setProfileImage(localStorage.getItem('userImage'));

    setOrders([
      { 
        id: 'BL-88291', 
        date: '2026-05-10', 
        status: 'Delivered', 
        amount: '12,990', 
        items: [
          { name: 'Embroidered Lawn Suit', price: '6,495', qty: 2 }
        ] 
      },
      { 
        id: 'BL-88102', 
        date: '2026-05-08', 
        status: 'Processing', 
        amount: '9,650', 
        items: [
          { name: 'Luxe Chiffon Collection', price: '9,650', qty: 1 }
        ] 
      }
    ]);

    setLoading(false);
    window.scrollTo(0, 0);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userImage');
    navigate('/');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('userImage', reader.result);
        window.dispatchEvent(new Event('storage'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      name: addr.name,
      street: addr.street,
      city: addr.city,
      zip: addr.zip,
      isDefault: addr.isDefault
    });
    setShowAddressModal(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingAddress) {
      setAddresses(addresses.map(addr => addr.id === editingAddress.id ? { ...addr, ...addressForm } : addr));
    } else {
      const newAddress = {
        id: Date.now(),
        type: 'Shipping Address',
        ...addressForm,
        province: 'Punjab',
        country: 'Pakistan'
      };
      setAddresses([...addresses, newAddress]);
    }
    setShowAddressModal(false);
    setAddressForm({ name: '', street: '', city: '', zip: '', isDefault: false });
  };

  const handleDeleteAddress = (id) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="w-12 h-12 border-4 border-gold/30 border-t-gold rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="bg-ivory min-h-screen text-charcoal pt-32 pb-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4 space-y-4">
            <div className="bg-white p-8 shadow-xl border border-gold/10 rounded-2xl text-center relative group">
              <button 
                onClick={() => setShowEditProfile(true)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gold hover:bg-gold/5 rounded-lg transition-all"
                title="Edit Profile"
              >
                <Settings size={18} />
              </button>
              
              <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gold/20 overflow-hidden">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User size={40} className="text-gold" />
                )}
              </div>
              <h2 className="text-xl font-bold tracking-tight">{user?.name}</h2>
              <p className="text-gray-500 text-sm mb-6">{user?.email}</p>
              
              <button 
                onClick={() => setShowEditProfile(true)}
                className="w-full py-2.5 bg-gray-50 text-gray-500 text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gold/10 hover:text-gold transition-all"
              >
                Edit Profile
              </button>

              <div className="pt-6 mt-6 border-t border-gray-100 flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-lg font-bold text-charcoal">{orders.length}</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-charcoal">2</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Wishlist</p>
                </div>
              </div>
            </div>

            <nav className="bg-white shadow-xl border border-gold/10 rounded-2xl overflow-hidden">
              {[
                { id: 'orders', icon: Package, label: 'Order History' },
                { id: 'addresses', icon: MapPin, label: 'Addresses' },
                { id: 'settings', icon: Settings, label: 'Settings' },
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between p-5 text-sm font-bold uppercase tracking-widest transition-all border-b border-gray-50 last:border-0 ${activeTab === item.id ? 'bg-gold/5 text-gold' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <div className="flex items-center gap-4">
                    <item.icon size={18} />
                    {item.label}
                  </div>
                  <ChevronRight size={16} />
                </button>
              ))}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-5 text-sm font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'orders' && (
              <div className="bg-white p-8 md:p-12 shadow-xl border border-gold/10 rounded-2xl">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-bold tracking-tight">Order <span className="italic font-serif text-gold">History</span></h3>
                </div>

                {orders.length > 0 ? (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="group bg-ivory/30 border border-gray-100 rounded-2xl p-6 hover:border-gold/30 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                              <Package className="text-gold" size={24} />
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order ID</p>
                              <p className="font-bold text-charcoal">#{order.id}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Date</p>
                            <div className="flex items-center gap-2 text-sm font-medium">
                              <Clock size={14} className="text-gray-400" />
                              {order.date}
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Status</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-gold/10 text-gold'}`}>
                              {order.status}
                            </span>
                          </div>

                          <div>
                            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Total</p>
                            <p className="font-bold text-charcoal">PKR {order.amount}</p>
                          </div>

                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-charcoal text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-white p-8 md:p-12 shadow-xl border border-gold/10 rounded-2xl">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-2xl font-bold tracking-tight">Saved <span className="italic font-serif text-gold">Addresses</span></h3>
                  <button 
                    onClick={() => { setEditingAddress(null); setShowAddressModal(true); }}
                    className="bg-gold/10 text-gold px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold hover:text-white transition-all"
                  >
                    Add New Address
                  </button>
                </div>
                {addresses.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div key={addr.id} className="border-2 border-gold/30 rounded-2xl p-8 relative overflow-hidden">
                        {addr.isDefault && <div className="absolute top-0 right-0 bg-gold text-white px-4 py-1 text-[8px] font-bold uppercase tracking-widest rounded-bl-xl">Default</div>}
                        <p className="font-bold mb-2">{addr.type}</p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                          {addr.name}<br />
                          {addr.street}<br />
                          {addr.city}, {addr.province}, {addr.zip}<br />
                          {addr.country}
                        </p>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => handleEditAddress(addr)}
                            className="text-[10px] font-bold uppercase tracking-widest text-gold hover:underline"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteAddress(addr.id)}
                            className="text-[10px] font-bold uppercase tracking-widest text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-ivory/20 rounded-2xl border border-dashed border-gray-200">
                    <MapPin className="mx-auto text-gray-300 mb-4" size={32} />
                    <p className="text-gray-400 text-sm font-medium">No addresses saved yet.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white p-8 md:p-12 shadow-xl border border-gold/10 rounded-2xl">
                <h3 className="text-2xl font-bold tracking-tight mb-10">Account <span className="italic font-serif text-gold">Settings</span></h3>
                <form className="space-y-8 max-w-2xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                      <input defaultValue={user.name} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-gold transition-colors font-medium" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                      <input defaultValue={user.phone} className="w-full border-b border-gray-200 py-3 focus:outline-none focus:border-gold transition-colors font-medium" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                    <input defaultValue={user.email} disabled className="w-full border-b border-gray-200 py-3 bg-gray-50 text-gray-400 font-medium cursor-not-allowed" />
                  </div>
                  <div className="pt-4">
                    <button type="button" className="bg-charcoal text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all">Save Changes</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowAddressModal(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold tracking-tight">{editingAddress ? 'Edit' : 'Add'} <span className="italic font-serif text-gold">Address</span></h3>
                <button onClick={() => setShowAddressModal(false)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                  <input 
                    required
                    value={addressForm.name}
                    onChange={e => setAddressForm({...addressForm, name: e.target.value})}
                    placeholder="John Doe" 
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-medium text-sm" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Street Address</label>
                  <input 
                    required
                    value={addressForm.street}
                    onChange={e => setAddressForm({...addressForm, street: e.target.value})}
                    placeholder="House #, Street Name" 
                    className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-medium text-sm" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">City</label>
                    <input 
                      required
                      value={addressForm.city}
                      onChange={e => setAddressForm({...addressForm, city: e.target.value})}
                      placeholder="Faisalabad" 
                      className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-medium text-sm" 
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Postal Code</label>
                    <input 
                      required
                      value={addressForm.zip}
                      onChange={e => setAddressForm({...addressForm, zip: e.target.value})}
                      placeholder="38000" 
                      className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-medium text-sm" 
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 py-2">
                  <input 
                    type="checkbox" 
                    id="default-addr" 
                    className="w-4 h-4 accent-gold" 
                    checked={addressForm.isDefault}
                    onChange={e => setAddressForm({...addressForm, isDefault: e.target.checked})}
                  />
                  <label htmlFor="default-addr" className="text-xs font-bold uppercase tracking-widest text-charcoal/60">Set as default address</label>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-charcoal text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-xl"
                  >
                    {editingAddress ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedOrder(null)} />
          <div className="relative bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="bg-charcoal p-8 text-white flex justify-between items-center">
              <div>
                <h4 className="text-xl font-bold tracking-tight">Order #{selectedOrder.id}</h4>
                <p className="text-white/50 text-xs mt-1">Placed on {selectedOrder.date}</p>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedOrder.status === 'Delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gold/20 text-gold'}`}>
                {selectedOrder.status}
              </span>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Order Items</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-gray-500 text-xs mt-1">Qty: {item.qty} × PKR {item.price}</p>
                    </div>
                    <p className="font-bold">PKR {item.price}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">PKR {selectedOrder.amount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-emerald-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="font-bold uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="text-xl font-black text-gold">PKR {selectedOrder.amount}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedOrder(null)}
                className="w-full bg-charcoal text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setShowEditProfile(false)} />
          <div className="relative bg-white w-full max-w-xl rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="p-8 md:p-12">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-bold tracking-tight">Edit <span className="italic font-serif text-gold">Profile</span></h3>
                <button onClick={() => setShowEditProfile(false)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-8">
                {/* Image Upload Area */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <div className="w-32 h-32 bg-gold/5 rounded-full border-2 border-dashed border-gold/30 flex items-center justify-center overflow-hidden transition-all group-hover:border-gold/60">
                      {profileImage ? (
                        <img src={profileImage} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User size={40} className="text-gold/40" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 cursor-pointer rounded-full transition-all">
                      <span className="text-[10px] font-bold uppercase tracking-widest">Change Photo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                  </div>
                  <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-[0.2em] font-bold">Upload Profile Photo</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                    <input defaultValue={user.name} className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-medium text-sm" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Phone Number</label>
                    <input defaultValue={user.phone} className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-gold transition-colors font-medium text-sm" />
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 bg-charcoal text-white py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gold transition-all shadow-xl"
                  >
                    Save Changes
                  </button>
                  <button 
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 border border-gray-100 text-gray-400 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
