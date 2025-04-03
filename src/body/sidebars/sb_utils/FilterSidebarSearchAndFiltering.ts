import {useState} from "react";
import {findPathToNode} from "./NodeSearch.ts";
import {Graph, Node} from "../../../file_handling/json_utils/JSONStructureInterfaces.tsx";

interface SearchResult extends Node {
    path: string[];
}

export const useFilterSidebarSearchAndFiltering = (graph: Graph | null) => {
    const [originalSearchResults, setOriginalSearchResults] = useState<SearchResult[]>([]);
    const [filteredSearchResults, setFilteredSearchResults] = useState<SearchResult[]>([]);
    const [filterValue, setFilterValue] = useState<number | null>(null);

    const searchNodesByName = (graph: Graph, name: string): SearchResult[] => {
        const results: SearchResult[] = [];

        // Traverse nodes to find matches by name
        graph.nodes.forEach((node) => {
            if (node.nodeName?.toLowerCase().includes(name.toLowerCase())) {
                // Find path from root to node using edges
                const path = findPathToNode(graph, node);
                if (path) {
                    results.push({...node, path});
                }
            }
        });

        return results;
    };

    const handleSearch = (searchTerm: string) => {
        if (!graph) return;

        const searchResult = searchNodesByName(graph, searchTerm);
        if (searchResult.length > 0) {
            console.log("Search result found:", searchResult);
            searchResult.sort((a, b) => a.nodeName.localeCompare(b.nodeName)); // sort alphabetically
            setOriginalSearchResults(searchResult);
            setFilteredSearchResults(filterResultsByLibDays(searchResult, filterValue));
        } else {
            console.error("No search result found");
            setOriginalSearchResults([
                {
                    nodeName: "N/A",
                    path: [],
                    nodeId: "N/A",
                    usedVersion: "",
                    stats: [],
                    releaseDate: 0,
                },
            ]);
            setFilteredSearchResults([
                {
                    nodeName: "N/A",
                    path: [],
                    nodeId: "N/A",
                    usedVersion: "",
                    stats: [],
                    releaseDate: 0,
                },
            ]);
        }
    };


    const handleFilter = (libDays: number) => {
        if (libDays === 0) {
            setFilteredSearchResults([...originalSearchResults]);
        } else {
            setFilterValue(libDays);
            setFilteredSearchResults(filterResultsByLibDays(originalSearchResults, libDays));
        }
    };

    const resetFilter = () => {
        setFilterValue(null);
        setFilteredSearchResults([...originalSearchResults]);
    };

    const clearFilterAndResults = () => {
        setFilterValue(null);
        setFilteredSearchResults([]);
        setOriginalSearchResults([]);
    };

    const filterResultsByLibDays = (results: SearchResult[], libDays: number | null) => {
        if (libDays === null) return results;
        return results.filter((result) =>
            result.stats.some((stat) => stat.stats.technicalLag.libDays >= libDays)
        );
    };

    return {
        searchResults: filteredSearchResults,
        handleSearch,
        handleFilter,
        resetFilter,
        clearFilterAndResults
    };
};
