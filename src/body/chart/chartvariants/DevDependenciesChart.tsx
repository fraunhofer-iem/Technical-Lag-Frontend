import * as React from "react";
import { DevDependenciesTreemap } from "../treemaps/DevDependenciesTreemap.tsx";
import BaseChart from "./BaseChart.tsx";
import { JSONodeData } from "../../utils/Types.tsx";

const initDevDependenciesChart = (
    ref: HTMLDivElement,
    jsonData: JSONodeData,
    setChartSidebarData: React.Dispatch<React.SetStateAction<any | null>>,
    setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return new DevDependenciesTreemap().initChart(ref, jsonData, setChartSidebarData, setIsChartSidebarVisible);
};

const DevDependenciesChart: React.FC = () => {
    return <BaseChart initChart={initDevDependenciesChart} chartClassName="dev-dependencies-chart" />;
};

export default DevDependenciesChart;