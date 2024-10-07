import React, { useState } from "react";
import {Graph} from "../../../jsonutils/JSONStructureInterfaces.tsx";
import echarts from "echarts";

interface SearchResult extends Graph {
    name: string;
    path: string[];
}

interface Node {
    name: string;
    path: string[];
}

export const useFilterSidebar = (graph: Graph  | null, chartInstanceRef: React.RefObject<echarts.ECharts | null>) => {
    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult []>([]);

    const handleFilterButton = () => {
        setIsFilterSidebarVisible(!isFilterSidebarVisible);
    };

    const handleSearch = (searchTerm: string) => {
        if (!graph) return;
        const searchResult = searchNodesByName(graph, searchTerm);
        if (searchResult) {
            console.log("Search result found:", searchResult);
            searchResult.sort((a, b) => a.name.localeCompare(b.name)); // sort alphabetically
            setSearchResults(searchResult);
        } else {
            console.error("No search result found");
            setSearchResults([]);
        }
    };

    const zoomToNode = (node: Node) => {
        if (chartInstanceRef.current && node) {
            console.log("Zooming to node:", node);
            chartInstanceRef.current.dispatchAction({
                type: 'zoomToNode',
                targetNode: {
                    name: node.name,
                    path: node.path.join('/')
                },
                zoomLevel: 2
            });
        } else {
            console.error("Chart instance is not available");
        }
    };

    const handleCloseFilterSidebar = () => {
        setIsFilterSidebarVisible(false);
        setSearchResults([]);
    };

    const searchNodesByName = (data: any, name: string, path: string[] = []): SearchResult[] => {
        let results: SearchResult[] = [];
        const currentPath = [...path, data.name];

        if (data.name && typeof data.name === 'string' && data.name.toLowerCase().includes(name.toLowerCase())) {
            results.push({ ...data, path: currentPath });
        }

        if (data.children) {
            for (const child of data.children) {
                results.push(...searchNodesByName(child, name, currentPath));
            }
        }
        return results;
    };

    return {
        isFilterSidebarVisible,
        searchResults,
        handleFilterButton,
        handleSearch,
        zoomToNode,
        handleCloseFilterSidebar,
    };
};
