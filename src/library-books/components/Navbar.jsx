export const Navbar = ({ onOpenSidebar, sidebarOpen }) => {
  return (
    <header
      className={`fixed top-0 h-[60px] 
            bg-[#F8F8F8] text-gray-800 flex justify-between items-center shadow z-[1010] 
            px-4 md:px-5 transition-all duration-300
            ${
              sidebarOpen
                ? "left-0 w-full sm:left-[250px] sm:w-[calc(100%-250px)]"
                : "left-0 w-full"
            }`}
    >
      <div className="flex items-center transition-all duration-300 max-w-[50%] sm:max-w-[60%] md:max-w-none">
        {!sidebarOpen && (
          <button
            className="text-2xl mr-4 cursor-pointer"
            onClick={onOpenSidebar}
            aria-label="Abrir menú"
          >
            <span>☰</span>
          </button>
        )}
        <input
          type="text"
          className="py-2 px-3 text-sm md:text-base rounded-l-[20px] border border-[#CCCCCC] w-[150px] sm:w-[250px] md:w-[400px] focus:outline-none"
          placeholder="Buscar"
        />
        <select className="py-2 px-2 text-sm md:text-base rounded-r-[20px] border border-[#CCCCCC] border-l-0 w-[80px] md:w-[130px] text-center appearance-none focus:outline-none cursor-pointer">
          <option value="todos">Todos</option>
          <option value="autor">Autor</option>
          <option value="texto">Texto</option>
          <option value="estado">Estado</option>
          <option value="genero">Género</option>
        </select>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <select className="py-1 px-2 text-sm md:py-2 md:px-4 md:text-base rounded-[20px] border border-[#CCCCCC] w-[50px] md:w-[100px] text-center appearance-none focus:outline-none cursor-pointer">
          <option value="es">ES</option>
          <option value="en">EN</option>
        </select>
        <div className="flex items-center relative group cursor-pointer">
          <img
            src="https://res.cloudinary.com/silviajcn/image/upload/v1641498305/Perfil%20Usuarios/default-user-image_lhg8yd.png"
            alt="Foto de perfil"
            className="w-[35px] h-[35px] rounded-full mr-1 md:mr-2"
          />
          <span className="hidden sm:inline font-bold text-base text-[#333]">
            Silvi
          </span>
          <div className="hidden group-hover:block absolute top-full right-0 bg-white shadow px-2 py-2 rounded z-50 min-w-[140px]">
            <a
              href="#"
              className="block text-[#333] no-underline px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              Perfil
            </a>
            <a
              href="#"
              className="block text-[#333] no-underline px-2 py-1 text-sm rounded hover:bg-gray-100"
            >
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};