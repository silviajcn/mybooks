import React from 'react'

export const BookDetail = () => {
    return (
        <div className="bg-gray-100 p-4">
        {/* Barra de Navegación Superior */}
        <header className="navbar flex justify-between items-center mb-4">
            <div className="search-container flex gap-2">
            <input
                type="text"
                className="search-input p-2 border border-gray-300 rounded"
                placeholder="Buscar libros..."
            />
            <select className="search-filter p-2 border border-gray-300 rounded">
                <option value="todos">Todos</option>
                <option value="autor">Autor</option>
                <option value="texto">Texto</option>
                <option value="estado">Estado</option>
                <option value="genero">Género</option>
            </select>
            </div>
            <div className="menu-buttons flex gap-4 items-center">
            <select className="language-selector p-2 border border-gray-300 rounded">
                <option value="es">ES</option>
                <option value="en">EN</option>
            </select>
            <div className="user-menu relative flex items-center gap-2">
                <img
                src="https://res.cloudinary.com/silviajcn/image/upload/v1641498305/Perfil%20Usuarios/default-user-image_lhg8yd.png"
                alt="Foto de perfil"
                className="profile-picture w-10 h-10 rounded-full"
                />
                <span className="username">Silvi</span>
                <div className="dropdown-content absolute top-12 right-0 bg-white shadow-lg p-2 rounded hidden">
                <a href="#">Perfil</a>
                <a href="#">Configuración de cuenta</a>
                <a href="#">Modo oscuro/claro</a>
                <a href="#">Ayuda</a>
                <a href="#">Cerrar sesión</a>
                </div>
            </div>
            </div>
        </header>

        {/* Detalles del Libro */}
        <main className="main-content">
            <div className="book-details-container flex gap-8">
            {/* Portada y botones */}
            <div className="book-cover-section bg-white p-4 rounded shadow w-64 flex flex-col items-center">
                <img
                src="https://res.cloudinary.com/silviajcn/image/upload/v1731538361/Cover-Books/Samanta_Schweblin_-_Kentukis_bl8flf.jpg"
                alt="Portada"
                className="book-cover-small mb-4 rounded"
                />
                <div className="book-buttons flex gap-2">
                <button className="px-3 py-1 bg-gray-800 text-white rounded">Compartir</button>
                <button className="px-3 py-1 bg-gray-800 text-white rounded">Notas</button>
                <button className="px-3 py-1 bg-gray-800 text-white rounded">Reseña</button>
                </div>
            </div>

            {/* Info del libro */}
            <div className="book-info-section bg-white p-4 rounded shadow flex-1">
                <h2 className="book-title-large text-2xl font-bold mb-2">Kentukis</h2>
                <p className="book-author-large text-gray-600 mb-2">Samanta Schweblin</p>
                <p className="book-edition text-gray-500 mb-4">Edición: 2da</p>

                <div className="book-rating-section flex justify-between items-center mb-4">
                <p className="book-rating text-yellow-500">⭐⭐⭐⭐⭐ 5.0 rating</p>
                <div className="book-status-detail bg-green-100 text-green-700 p-2 rounded">
                    Estado: Leyendo
                </div>
                <button className="add-to-library px-4 py-2 bg-gray-800 text-white rounded">
                    Agregar a mi biblioteca ▼
                </button>
                </div>

                {/* Lista de detalles */}
                <div className="book-details-list text-sm text-gray-700">
                <p><strong>Género:</strong> Ficción</p>
                <p><strong>Fecha de Publicación:</strong> 2023</p>
                <p><strong>Editorial:</strong> Editorial Ejemplo</p>
                <p><strong>Idioma:</strong> Español</p>
                <p><strong>ISBN:</strong> 978-1234567890</p>
                <p><strong>Formato:</strong> Físico</p>
                <p><strong>Origen:</strong> Compra</p>
                <p><strong>Total de páginas:</strong> 320</p>
                <p><strong>Páginas leídas:</strong> 150</p>
                <p><strong>Fecha de inicio:</strong> 2024-01-10</p>
                <p><strong>Fecha de fin:</strong> 2024-02-10</p>
                </div>
            </div>

            {/* Autor */}
            <aside className="author-section bg-white p-4 rounded shadow w-64">
                <div className="author-header flex justify-between items-center mb-4">
                <div>
                    <h3 className="font-semibold">Sobre el Autor</h3>
                    <h4>Samanta Schweblin</h4>
                    <h5><strong>Nacionalidad:</strong> Argentina</h5>
                    <h5><strong>Género del autor:</strong> Femenino</h5>
                </div>
                <img
                    src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRMPLvdJgTHoxVnvzmv8qvBph6pasaVCCjX6mIW2XYcMNVcqLONbe0SHMganfOPTzuvftqfrNlqmZhHE8eezJk9BMpHPKqHouF10eSvwQ"
                    alt="Foto del Autor"
                    className="author-photo w-20 h-20 rounded-full object-cover"
                />
                </div>
                <p className="text-sm text-gray-700">
                Samanta Schweblin es una escritora argentina...
                </p>
                <h5 className="mt-4 font-semibold">Otros libros del autor</h5>
                <div className="other-books flex gap-2 mt-2">
                <img src="https://res.cloudinary.com/silviajcn/image/upload/v1731538358/Cover-Books/Samanta_Schweblin_-_Pajaros_en_la_boca_y_otros_cuentos_ikvuzg.jpg" className="mini-cover w-16 rounded" />
                <img src="https://res.cloudinary.com/silviajcn/image/upload/v1731538347/Cover-Books/Samanta_Schweblin_-_Siete_casas_vacias_ebwcag.gif" className="mini-cover w-16 rounded" />
                </div>
            </aside>
            </div>

            {/* Citas y Reseñas */}
            <div className="quotes-and-reviews flex gap-8 mt-8">
            <div className="book-quotes-section bg-white p-4 rounded shadow w-64 text-center">
                <h3 className="font-semibold mb-2">Citas del Libro</h3>
                <div className="quote-content">
                <p className="quote-text text-gray-600 mb-2">
                    "Esta es una cita del libro..."
                </p>
                <div className="quote-navigation flex gap-2 justify-center">
                    <button className="quote-nav-button bg-gray-800 text-white px-2 py-1 rounded">⬅️</button>
                    <button className="quote-nav-button bg-gray-800 text-white px-2 py-1 rounded">➡️</button>
                </div>
                </div>
            </div>

            <div className="community-reviews-section bg-white p-4 rounded shadow flex-1">
                <h3 className="font-semibold mb-2">Reseñas de la Comunidad</h3>
                <p className="text-sm text-gray-700">Aquí se muestran las reseñas...</p>
            </div>
            </div>
        </main>
        </div>
    )
};