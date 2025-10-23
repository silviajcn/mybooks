

export const Navbar = ({ onOpenSidebar, sidebarOpen }) => {
    return (
      <header
        className={`fixed top-0 ${
          sidebarOpen ? "left-[250px] w-[calc(100%-250px)]" : "left-0 w-full"
        } h-[60px] bg-[#F8F8F8] text-gray-800 flex justify-between items-center px-5 shadow z-[1000] transition-all duration-300`}
      >
        <div className="flex items-center transition-all duration-300">
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
            className="py-2 px-4 text-base rounded-l-[20px] border border-[#CCCCCC] w-[400px] focus:outline-none"
            placeholder="Buscar libros..."
          />
          <select className="py-2 px-4 text-base rounded-r-[20px] border border-[#CCCCCC] border-l-0 w-[130px] text-center appearance-none focus:outline-none cursor-pointer">
            <option value="todos">Todos</option>
            <option value="autor">Autor</option>
            <option value="texto">Texto</option>
            <option value="estado">Estado</option>
            <option value="genero">Género</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <select className="py-2 px-4 text-base rounded-[20px] border border-[#CCCCCC] w-[100px] text-center appearance-none focus:outline-none cursor-pointer">
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
          <div className="flex items-center relative group cursor-pointer">
            <img
              src="https://res.cloudinary.com/silviajcn/image/upload/v1641498305/Perfil%20Usuarios/default-user-image_lhg8yd.png"
              alt="Foto de perfil"
              className="w-[35px] h-[35px] rounded-full mr-2"
            />
            <span className="font-bold text-base text-[#333]">Silvi</span>
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