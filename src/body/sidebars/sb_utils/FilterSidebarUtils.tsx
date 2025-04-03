import {useState} from "react";

export const useFilterSidebar = (clearFilterAndResults: () => void) => {
    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);

    const handleFilterButton = () => {
        setIsFilterSidebarVisible(!isFilterSidebarVisible);
        clearFilterAndResults();
    };

    const handleCloseFilterSidebar = () => {
        setIsFilterSidebarVisible(false);
    };

    return {
        isFilterSidebarVisible,
        handleFilterButton,
        handleCloseFilterSidebar
    };
};
