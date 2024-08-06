import { useState } from "react";

export const useChartSidebar = () => {
    const [isChartSidebarVisible, setIsChartSidebarVisible] = useState(false);
    const [chartSidebarData, setChartSidebarData] = useState<any>(null);

    const handleCloseChartSidebar = () => {
        setIsChartSidebarVisible(false);
        setChartSidebarData(null);
    };

    return {
        isChartSidebarVisible,
        chartSidebarData,
        setChartSidebarData,
        setIsChartSidebarVisible,
        handleCloseChartSidebar,
    };
};
