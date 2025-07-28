
export const Navbar = () => {
    return (
        <header className="navbar">
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Buscar libros..." />
                <select className="search-filter">
                <option value="todos">Todos</option>
                <option value="autor">Autor</option>
                <option value="texto">Texto</option>
                <option value="estado">Estado</option>
                <option value="genero">Género</option>
                </select>
            </div>
            <div className="menu-buttons">
                <select className="language-selector">
                <option value="es">ES</option>
                <option value="en">EN</option>
                </select>
                <div className="user-menu">
                <img
                    src="https://res.cloudinary.com/silviajcn/image/upload/v1641498305/Perfil%20Usuarios/default-user-image_lhg8yd.png"
                    alt="Foto de perfil"
                    className="profile-picture"
                />
                <span className="username">Silvi</span>
                </div>
            </div>
        </header>
    )
};