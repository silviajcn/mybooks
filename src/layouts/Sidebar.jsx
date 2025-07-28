import { Link } from 'react-router-dom';

export const Sidebar = () => {
    return (
        <aside className="sidebar">
            <h1 className="logo">My Book Shelf</h1>
            <nav className="nav-menu">
                <Link to="/"><span className="icon">🏠</span> Inicio</Link>
                <Link to="/search"><span className="icon">🔍</span> Buscar</Link>
                <Link to="/library"><span className="icon">📚</span> Mi Biblioteca</Link>
                <Link to="/favorites"><span className="icon">🩷</span> Favoritos</Link>
                <Link to="/contribute"><span className="icon">✍️</span> Contribuir</Link>
            </nav>
            <div className="sidebar-footer">
                <a href="#">Soporte</a>
                <a href="#">Términos y Condiciones</a>
                <a href="#">Política de Privacidad</a>
            </div>
        </aside>
    )
};