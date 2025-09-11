export default function Header() {
  return (
    <header className="bg-gray-50  border-gray-300 shadow-md border-b sticky top-0 z-50">
      <div className=" flex flex-col md:flex-row justify-between items-center text-center px-2 md:px-6 py-4">
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
          <h1 className="text-xl md:text-2xl font-bold ">
            Explorador de Reddits, <span className="italic text-gray-600 text-shadow-sm">By Sergio Garcia</span>
          </h1>

          {/* Header Description */}
          <p>
            Patrocinado por <span className="text- font-bold text-gray-600 text-shadow-sm">PEDBOX. </span>
            Explora los subreddits más populares.
          </p>
        </div>
      </div>
    </header>
  );
}
