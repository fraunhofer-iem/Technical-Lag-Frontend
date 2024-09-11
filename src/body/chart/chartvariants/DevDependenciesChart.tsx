import * as React from "react";
import { DevDependenciesTreemap } from "../treemaps/DevDependenciesTreemap.tsx";
import BaseChart from "./BaseChart.tsx";
import {ChartSidebarData} from "../../utils/sidebarutils/ChartSidebarUtils.tsx";
import {Graph} from "../../../jsonutils/JSONStructureInterfaces.tsx";

const initDevDependenciesChart = (
    ref: HTMLDivElement,
    graph: Graph,
    setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
    setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return new DevDependenciesTreemap().initChart(ref, graph, setChartSidebarData, setIsChartSidebarVisible);
};

const DevDependenciesChart: React.FC = () => {
    return <BaseChart initChart={initDevDependenciesChart} chartClassName="devGraph" />;
};

export default DevDependenciesChart;
