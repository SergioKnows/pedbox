import { useState, useEffect } from "react";

const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Mostrar el botón solo cuando el usuario hace scroll hacia abajo
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Hacer scroll hacia arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Scroll suave
    });
  };

  // Añadir el listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="p-0 w-10 h-10 shink-0 bg-purple-700/50 md:bg-purple-700 text-2lx text-black rounded-full shadow-lg hover:bg-gray hover:text-white flex items-center justify-center cursor-pointer transition duration-200 ease-in-out hover:scale-105 active:scale-95"
          id="GoTop"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 36 36"
          >
            <path
              fill="white"
              d="M29.52 22.52L18 10.6L6.48 22.52a1.7 1.7 0 0 0 2.45 2.36L18 15.49l9.08 9.39a1.7 1.7 0 0 0 2.45-2.36Z"
              className="clr-i-outline clr-i-outline-path-1"
            />
            <path fill="none" d="M0 0h36v36H0z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default GoTop;
