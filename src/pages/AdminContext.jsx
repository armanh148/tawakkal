import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminCtx = createContext();
export const useAdmin = () => useContext(AdminCtx);

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    activeProducts: 0,
    unreadCount: 0,
    pendingOrders: 0
  });

  const navigate = useNavigate();

  const fetchWithAuth = async (url, options = {}) => {
    const token = sessionStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      throw new Error('No token');
    }
    const headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`,
    };
    
    // Don't set Content-Type if body is FormData (browser will set it with boundary)
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }
    const response = await fetch(`${API_BASE}${url}`, { ...options, headers });
    if (response.status === 401) {
      sessionStorage.removeItem('adminToken');
      navigate('/admin');
      throw new Error('Unauthorized');
    }
    if (!response.ok) throw new Error('API Error');
    return response.status !== 204 ? response.json() : null;
  };

  const loadData = async () => {
    try {
      const [pRes, oRes, mRes, sRes, statsRes] = await Promise.all([
        fetchWithAuth('/products/'),
        fetchWithAuth('/orders/'),
        fetchWithAuth('/messages/'),
        fetchWithAuth('/settings/'),
        fetchWithAuth('/dashboard/stats/')
      ]);
      setProducts(pRes);
      setOrders(oRes);
      setMessages(mRes);
      if (sRes.length > 0) setSettings(sRes[0]);
      setStats({
        totalRevenue: statsRes.total_revenue,
        totalOrders: statsRes.total_orders,
        activeProducts: statsRes.active_products,
        unreadCount: statsRes.unread_messages,
        pendingOrders: statsRes.pending_orders
      });
    } catch (e) {
      console.error("Error loading admin data:", e);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('adminToken')) {
      loadData();
    }
  }, []);

  /* ── Product actions ── */
  const createProduct = async (productData) => {
    try {
      const body = productData instanceof FormData ? productData : JSON.stringify(productData);
      const created = await fetchWithAuth(`/products/`, { method: 'POST', body });
      setProducts(ps => [created, ...ps]);
      loadData();
    } catch (e) {
      console.error(e);
      throw e;
    }
  };
  const updateProduct = async (id, patch) => {
    try {
      const body = patch instanceof FormData ? patch : JSON.stringify(patch);
      const updated = await fetchWithAuth(`/products/${id}/`, { method: 'PATCH', body });
      setProducts(ps => ps.map(p => p.id === id ? updated : p));
      loadData();
    } catch (e) {}
  };
  const toggleProductActive = async (id) => {
    const p = products.find(x => x.id === id);
    if (p) await updateProduct(id, { active: !p.active });
  };

  /* ── Order actions ── */
  const updateOrderStatus = async (id, status) => {
    try {
      const updated = await fetchWithAuth(`/orders/${id}/`, { method: 'PATCH', body: JSON.stringify({ status }) });
      setOrders(os => os.map(o => o.id === id ? updated : o));
      loadData();
    } catch (e) {}
  };
  const deleteOrder = async (id) => {
    try {
      await fetchWithAuth(`/orders/${id}/`, { method: 'DELETE' });
      setOrders(os => os.filter(o => o.id !== id));
      loadData();
    } catch (e) {}
  };

  /* ── Message actions ── */
  const markRead = async (id) => {
    try {
      const updated = await fetchWithAuth(`/messages/${id}/`, { method: 'PATCH', body: JSON.stringify({ read: true }) });
      setMessages(ms => ms.map(m => m.id === id ? updated : m));
      loadData();
    } catch (e) {}
  };
  const deleteMessage = async (id) => {
    try {
      await fetchWithAuth(`/messages/${id}/`, { method: 'DELETE' });
      setMessages(ms => ms.filter(m => m.id !== id));
      loadData();
    } catch (e) {}
  };
  const addReply = async (id, replyText) => {
    try {
      const updated = await fetchWithAuth(`/messages/${id}/`, { method: 'PATCH', body: JSON.stringify({ reply: replyText, read: true }) });
      setMessages(ms => ms.map(m => m.id === id ? updated : m));
      loadData();
    } catch (e) {}
  };

  /* ── Settings ── */
  const saveSettings = async (patch) => {
    try {
      if (settings.id) {
        const updated = await fetchWithAuth(`/settings/${settings.id}/`, { method: 'PATCH', body: JSON.stringify(patch) });
        setSettings(updated);
      }
    } catch (e) {}
  };

  return (
    <AdminCtx.Provider value={{
      products, createProduct, updateProduct, toggleProductActive,
      orders, updateOrderStatus, deleteOrder,
      messages, markRead, deleteMessage, addReply,
      settings, saveSettings,
      totalRevenue: stats.totalRevenue,
      unreadCount: stats.unreadCount,
      pendingOrders: stats.pendingOrders,
    }}>
      {children}
    </AdminCtx.Provider>
  );
};
