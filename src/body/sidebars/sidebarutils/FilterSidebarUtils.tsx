import { useState } from "react";
import {Graph, Node} from "../../../filehandling/jsonutils/JSONStructureInterfaces.tsx";

interface SearchResult extends Node {
    path: string[];
}

export const useFilterSidebar = (graph: Graph  | null) => {
    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    const handleFilterButton = () => {
        setIsFilterSidebarVisible(!isFilterSidebarVisible);
    };

    const handleSearch = (searchTerm: string) => {
        if (!graph) return;

        const searchResult = searchNodesByName(graph, searchTerm);
        if (searchResult.length > 0) {
            console.log("Search result found:", searchResult);
            searchResult.sort((a, b) => a.nodeName.localeCompare(b.nodeName)); // sort alphabetically
            setSearchResults(searchResult);
        } else {
            console.error("No search result found");
            setSearchResults([
                {
                nodeName: "N/A",
                path: [],
                nodeId: "N/A",
                usedVersion: "",
                stats: [],
                releaseDate: 0,
            },]);
        }
    };

    const handleCloseFilterSidebar = () => {
        setIsFilterSidebarVisible(false);
        setSearchResults([]);
    };

    const searchNodesByName = (graph: Graph, name: string): SearchResult[] => {
        const results: SearchResult[] = [];

        // Traverse nodes to find matches by name
        graph.nodes.forEach((node) => {
            if (node.nodeName?.toLowerCase().includes(name.toLowerCase())) {
                // Find path from root to node using edges
                const path = findPathToNode(graph, node);
                if (path) {
                    results.push({ ...node, path });
                }
            }
        });

        return results;
    };

    const findPathToNode = (graph: Graph, targetNode: Node): string[] | null => {
        const visited = new Set();
        const path: string[] = [];

        // Start the search from the root node
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

            // Find neighbors of the current node based on edges
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

    return {
        isFilterSidebarVisible,
        searchResults,
        handleFilterButton,
        handleSearch,
        handleCloseFilterSidebar,
    };
};
