import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SubredditList from "./SubredditList";
import SubredditDetail from "./SubredditDetail";
import AdminPanel from "./AdminPanel";

export default function Home({ key }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Inicializar con el estado actual del token
    const token = localStorage.getItem('token');
    return !!token;
  });
  const [dataRefreshKey, setDataRefreshKey] = useState(0);

  // Verificar autenticación cuando cambie la key
  useEffect(() => {
    const token = localStorage.getItem('token');
    const authStatus = !!token;
    console.log('Authenticated:', authStatus);
    setIsAuthenticated(authStatus);
  }, [key]);

  // Función para manejar cambios de datos
  const handleDataChange = () => {
    setDataRefreshKey(prev => prev + 1);
  };

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated) {
    return (
      <main>
        <div className="max-w-6xl mx-auto p-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-600 mb-4">
            Temas populares de Reddit
          </h1>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
            <p className="text-yellow-800 text-lg">
              🔒 Inicia sesión para ver el contenido
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="max-w-6xl mx-auto p-6">
        {/* Panel de administración - solo en la página principal */}
        <Routes>
          <Route path="/" element={
            <>
              <AdminPanel onDataChange={handleDataChange} />
              <SubredditList key={dataRefreshKey} />
            </>
          } />
          <Route path="/subreddit/:id" element={<SubredditDetail />} />
        </Routes>
      </div>
    </main>
  );
}
