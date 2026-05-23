import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const endpoint = isLogin ? 'token/' : 'register/';
    const body = isLogin 
      ? { username: formData.email, password: formData.password }
      : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.detail || 'Something went wrong');
      }

      if (isLogin) {
        localStorage.setItem('accessToken', data.access);
        localStorage.setItem('refreshToken', data.refresh);
        navigate('/');
      } else {
        setIsLogin(true);
        setError('Account created! Please sign in.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-ivory min-h-screen text-charcoal pt-32 pb-20">
      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white p-8 shadow-2xl border border-gold/20">
          <div className="flex justify-center mb-8 gap-8 border-b border-gray-100 pb-4">
            <button 
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`uppercase tracking-widest text-sm font-bold pb-2 border-b-2 transition-colors ${isLogin ? 'border-gold text-charcoal' : 'border-transparent text-gray-400 hover:text-charcoal'}`}
            >
              Login
            </button>
            <button 
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`uppercase tracking-widest text-sm font-bold pb-2 border-b-2 transition-colors ${!isLogin ? 'border-gold text-charcoal' : 'border-transparent text-gray-400 hover:text-charcoal'}`}
            >
              Register
            </button>
          </div>

          {error && (
            <div className={`p-3 text-[10px] font-bold uppercase tracking-widest text-center mb-6 ${error.includes('created') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" 
                  placeholder="John Doe" 
                />
              </div>
            )}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" 
                placeholder="you@example.com" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-gold transition-colors bg-transparent text-sm" 
                placeholder="••••••••" 
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-charcoal text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gold transition-all mt-8 disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          {isLogin && (
            <div className="mt-6 text-center">
              <a href="#" className="text-[10px] text-gray-500 hover:text-gold uppercase tracking-widest transition-colors">Forgot your password?</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
