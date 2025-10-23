import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onOpenSidebar, onCloseSidebar } from '../store';

export const useUiStore = () => {

    const dispatch = useDispatch();

    const { isSidebarOpen } = useSelector(state => state.ui);

    useEffect(() => {
        const storedSidebarState = localStorage.getItem("sidebarOpen");
        if (storedSidebarState === "true") {
            dispatch(onOpenSidebar());
        } else {
            dispatch(onCloseSidebar());
        }
    }, [dispatch]);
    
    const handleOpenSidebar = () => {
        dispatch(onOpenSidebar())
        localStorage.setItem("sidebarOpen", "true");
    };
    
    const handleCloseSidebar = () => {
        dispatch(onCloseSidebar());
        localStorage.setItem("sidebarOpen", "false");
    };
    
    return {
        // Properties
        isSidebarOpen,

        // Methods
        handleOpenSidebar,
        handleCloseSidebar
    }
}