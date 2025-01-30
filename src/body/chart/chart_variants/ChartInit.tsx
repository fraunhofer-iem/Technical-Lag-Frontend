import * as React from "react";
import {DependencyTreemap} from "../treemap/DependencyTreemap.tsx";
import BaseChart from "./BaseChart.tsx";
import {Graph} from "../../../file_handling/json_utils/JSONStructureInterfaces.tsx";
import {ChartSidebarData} from "../../sidebars/sb_utils/ChartSidebarUtils.tsx";

const initDependenciesChart = (
    ref: HTMLDivElement,
    graph: Graph,
    setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
    setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return new DependencyTreemap().initChart(ref, graph, setChartSidebarData, setIsChartSidebarVisible);
};

const ChartInit: React.FC = () => {
    return <BaseChart initChart={initDependenciesChart} chartClassName="normalGraph"/>;
};

export default ChartInit;
