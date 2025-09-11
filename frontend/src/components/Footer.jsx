export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-300 mt-12">
      <div className="text-purple-700 mx-auto px-6 py-6">
        <p className="text-center  text-sm">
          Prueba Técnica - Desarrollador Fullstack
        </p>
        {/* Copyright */}
        <p className="text-xs text-center italic">
          Copyright © {currentYear} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
