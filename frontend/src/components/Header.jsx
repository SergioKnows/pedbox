import { useState, useEffect } from "react";
import LoginPopup from "./LoginPopup";
import { authService } from "../services/api";

export default function Header({ onAuthChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Verificar si está logueado al cargar
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    onAuthChange?.(); // Notificar cambio de autenticación
  };

  const handleLogout = () => {
    authService.logout();
    setIsLoggedIn(false);
    onAuthChange?.(); // Notificar cambio de autenticación
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      <header className="bg-gray-50 border-gray-300 shadow-md border-b sticky top-0 z-50">
        <div className="flex flex-col md:flex-row justify-between items-center text-center px-2 md:px-6 py-4">
          {/* PEDBOX Logo */}
          <a
            href="https://pedbox.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="active:scale-95 transition"
          >
            <img
              src="/pedbox-logo.png"
              alt="PEDBOX"
              className="w-auto h-10 object-cover"
            />
          </a>

          <div className="flex flex-col justify-center items-center md:items-start text-purple-700">
            {/* Header Title */}
            <h1 className="text-xl md:text-2xl font-bold">
              Explorador de Reddits,{" "}
              <span className="italic text-gray-600 text-shadow-sm">
                By Sergio Garcia
              </span>
            </h1>

            {/* Header Description */}
            <p>
              Patrocinado por{" "}
              <span className="text- font-bold text-gray-600 text-shadow-sm">
                PEDBOX.{" "}
              </span>
              Explora los subreddits más populares.
            </p>
          </div>
          {/* Botón de login/logout debajo del header description */}
          <div className="text-center mt-5 md:mt-0">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 cursor-pointer active:scale-95"
              >
                Cerrar Sesión
              </button>
            ) : (
              <button
                onClick={handleShowLogin}
                className="bg-purple-700 text-white px-4 py-2 rounded text-sm hover:bg-purple-800 cursor-pointer active:scale-95 animate-pulse"
              >
                Iniciar Sesión
              </button>
            )}
          </div>
        </div>
      </header>

      <LoginPopup
        isOpen={showLogin}
        onLogin={handleLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}
