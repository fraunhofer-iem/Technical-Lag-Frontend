import { useState } from "react";
import {Stats} from "../../../jsonutils/JSONStructureInterfaces.tsx";

export interface ChartSidebarData {
    name: string;
    version: string;
    releaseDate: string;
    ecosystem?: string;
    repoURL?: string;
    revision?: string;
    stats: Stats[];
}

export const useChartSidebar = () => {
    const [isChartSidebarVisible, setIsChartSidebarVisible] = useState(false);
    const [chartSidebarData, setChartSidebarData] = useState<ChartSidebarData | null>(null);

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
