import * as React from "react";
import { DependenciesTreemap } from "../treemaps/DependenciesTreemap.tsx";
import BaseChart from "./BaseChart.tsx";
import {JSONodeData} from "../../utils/Types.tsx";

const initDependenciesChart = (
    ref: HTMLDivElement,
    jsonData: JSONodeData,
    setChartSidebarData: React.Dispatch<React.SetStateAction<any | null>>,
    setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return new DependenciesTreemap().initChart(ref, jsonData, setChartSidebarData, setIsChartSidebarVisible);
};

const NormalDependenciesChart: React.FC = () => {
    return <BaseChart initChart={initDependenciesChart} chartClassName="dependencies-chart" />;
};

export default NormalDependenciesChart;