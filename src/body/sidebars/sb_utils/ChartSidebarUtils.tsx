import { useState } from "react";
import {Graph, Node, Stats} from "../../../file_handling/json_utils/JSONStructureInterfaces.tsx";

export interface ChartSidebarData {
    name: string;
    usedVersion: string;
    releaseDate: string;
    ecosystem?: string;
    repoURL?: string;
    revision?: string;
    stats: Stats[];
    pathToNode?: string;
}

export const searchNodesByName = (graph: Graph, name: string): string | null => {
    graph.nodes.forEach((node) => {
        if (node.nodeName?.toLowerCase().includes(name.toLowerCase())) {
            const path = findPathToNode(graph, node);
            console.log(path);
            return path ? path.join(" → ") : null;
        }
    });
    return null;
};

const findPathToNode = (graph: Graph, targetNode: Node): string[] | null => {
    const visited = new Set<string>();
    const path: string[] = [];

    const rootNode = graph.root;
    if (!rootNode) return null;

    path.push(rootNode.rootName);

    const dfs = (nodeId: string): boolean => {
        if (visited.has(nodeId)) return false;
        visited.add(nodeId);

        const currentNode = graph.nodes.find((n) => n.nodeId === nodeId);
        if (currentNode) {
            path.push(currentNode.nodeName);
            if (currentNode.nodeId === targetNode.nodeId) return true;
        }

        for (const edge of graph.edges) {
            let nextNodeId: string | null = null;

            if (edge.from === nodeId) {
                nextNodeId = edge.to;
            } else if (edge.to === nodeId) {
                nextNodeId = edge.from;
            }
            if (nextNodeId && dfs(nextNodeId)) return true;
        }

        if (currentNode) path.pop();
        return false;
    };

    return dfs(rootNode.rootId) ? path : null;
};

export const useChartSidebar = () => {
    const [isChartSidebarVisible, setIsChartSidebarVisible] = useState(false);
    const [chartSidebarData, setChartSidebarData] = useState<ChartSidebarData | null>(null);

    const handleCloseChartSidebar = () => {
        setIsChartSidebarVisible(false);
        setChartSidebarData(null);
    };

    const handleChartButton = () => {
        setIsChartSidebarVisible(!isChartSidebarVisible);
    };


    return {
        isChartSidebarVisible,
        chartSidebarData,
        setChartSidebarData,
        setIsChartSidebarVisible,
        handleCloseChartSidebar,
        handleChartButton
    };
};
