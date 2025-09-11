import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { subredditService } from "../services/api";

const SubredditList = () => {
  const [subreddits, setSubreddits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 9,
    total: 0,
  });

  useEffect(() => {
    fetchSubreddits();
  }, [pagination.page, pagination.pageSize]);

  const fetchSubreddits = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subredditService.getSubreddits(
        pagination.page,
        pagination.pageSize
      );
      setSubreddits(data.rows);
      setPagination((prev) => ({
        ...prev,
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
      }));
    } catch (err) {
      setError("Error al cargar los subreddits");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ 
      ...prev, 
      pageSize: parseInt(newPageSize), 
      page: 1 // Reset a página 1 cuando cambie el tamaño
    }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchSubreddits}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-600 text-shadow-sm mb-4 text-center">
        Temas populares de Reddit
      </h1>

      {/* Estadísticas y controles */}
      <div className="flex flex-col justify-center items-center bg-blue-50 p-4 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-blue-800">
            Mostrando {subreddits.length} de {pagination.total} Resultados
          </p>
          
          {/* Selector de elementos por página */}
          <div className="flex  items-center gap-2">
            <label htmlFor="pageSize" className="text-blue-800 font-medium">
              Mostrar:
            </label>
            <select
              id="pageSize"
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(e.target.value)}
              className="px-3 py-1 border border-blue-300 rounded-md bg-white text-blue-800 focus:outline-none focus:ring-1 focus:ring-purple-500 cursor-pointer"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={20}>20</option>
            </select>
            <span className="text-blue-800">por página</span>
          </div>
        </div>
      </div>

      {/* Lista de subreddits */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {subreddits.map((subreddit) => (
          <Link
            key={subreddit.id}
            to={`/subreddit/${subreddit.id}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-gray-200 active:scale-95 hover:scale-105 transition-all ease-in-out"
          >
            <div className="flex items-start space-x-4">
              {subreddit.iconImg && (
                <img
                  src={subreddit.iconImg}
                  alt={subreddit.displayName}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  r/{subreddit.displayName}
                </h3>
                {subreddit.title && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {subreddit.title}
                  </p>
                )}
                <div className="flex items-center mt-2 text-sm text-gray-500">
                  <span className="flex items-center">
                    👥 {subreddit.subscribers?.toLocaleString() || 0}{" "}
                    suscriptores
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 cursor-pointer"
          >
            Anterior
          </button>

          <span className="px-4 py-2 text-gray-700">
            Página {pagination.page} de {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default SubredditList;
