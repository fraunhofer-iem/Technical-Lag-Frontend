import React, { useState } from "react";
import { JSONodeData } from "../../utils/Types.tsx";
import echarts from "echarts";

interface SearchResult extends JSONodeData {
    path: string[];
}

interface Node {
    name: string;
    path: string[];
}

export const useFilterSidebar = (jsonData: JSONodeData | null, chartInstanceRef: React.RefObject<echarts.ECharts | null>) => {
    const [isFilterSidebarVisible, setIsFilterSidebarVisible] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult []>([]);

    const handleFilterButton = () => {
        setIsFilterSidebarVisible(true);
    };

    const handleSearch = (searchTerm: string) => {
        if (!jsonData) return;
        const searchResult = searchNodesByName(jsonData, searchTerm);
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

        if (data.name.toLowerCase().includes(name.toLowerCase())) {
            results.push({ ...data, path: currentPath });
        }

        if (data.children) {
            for (const child of data.children) {
                results.push(...searchNodesByName(child, name, currentPath));
            }
        }
        return results;
    };

    /*    const filterJsonData = (data: JSONData, filters: any): JSONData | null => {
           const applyFilters = (node: any): boolean => {
               let matches = true;
               if (filters.versionNumber && !node.version.includes(filters.versionNumber)) {
                   matches = false;
               }
               if (filters.releaseDate && node.releaseDate !== filters.releaseDate) {
                   matches = false;
               }
               if (filters.libDays && node.libDays !== filters.libDays) {
                   matches = false;
               }
               if (filters.numberOfMissedReleases && node.numberOfMissedReleases !== filters.numberOfMissedReleases) {
                   matches = false;
               }
               if (filters.releaseFrequency && node.releaseFrequency !== filters.releaseFrequency) {
                   matches = false;
               }
               return matches;
           };

           const filterNodes = (node: any): any | null => {
               if (applyFilters(node)) {
                   return {
                       ...node,
                       children: node.children ? node.children.map(filterNodes).filter(Boolean) : []
                   };
               }
               return null;
           };

           return filterNodes(data);
       };*/

    return {
        isFilterSidebarVisible,
        searchResults,
        handleFilterButton,
        handleSearch,
        zoomToNode,
        handleCloseFilterSidebar,
    };
};
