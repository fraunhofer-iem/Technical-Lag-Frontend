import * as echarts from 'echarts';
import {Graph} from "../../../jsonutils/JSONStructureInterfaces.tsx";
import {ChartSidebarData} from "../../utils/sidebarutils/ChartSidebarUtils.tsx";
import React from "react";
import {TreemapSeriesOption} from "echarts/charts";

export interface TreemapGenerator {
    initChart: (
        chartRef: HTMLDivElement,
        graph: Graph,
        setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
        setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
    ) => echarts.ECharts | null;

    getLevelOption: () => TreemapSeriesOption['levels'];
}

//TODO
export const transformJSONDataToTreemap = (graph: Graph) => {
    const transformNode = (node: any) => {
        // Convert the node to the format required by ECharts treemap
        return {
            name: node.name,
            value: node.size,
            version: node.version,
            children: node.dependencies?.map(transformNode) || [],
        };
    }

    console.log(transformNode(graph.root).name);
    return transformNode(graph.root);
};
