import * as React from "react";
import {JSONData} from "../body/tree/Types.tsx";

export const handleDrop = (files: File[], setJsonData: React.Dispatch<React.SetStateAction<JSONData | null>>, setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);

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
/*const transformData = (json: any): JSONData => {
    const dependencyGraphDtos = json.dependencyGraphDtos;

    if (!Array.isArray(dependencyGraphDtos) || dependencyGraphDtos.length === 0) {
        throw new Error("Invalid structure: 'dependencyGraphDtos' is not an array or is empty.");
    }

    const firstGraphDto = dependencyGraphDtos[0];

    if (!firstGraphDto.graph || !Array.isArray(firstGraphDto.graph) || firstGraphDto.graph.length === 0) {
        throw new Error("Invalid structure: 'graph' property is missing, not an array, or is empty.");
    }

    const firstGraph = firstGraphDto.graph[0];
    if (!firstGraph.graph || !Array.isArray(firstGraph.graph.nodes) || !Array.isArray(firstGraph.graph.edges)) {
        throw new Error("Invalid structure: 'graph', 'nodes' or 'edges' property is missing or invalid.");
    }

    const nodes = firstGraph.graph.nodes;
    const edges = firstGraph.graph.edges;

    const artifactMap = new Map<number, any>();
    firstGraphDto.artifacts.forEach((artifact: any, idx: number) => {
        artifactMap.set(idx, artifact);
    });

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
            repoURL: "", revision: "", root: false,
            name: artifact.artifactId,
            version: usedVersionIndex !== -1
                ? artifact.versions[usedVersionIndex].versionNumber
                : "unknown",
            releaseDate: usedVersionIndex !== -1
                ? artifact.versions[usedVersionIndex].releaseDate: "unknown",
            children: []
        };
        nodeMap.set(node.artifactIdx, nodeData);
    });


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
                throw new Error(`From node with index ${edge.from} not found in nodeMap.`);
            }
            if (!toNodeEntry) {
                throw new Error(`To node with index ${edge.to} not found in nodeMap.`);
            }
        }
    });

    const { ecosystem, version, artifactId } = json.dependencyGraphDtos[0];

    const repoURL = json.repositoryInfo.url;
    const revision = json.repositoryInfo.revision;

    // Create a special node for the root
    const root: JSONData = {
        name: artifactId,
        version: version,
        releaseDate: "unknown",
        children: Array.from(nodeMap.values()),
        ecosystem: ecosystem,
        repoURL: repoURL,
        revision: revision,
        root: true
    };

    return root;
};*/

// Adjusted transformData function
const transformData = (json: any): JSONData => {
    const projectDto = json.projectDtos[0];

    // Extract repository information
    const repoURL = json.repositoryInfo.url;
    const revision = json.repositoryInfo.revision;

    // Extract project information
    const { ecosystem, version, artifactId } = projectDto;

    // Create root node
    const root: JSONData = {
        name: artifactId,
        version: version,
        releaseDate: "unknown",
        children: [],
        ecosystem: ecosystem,
        repoURL: repoURL,
        revision: revision,
        root: true
    };

    // Create artifact map
    const artifactMap = new Map<number, any>();
    projectDto.artifacts.forEach((artifact: any, idx: number) => {
        artifactMap.set(idx, artifact);
    });

    // Create node map
    const nodeMap = new Map<number, JSONData>();

    // Process nodes
    projectDto.graph.forEach((graphItem: any) => {
        graphItem.graph.nodes.forEach((node: any) => {
            const artifact = artifactMap.get(node.artifactIdx);
            if (!artifact) {
                console.warn(`Artifact with index ${node.artifactIdx} not found in artifactMap.`);
                return;
            }
            const usedVersionIndex = artifact.versions.findIndex((versionItem: any) => versionItem.versionNumber === node.usedVersion);

            const nodeData: JSONData = {
                repoURL: repoURL,
                revision: revision,
                root: false,
                name: artifact.artifactId,
                version: usedVersionIndex !== -1 ? artifact.versions[usedVersionIndex].versionNumber : "unknown",
                releaseDate: usedVersionIndex !== -1 ? artifact.versions[usedVersionIndex].releaseDate : "unknown",
                children: []
            };
            nodeMap.set(node.artifactIdx, nodeData);
        });
    });

    // Populate children based on edges
    projectDto.graph.forEach((graphItem: any) => {
        graphItem.graph.edges.forEach((edge: any) => {
            const fromNodeEntry = nodeMap.get(edge.from);
            const toNodeEntry = nodeMap.get(edge.to);

            if (fromNodeEntry && toNodeEntry) {
                if (!fromNodeEntry.children) {
                    fromNodeEntry.children = [];
                }
                fromNodeEntry.children.push(toNodeEntry);
                nodeMap.set(edge.from, fromNodeEntry);
            } else {
                // Log if either fromNode or toNode is not found
                if (!fromNodeEntry) {
                    throw new Error(`From node with index ${edge.from} not found in nodeMap.`);
                }
                if (!toNodeEntry) {
                    throw new Error(`To node with index ${edge.to} not found in nodeMap.`);
                }
            }
        });
    });

    // Process statistics and update node stats
    if (projectDto.stats) {
        projectDto.stats.forEach((stat: any) => {
            const nodeKey = stat.versionType; // Assuming this is the version number
            const nodeEntry = nodeMap.get(nodeKey);

            if (nodeEntry) {
                nodeEntry.stats = {
                    Minor: stat.stats.Minor,
                    Major: stat.stats.Major,
                    Patch: stat.stats.Patch
                };
                nodeMap.set(nodeKey, nodeEntry);
            }
        });
    }

    // Assign children to root
    root.children = Array.from(nodeMap.values());

    return root;
};
