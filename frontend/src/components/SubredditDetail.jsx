import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { subredditService } from "../services/api";

const SubredditDetail = () => {
  const { id } = useParams();
  const [subreddit, setSubreddit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchSubreddit();
    }
  }, [id]);

  const fetchSubreddit = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await subredditService.getSubredditById(id);
      setSubreddit(data);
    } catch (err) {
      setError("Error al cargar el subreddit");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center text-center gap-y-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchSubreddit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:scale-95 cursor-pointer "
        >
          Reintentar
        </button>
        <Link
          to="/"
          className="inline-flex items-center text-white px-4 py-2 bg-green-500 hover:bg-green-600 rounded animate-pulse active:scale-95 cursor-pointer "
        >
          ← Ir al Home
        </Link>
      </div>
    );
  }

  if (!subreddit) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Subreddit no encontrado</p>
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-600 mt-2 inline-block"
        >
          Volver a la lista
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Botón de regreso */}
      <Link
        to="/"
        className="inline-flex items-center text-blue-500 hover:text-blue-600 px-2.5 py-1.5 bg-gray-100 rounded-lg mb-6 cursor-pointer active:scale-95 animate-bounce"
      >
        ← Volver a la lista
      </Link>

      {/* Banner */}
      {subreddit.bannerImg && (
        <div className="mb-6">
          <img
            src={subreddit.bannerImg}
            alt={`Banner de r/${subreddit.displayName}`}
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      {/* Header del subreddit */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start space-x-6">
          {subreddit.iconImg && (
            <img
              src={subreddit.iconImg}
              alt={subreddit.displayName}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              r/{subreddit.displayName}
            </h1>
            {subreddit.title && (
              <p className="text-xl text-gray-600 mb-4">{subreddit.title}</p>
            )}
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                👥 {subreddit.subscribers?.toLocaleString() || 0} suscriptores
              </span>
              {subreddit.over18 && (
                <span className="flex items-center text-red-500">🔞 +18</span>
              )}
              {subreddit.lang && (
                <span className="flex items-center gap-1">
                  {subreddit.lang.toLowerCase() === "es" ? (
                    // 🇪🇸 SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="#ffb636"
                        d="M1.793 161.987v186.402c169.54 52.36 339.079-52.36 508.619 0V161.987c-169.54-52.36-339.079 52.359-508.619 0"
                      />
                      <path
                        fill="#e8e8e8"
                        d="M171.242 289.342h-36.121v-41.325h30.361a5.76 5.76 0 0 1 5.76 5.76z"
                      />
                      <path
                        fill="#e2a042"
                        d="M172.313 220.667h-31.481c.948-2.526 1.518-5.688 1.518-9.131c0-8.248-3.237-14.934-7.229-14.934s-7.229 6.686-7.229 14.934c0 3.443.57 6.605 1.518 9.131H97.959c-2.445 0-4.177 2.389-3.416 4.713l3.651 11.157a3.595 3.595 0 0 0 3.398 2.477l67.015.334a3.59 3.59 0 0 0 3.44-2.496l3.688-11.491c.745-2.321-.985-4.694-3.422-4.694"
                      />
                      <path
                        fill="#e8e8e8"
                        d="M87.304 281.017a9.304 9.304 0 1 0-18.608 0c0 3.705 2.171 6.894 5.304 8.391v31.509c0 .787.638 1.425 1.425 1.425h5.15c.787 0 1.425-.638 1.425-1.425v-31.509c3.134-1.497 5.304-4.686 5.304-8.391m111.667 0a9.304 9.304 0 1 0-18.608 0c0 3.705 2.17 6.894 5.304 8.391v31.509c0 .787.638 1.425 1.425 1.425h5.15c.787 0 1.425-.638 1.425-1.425v-31.509c3.133-1.497 5.304-4.686 5.304-8.391"
                      />
                      <path
                        fill="#ff473e"
                        d="M510.412 94.03v67.957c-169.54-52.36-339.079 52.36-508.619 0v-57.54c0-11.042 10.303-19.16 21.051-16.631c158.611 37.323 317.223-51.454 475.834-9.093c6.924 1.849 11.734 8.14 11.734 15.307M1.793 348.39v67.956c0 7.167 4.81 13.458 11.734 15.307c159.129 42.499 318.258-46.998 477.387-8.724c9.944 2.392 19.499-5.177 19.499-15.405v-59.136c-169.541-52.358-339.08 52.362-508.62.002m133.328-59.048v-41.325h-30.362A5.76 5.76 0 0 0 99 253.776v50.506c0 9.975 8.086 18.06 18.061 18.06s18.06-8.086 18.06-18.06c0 9.975 8.086 18.06 18.061 18.06s18.06-8.086 18.06-18.06v-14.94zm6.559-67.825c-4.372.174-8.745.353-13.117.528v18.481c4.372-.153 8.745-.312 13.117-.464zm-35.013 19.599a941 941 0 0 0 13.117-.303v-18.44c-4.372.154-8.745.289-13.117.38zm56.909-20.308c-4.372.092-8.745.227-13.117.381v18.586q6.559-.199 13.117-.304z"
                      />
                      <path
                        fill="#e2a042"
                        d="M127.793 289.342h7.328v14.94c0 5.949-2.89 11.211-7.328 14.501zm-21.465 29.441v-29.441H99v14.94c0 5.949 2.89 11.21 7.328 14.501m14.397-29.441h-7.328v32.627a18.1 18.1 0 0 0 7.328 0z"
                      />
                      <path
                        fill="#575a5b"
                        d="M147.459 289.342c0 6.814-5.524 12.338-12.338 12.338s-12.338-5.524-12.338-12.338s5.524-12.338 12.338-12.338s12.338 5.524 12.338 12.338m-60.155 35.089v-3.086a4.65 4.65 0 0 0-4.649-4.649h-9.31a4.65 4.65 0 0 0-4.649 4.649v3.086a4.65 4.65 0 0 0 4.649 4.649h9.31a4.65 4.65 0 0 0 4.649-4.649m111.667 0v-3.086a4.65 4.65 0 0 0-4.649-4.649h-9.31a4.65 4.65 0 0 0-4.649 4.649v3.086a4.65 4.65 0 0 0 4.649 4.649h9.31a4.65 4.65 0 0 0 4.649-4.649"
                      />
                    </svg>
                  ) : subreddit.lang.toLowerCase() === "en" ? (
                    // 🇺🇸 SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="#b22334"
                        d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2M18 9h18v2H18z"
                      />
                      <path
                        fill="#eee"
                        d="M.068 27.679q.025.14.059.277q.04.15.092.296c.089.259.197.509.333.743L.555 29h34.89l.002-.004a4 4 0 0 0 .332-.741a4 4 0 0 0 .152-.576c.041-.22.069-.446.069-.679H0c0 .233.028.458.068.679M0 23h36v2H0zm0-4v2h36v-2H18zm18-4h18v2H18zm0-4h18v2H18zM.555 7l-.003.005zM.128 8.044c.025-.102.06-.199.092-.297a4 4 0 0 0-.092.297M18 9h18c0-.233-.028-.459-.069-.68a3.6 3.6 0 0 0-.153-.576A4 4 0 0 0 35.445 7H18z"
                      />
                      <path fill="#3c3b6e" d="M18 5H4a4 4 0 0 0-4 4v10h18z" />
                      <path
                        fill="#fff"
                        d="m2.001 7.726l.618.449l-.236.725L3 8.452l.618.448l-.236-.725L4 7.726h-.764L3 7l-.235.726zm2 2l.618.449l-.236.725l.617-.448l.618.448l-.236-.725L6 9.726h-.764L5 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 9l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 9l-.235.726zm-8 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L5 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L9 13l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L13 13l-.235.726zm-6-6l.618.449l-.236.725L7 8.452l.618.448l-.236-.725L8 7.726h-.764L7 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 7l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 7l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 11l-.235.726zM6.383 12.9L7 12.452l.618.448l-.236-.725l.618-.449h-.764L7 11l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 11l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 11l-.235.726zm-12 4l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L3 15l-.235.726zM6.383 16.9L7 16.452l.618.448l-.236-.725l.618-.449h-.764L7 15l-.235.726h-.764l.618.449zm3.618-1.174l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L11 15l-.235.726zm4 0l.618.449l-.236.725l.617-.448l.618.448l-.236-.725l.618-.449h-.764L15 15l-.235.726z"
                      />
                    </svg>
                  ) : (
                    // 🌐 fallback
                    <span role="img" aria-label="Idioma">
                      🌐
                    </span>
                  )}
                  {subreddit.lang.toUpperCase()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Descripción */}
      {subreddit.publicDescription && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Descripción
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {subreddit.publicDescription}
          </p>
        </div>
      )}

      {/* Información adicional */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Información
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-600">URL:</span>
            {subreddit.url ? (
              <a
                href={`https://www.reddit.com${subreddit.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 ml-2"
              >
                {subreddit.url}
              </a>
            ) : (
              <span className="text-gray-400 ml-2">No disponible</span>
            )}
          </div>
          <div>
            <span className="font-medium text-gray-600">Creado:</span>
            <span className="ml-2 font-medium">
              {subreddit.createdAt
                ? new Date(subreddit.createdAt).toLocaleDateString("es-ES")
                : "No disponible"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Suscriptores:</span>
            <span className="ml-2 font-medium">
              {subreddit.subscribers?.toLocaleString() || 0}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Contenido +18:</span>
            <span className="ml-2 font-medium">
              {subreddit.over18 ? "Sí" : "No"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubredditDetail;
