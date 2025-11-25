import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../';
import { useUiStore } from '../../hooks';

export const LibraryBooksPage = () => {
  const { isSidebarOpen, handleOpenSidebar, handleCloseSidebar } = useUiStore();

  return (
    <div className="min-h-screen bg-[#f7f7f7] relative">
      {/* Sidebar y Backdrop */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-[1050] sm:hidden"
            onClick={handleCloseSidebar}
          />

          {/* SIDEBAR WRAPPER: Controla la posición y visibilidad */}
          <div
            className={`fixed top-0 left-0 h-screen transition-transform duration-300
                    // Comportamiento Overlay en móvil: z-index alto (1060)
                    z-[1060] w-[250px] transform ${
                      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } 
                    sm:translate-x-0 sm:z-[1020] sm:shadow-none`}
          >
            <Sidebar onClose={handleCloseSidebar} />
          </div>
        </>
      )}

      <div
        className={`transition-all duration-300 min-h-screen ${
          isSidebarOpen ? "sm:ml-[250px]" : "ml-0"
        }`}
      >
        <Navbar onOpenSidebar={handleOpenSidebar} sidebarOpen={isSidebarOpen} />

        <div className="mt-[60px] p-5">
          {/* <div className="flex flex-col lg:flex-row gap-8 mb-8"> */}
          <Outlet context={{ isSidebarOpen }} />
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};