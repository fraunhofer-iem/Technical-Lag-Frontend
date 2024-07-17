import * as React from "react";
import {JSONData, Stats} from "../body/utils/Types.tsx";


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

    const allStats: any[] = []; // Collect statistics for the root

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
                children: [],
                stats: node.stats ? simplifyStats(node.stats) : undefined
            };

            if (node.stats) {
                allStats.push(...node.stats);
            }

            nodeMap.set(node.artifactIdx, nodeData);
        });
    });

    root.stats = allStats.length > 0 ? simplifyStats(allStats) : undefined;


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

    // Assign children to root
    root.children = Array.from(nodeMap.values());

    return root;
};

const simplifyStats = (statsArray: any[]): Stats => {
    if (statsArray.length === 0) {
        // Return default values if no statistics are available
        return {
            technicalLag: {
                libDays: 0,
                distance: { first: 0, second: 0, third: 0 },
                releaseFrequency: { releasesPerMonth: 0 },
                numberOfMissedReleases: 0
            },
            versionType: { minor: "N/A", major: "N/A", patch: "N/A" },
            libDays: { average: 0, stdDev: 0 },
            missedReleases: { average: 0, stdDev: 0 },
            distance: {
                first: { average: 0 },
                second: { average: 0 },
                third: { average: 0 }
            },
            releaseFrequency: { average: 0, stdDev: 0 }
        };
    }

    // Initialize accumulators for each version type
    const versionStats: { [key: string]: any } = {
        Minor: {
            libDays: { average: 0, stdDev: 0 },
            missedReleases: { average: 0, stdDev: 0 },
            distance: { first: { average: 0 }, second: { average: 0 }, third: { average: 0 } },
            releaseFrequency: { average: 0, stdDev: 0 }
        },
        Major: {
            libDays: { average: 0, stdDev: 0 },
            missedReleases: { average: 0, stdDev: 0 },
            distance: { first: { average: 0 }, second: { average: 0 }, third: { average: 0 } },
            releaseFrequency: { average: 0, stdDev: 0 }
        },
        Patch: {
            libDays: { average: 0, stdDev: 0 },
            missedReleases: { average: 0, stdDev: 0 },
            distance: { first: { average: 0 }, second: { average: 0 }, third: { average: 0 } },
            releaseFrequency: { average: 0, stdDev: 0 }
        }
    };

    // Function to extract stats for a given version type
    const extractStats = (versionType: string, stats: any) => {
        const typeStats = stats[versionType] || {};

        return {
            libDays: typeStats.libDays || { average: 0, stdDev: 0 },
            missedReleases: typeStats.missedReleases || { average: 0, stdDev: 0 },
            distance: {
                first: typeStats.distance?.first || { average: 0 },
                second: typeStats.distance?.second || { average: 0 },
                third: typeStats.distance?.third || { average: 0 }
            },
            releaseFrequency: typeStats.releaseFrequency || { average: 0, stdDev: 0 }
        };
    };

    // Process stats array and aggregate the data
    statsArray.forEach(stat => {
        const versionType = stat.versionType;
        const statsData = extractStats(versionType, stat.stats);

        // Accumulate values
        versionStats[versionType].libDays.average += statsData.libDays.average;
        versionStats[versionType].libDays.stdDev += statsData.libDays.stdDev;
        versionStats[versionType].missedReleases.average += statsData.missedReleases.average;
        versionStats[versionType].missedReleases.stdDev += statsData.missedReleases.stdDev;
        versionStats[versionType].distance.first.average += statsData.distance.first.average;
        versionStats[versionType].distance.second.average += statsData.distance.second.average;
        versionStats[versionType].distance.third.average += statsData.distance.third.average;
        versionStats[versionType].releaseFrequency.average += statsData.releaseFrequency.average;
        versionStats[versionType].releaseFrequency.stdDev += statsData.releaseFrequency.stdDev;
    });

    // Normalize or average the results
    // Here you can add logic for calculating averages if needed

    return {
        technicalLag: {
            libDays: versionStats.Minor.libDays.average, // example, adapt as needed
            distance: {
                first: versionStats.Minor.distance.first.average,
                second: versionStats.Minor.distance.second.average,
                third: versionStats.Minor.distance.third.average
            },
            releaseFrequency: {
                releasesPerMonth: versionStats.Minor.releaseFrequency.average
            },
            numberOfMissedReleases: 2 // Example, replace with actual logic to determine the number of missed releases
        },
        versionType: {
            minor: "Minor",
            major: "Major",
            patch: "Patch"
        },
        libDays: {
            average: versionStats.Minor.libDays.average,
            stdDev: versionStats.Minor.libDays.stdDev
        },
        missedReleases: {
            average: versionStats.Minor.missedReleases.average,
            stdDev: versionStats.Minor.missedReleases.stdDev
        },
        distance: {
            first: {
                average: versionStats.Minor.distance.first.average
            },
            second: {
                average: versionStats.Minor.distance.second.average
            },
            third: {
                average: versionStats.Minor.distance.third.average
            }
        },
        releaseFrequency: {
            average: versionStats.Minor.releaseFrequency.average,
            stdDev: versionStats.Minor.releaseFrequency.stdDev
        }
    };
};
