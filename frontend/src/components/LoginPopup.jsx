import { useState } from 'react';
import { authService } from '../services/api';

export default function LoginPopup({ isOpen, onLogin, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.login(email, password);
      onLogin();
    } catch (err) {
      setError(err.response?.data?.error || 'Error de login');
    } finally {
      setLoading(false);
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.register(email, password);
      setError('Usuario registrado exitosamente. Ahora puedes hacer login.');
      // Limpiar campos después del registro
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.error || 'Error de registro');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 w-full max-w-sm mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón X para cerrar */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-xl font-bold cursor-pointer active:scale-95"
        >
          ×
        </button>
        
        <h2 className="text-xl font-bold text-center mb-4">Login / Registro</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {error && (
            <p className={`text-sm ${error.includes('exitosamente') ? 'text-green-600' : 'text-red-500'}`}>
              {error}
            </p>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRegister}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md disabled:opacity-50 cursor-pointer active:scale-95 hover:bg-blue-600"
            >
              {loading ? 'Cargando...' : 'Registrar'}
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-700 text-white py-2 rounded-md disabled:opacity-50 cursor-pointer active:scale-95 hover:bg-purple-800"
            >
              {loading ? 'Cargando...' : 'Entrar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
