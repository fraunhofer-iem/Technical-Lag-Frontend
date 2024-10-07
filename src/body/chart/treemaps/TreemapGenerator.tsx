import * as echarts from 'echarts';
import {Graph, Node} from "../../../jsonutils/JSONStructureInterfaces.tsx";
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

export const transformJSONDataToTreemap = (graph: Graph) => {
    // Helper function: Convert a node into a format suitable for ECharts treemap
    const transformNode = (node: Node): any => {
        const children = findChildren(node);  // Recursively find children nodes

        console.log(node.usedVersion);
        return {
            name: node.nodeName,          // The name of the node (e.g., library/package)
            value: 1,          // Aggregated value based on stats, e.g., total libDays
            usedVersion: node.usedVersion,  // For tooltips or additional info
            children: children.length > 0 ? children : null // Only include children if they exist
        };
    };

    // Helper function: Recursively find children nodes
    const findChildren = (parentNode: Node): any[] => {
        const childNodes = graph.edges
            .filter(edge => edge.from === parentNode.nodeId)  // Find edges where current node is the parent
            .map(edge => {
                const childNode = graph.nodes.find(n => n.nodeId === edge.to);  // Find child node
                return childNode ? transformNode(childNode) : null;  // Transform the child node if found
            })
            .filter(childNode => childNode !== null);  // Filter out null results

        return childNodes;
    };

    const rootNode = graph.root;

    // Find and transform all the children of the root node
    const transformedNodes = graph.edges
        .filter(edge => edge.from === rootNode.rootId)  // Edges originating from the root
        .map(edge => {
            const node = graph.nodes.find(n => n.nodeId === edge.to);  // Find child nodes of the root
            return node ? transformNode(node) : null;  // Transform child nodes
        })
        .filter(node => node !== null);  // Filter out null results

    // Return the transformed structure in the ECharts treemap format
    return {
        name: rootNode.rootName || "dashboard",  // Ensure root name is set, default to "dashboard" if not available
        children: transformedNodes // Children of the root node
    };
};
