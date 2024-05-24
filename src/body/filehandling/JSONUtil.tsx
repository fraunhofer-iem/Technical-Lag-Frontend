import * as React from "react";
import {JSONData} from "../tree/Types.tsx";

export const handleDrop = (files: File[], setJsonData: React.Dispatch<React.SetStateAction<JSONData | null>>, setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                console.log("Parsed JSON:", json); // Log the entire parsed JSON

                // Verify the presence of the `graph`, `nodes`, `edges`, and `dependencyGraphDtos` properties
                const transformedData = transformData(json);
                setJsonData(transformedData);
                setIsFileDropped(true); // Hide the FileDrop and show the tree
                sessionStorage.setItem("jsonData", JSON.stringify(transformedData));
                sessionStorage.setItem("isFileDropped", "true");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error:", error.message); // Log the error
                    alert("Error parsing JSON file: " + error.message);
                } else {
                    alert("An unknown error occurred.");
                }
            }
        };

        reader.onerror = () => {
            alert("Error reading file: " + reader.error?.message);
        };

        reader.readAsText(file);
    } else {
        alert("No files dropped");
    }
};


// Function to transform data
const transformData = (json: any): JSONData => {
    const dependencyGraphDtos = json.dependencyGraphDtos;

    if (!Array.isArray(dependencyGraphDtos) || dependencyGraphDtos.length === 0) {
        throw new Error("Invalid structure: 'dependencyGraphDtos' is not an array or is empty.");
    }

    const firstGraphDto = dependencyGraphDtos[0];
    console.log("First Graph DTO:", firstGraphDto);

    if (!firstGraphDto.graph || !Array.isArray(firstGraphDto.graph) || firstGraphDto.graph.length === 0) {
        throw new Error("Invalid structure: 'graph' property is missing, not an array, or is empty.");
    }

    const firstGraph = firstGraphDto.graph[0];
    if (!firstGraph.graph || !Array.isArray(firstGraph.graph.nodes) || !Array.isArray(firstGraph.graph.edges)) {
        throw new Error("Invalid structure: 'graph', 'nodes' or 'edges' property is missing or invalid.");
    }

    const nodes = firstGraph.graph.nodes;
    const edges = firstGraph.graph.edges;

    console.log("Nodes:", nodes);
    console.log("Edges:", edges);

    const artifactMap = new Map<number, any>();
    firstGraphDto.artifacts.forEach((artifact: any, idx: number) => {
        artifactMap.set(idx, artifact);
    });

    console.log("Artifact Map:", artifactMap);

    const nodeMap = new Map<number, JSONData>();

    nodes.forEach((node: any) => {
        const artifact = artifactMap.get(node.artifactIdx);
        if (!artifact) {
            console.warn(`Artifact with index ${node.artifactIdx} not found in artifactMap.`);
            return;
        }
        const usedVersionIndex = artifact.versions.findIndex((version: {
            versionNumber: any;
        }) => version.versionNumber === node.usedVersion);

        const nodeData: JSONData = {
            name: artifact.artifactId,
            version: usedVersionIndex !== -1
                ? artifact.versions[usedVersionIndex].versionNumber
                : "unknown",
            children: []
        };
        nodeMap.set(node.artifactIdx, nodeData);
    });

    console.log("Node Map:", nodeMap);

// Populate the children arrays based on edges
    edges.forEach((edge: { from: number, to: number }) => {
        const fromNodeEntry = Array.from(nodeMap.entries())[edge.from];
        const toNodeEntry = Array.from(nodeMap.entries())[edge.to];

        if (fromNodeEntry && toNodeEntry) {
            if (!fromNodeEntry[1].children) {
                fromNodeEntry[1].children = [];
            }
            fromNodeEntry[1].children.push(toNodeEntry[1]);
            nodeMap.set(edge.from, fromNodeEntry[1]);
        } else {
            // Log if either fromNode or toNode is not found
            if (!fromNodeEntry) {
                console.warn(`From node with index ${edge.from} not found in nodeMap.`);
            }
            if (!toNodeEntry) {
                console.warn(`To node with index ${edge.to} not found in nodeMap.`);
            }
        }
    });

    console.log("Transformed Node Map:", nodeMap);

    return {name: firstGraphDto.artifactId, version: firstGraphDto.value, children: Array.from(nodeMap.values())};
};