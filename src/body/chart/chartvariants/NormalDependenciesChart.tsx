import * as React from "react";
import { NormalDependenciesTreemap } from "../treemaps/NormalDependenciesTreemap.tsx";
import BaseChart from "./BaseChart.tsx";
import {Graph} from "../../../jsonutils/JSONStructureInterfaces.tsx";
import {ChartSidebarData} from "../../utils/sidebarutils/ChartSidebarUtils.tsx";

const initDependenciesChart = (
    ref: HTMLDivElement,
    graph: Graph,
    setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
    setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
    return new NormalDependenciesTreemap().initChart(ref, graph, setChartSidebarData, setIsChartSidebarVisible);
};

const NormalDependenciesChart: React.FC = () => {
    return <BaseChart initChart={initDependenciesChart} chartClassName="normalGraph" />;
};

export default NormalDependenciesChart;
