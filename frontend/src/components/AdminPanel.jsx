import { useState } from 'react';
import { subredditService } from '../services/api';

export default function AdminPanel({ onDataChange }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFetchData = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await subredditService.fetchRedditData();
      setMessage(`✅ Datos cargados exitosamente: ${result.fetched} subreddits obtenidos`);
      // Notificar cambio de datos para re-renderizar
      onDataChange?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al cargar datos de Reddit');
    } finally {
      setLoading(false);
    }
  };

  const handleClearData = async () => {
    if (!window.confirm('⚠️ ¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await subredditService.clearAllData();
      setMessage(`🗑️ Datos borrados exitosamente: ${result.deleted} registros eliminados`);
      // Notificar cambio de datos para re-renderizar
      onDataChange?.();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al borrar datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        🛠️ Panel de Administración
      </h2>
      
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleFetchData}
            disabled={loading}
            className="w-auto bg-blue-500 text-white py-2 px-4 rounded-md disabled:opacity-50 cursor-pointer active:scale-95 hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Cargando...
              </>
            ) : (
              <>
                🔄 Cargar Datos
              </>
            )}
          </button>

          <button
            onClick={handleClearData}
            disabled={loading}
            className="w-auto bg-red-500 text-white py-2 px-4 rounded-md disabled:opacity-50 cursor-pointer active:scale-95 hover:bg-red-600 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Borrando...
              </>
            ) : (
              <>
                🗑️ Borrar Datos
              </>
            )}
          </button>
        </div>

        {message && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-green-800 text-sm">{message}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <p className="text-yellow-800 text-xs">
            💡 <strong>Nota:</strong> "Cargar Datos" obtiene los últimos subreddits de Reddit. 
            "Borrar Datos" elimina todos los registros de la base de datos.
          </p>
        </div>
      </div>
    </div>
  );
}
