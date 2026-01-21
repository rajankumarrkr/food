import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiArrowRight, FiShield } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login(credentials);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-primary text-white rounded-3xl flex items-center justify-center text-4xl shadow-2xl shadow-primary/40">
            <FiShield />
          </div>
          <h2 className="mt-8 text-4xl font-black text-dark tracking-tight">
            Admin <span className="text-primary italic">Portal</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Authorized access only. Please sign in to continue.
          </p>
        </div>

        <div className="card p-8 md:p-10 space-y-8 bg-white shadow-xl shadow-gray-200/50 border border-gray-100">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 animate-bounce">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-4 text-gray-400" />
                  <input
                    name="email"
                    type="email"
                    required
                    className="input-field pl-12"
                    placeholder="admin@foodking.com"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-4 text-gray-400" />
                  <input
                    name="password"
                    type="password"
                    required
                    className="input-field pl-12"
                    placeholder="••••••••"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="group relative w-full btn-primary py-4 text-lg flex items-center justify-center space-x-3"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <a href="/" className="text-sm font-bold text-gray-400 hover:text-primary transition-colors">
              &larr; Back to Customer Site
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 font-medium uppercase tracking-widest">
          Secure Session &bull; 256-bit Encryption
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
