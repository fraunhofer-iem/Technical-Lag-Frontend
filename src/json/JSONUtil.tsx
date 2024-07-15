import * as React from "react";
import {JSONData} from "../body/tree/Types.tsx";

export const handleDrop = (files: File[], setJsonData: React.Dispatch<React.SetStateAction<JSONData | null>>, setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                const transformedData = transformData(json);
                setJsonData(transformedData);
                setIsFileDropped(true); // Hide the FileDrop and show the chart
                sessionStorage.setItem("jsonData", JSON.stringify(transformedData));
                sessionStorage.setItem("isFileDropped", "true");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error parsing JSON file:", error.message);
                } else {
                    console.error("An unknown error occurred.");
                }
            }
        };

        reader.onerror = () => {
            console.error("Error reading file: " + reader.error?.message);
        };

        reader.readAsText(file);
    } else {
        console.error("No files dropped");
    }
};

const transformData = (json: any): JSONData => {
    const projectDto = json.projectDtos[0];

    // Extract repository information
    const repoURL = json.repositoryInfo.url;
    const revision = json.repositoryInfo.revision;

    // Extract project information
    const {ecosystem, version, artifactId} = projectDto;

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
            const artifact = projectDto.artifacts.find((artifact: any) =>
                artifact.versions.some((version: any) => version.versionNumber === stat.versionType)
            );

            if (artifact) {
                const nodeKey = projectDto.artifacts.indexOf(artifact);
                const nodeEntry = nodeMap.get(nodeKey);

                if (nodeEntry) {
                    nodeEntry.stats = {
                        Minor: stat.stats.Minor,
                        Major: stat.stats.Major,
                        Patch: stat.stats.Patch
                    };
                    nodeMap.set(nodeKey, nodeEntry);
                } else {
                    console.warn(`Node with key ${nodeKey} not found in nodeMap.`);
                }
            } else {
                console.warn(`Artifact not found for stat versionType: ${stat.versionType}`);
            }
        });
    } else {
        console.warn("No stats found in projectDto.");
    }

    // Assign children to root
    root.children = Array.from(nodeMap.values());

    return root;
};
