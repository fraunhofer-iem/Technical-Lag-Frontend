import * as echarts from 'echarts';
import {JSONodeData} from "../../utils/Types.tsx";
import { ChartSidebarData } from "../sidebars/ChartSidebarUtils.tsx";
import React from "react";
import {TreemapSeriesOption} from "echarts/charts";

export interface TreemapGenerator {
    initChart: (
        chartRef: HTMLDivElement,
        jsonData: JSONodeData,
        setChartSidebarData: React.Dispatch<React.SetStateAction<ChartSidebarData | null>>,
        setIsChartSidebarVisible: React.Dispatch<React.SetStateAction<boolean>>
    ) => echarts.ECharts | null;

    getLevelOption: () => TreemapSeriesOption['levels'];
}

export interface TreemapNode {
    name: string;
    value: number;
    version?: string;
    releaseDate?: string;
    ecosystem?: string;
    repoURL?: string;
    revision?: string;
    stats?: object;
    children?: TreemapNode[];
}
// Helper function to create a unique key for each node
const createUniqueKey = (node: JSONodeData, scopeType: 'dependencies' | 'devDependencies') => {
    return `${node.name}_${scopeType}`;
}

// Transform JSONData to TreemapNode for devDependencies
export const transformJSONDataToTreemap = (
    jsonData: JSONodeData,
    scopeType: 'dependencies' | 'devDependencies'
): TreemapNode => {
    const visited = new Set<string>();
    const nodeMap = new Map<string, TreemapNode>();

    const stack: { node: JSONodeData, parentKey?: string }[] = [{ node: jsonData }];

    while (stack.length > 0) {
        const { node, parentKey } = stack.pop()!;
        const nodeKey = createUniqueKey(node, scopeType);

        if (visited.has(nodeKey)) {
            continue;
        }

        visited.add(nodeKey);

        const currentNode: TreemapNode = {
            name: node.name,
            value: 0, // Initialize value
            version: node.version,
            releaseDate: node.releaseDate,
            ecosystem: node.ecosystem,
            repoURL: node.repoURL,
            revision: node.revision,
            stats: node.stats,
            children: []
        };

        nodeMap.set(nodeKey, currentNode);

        node.scopes.forEach(scope => {
            if (scope.scope === scopeType && scope.data.length > 0) {
                scope.data.forEach(child => {
                    const childKey = createUniqueKey(child, scopeType);
                    if (!visited.has(childKey)) {
                        stack.push({ node: child, parentKey: nodeKey });
                    }

                    if (nodeMap.has(parentKey!)) {
                        const parentNode = nodeMap.get(parentKey!)!;
                        parentNode.children!.push(currentNode);
                    }
                });
            }
        });
    }

    return nodeMap.get(createUniqueKey(jsonData, scopeType))!;
};
