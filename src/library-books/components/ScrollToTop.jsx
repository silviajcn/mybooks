import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  // `pathname` es la ruta actual de la URL
  const { pathname } = useLocation();

  // useEffect se ejecuta cada vez que 'pathname' cambia
  useEffect(() => {
    // Esto fuerza el scroll a la parte superior (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente no renderiza nada, solo gestiona el efecto secundario.
  return null;
};