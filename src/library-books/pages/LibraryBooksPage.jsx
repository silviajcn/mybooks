import { Outlet } from 'react-router-dom';
import { Navbar, Sidebar } from '../';
import { useUiStore } from '../../hooks';

export const LibraryBooksPage = () => {

    const { isSidebarOpen, handleOpenSidebar, handleCloseSidebar } = useUiStore();

    return (
      <div className="min-h-screen bg-[#f7f7f7] relative">
        {isSidebarOpen && (
          <>
            <Sidebar onClose={handleCloseSidebar} />
            <div className="fixed inset-0 bg-gray-200 bg-opacity-50 z-[1000] sm:hidden" />
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