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
        root: true,
        stats: []
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
                children: [],
                stats: node.stats ? simplifyStats(node.stats) : []
            };

            nodeMap.set(node.artifactIdx, nodeData);
        });
    });

    root.stats = [];

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

const simplifyStats = (statsArray: any[]): Stats[] => {
    const statsMap: { [key: string]: any } = {};

    // Process each stat entry in the array
    statsArray.forEach(stat => {
        statsMap[stat.versionType] = {
            technicalLag: {
                libDays: stat.stats.technicalLag.libDays,
                distance: {
                    first: stat.stats.technicalLag.distance.first,
                    second: stat.stats.technicalLag.distance.second,
                    third: stat.stats.technicalLag.distance.third
                },
                version: stat.stats.technicalLag.version,
                releaseFrequency: {
                    releasesPerDay: stat.stats.technicalLag.releaseFrequency.releasesPerDay,
                    releasesPerWeek: stat.stats.technicalLag.releaseFrequency.releasesPerWeek,
                    releasesPerMonth: stat.stats.technicalLag.releaseFrequency.releasesPerMonth
                },
                numberOfMissedReleases: stat.stats.technicalLag.numberOfMissedReleases
            },
            children: {
                libDays: {
                    average: stat.stats.libDays.average,
                    variance: stat.stats.libDays.variance,
                    stdDev: stat.stats.libDays.stdDev
                },
                missedReleases: {
                    average: stat.stats.missedReleases.average,
                    variance: stat.stats.missedReleases.variance,
                    stdDev: stat.stats.missedReleases.stdDev
                },
                distance: {
                    first: {
                        average: stat.stats.distance.first.average,
                        variance: stat.stats.distance.first.variance,
                        stdDev: stat.stats.distance.first.stdDev
                    },
                    second: {
                        average: stat.stats.distance.second.average,
                        variance: stat.stats.distance.second.variance,
                        stdDev: stat.stats.distance.second.stdDev
                    },
                    third: {
                        average: stat.stats.distance.third.average,
                        variance: stat.stats.distance.third.variance,
                        stdDev: stat.stats.distance.third.stdDev
                    }
                },
                releaseFrequency: {
                    average: stat.stats.releaseFrequency.average,
                    variance: stat.stats.releaseFrequency.variance,
                    stdDev: stat.stats.releaseFrequency.stdDev
                }
            }
        };
    });

    // Ensure all three version types are represented
    return ['Minor', 'Major', 'Patch'].map(versionType => {
        const stats = statsMap[versionType] || {
            technicalLag: {
                libDays: 0,
                distance: {first: 0, second: 0, third: 0},
                version: "unknown",
                releaseFrequency: {releasesPerDay: 0, releasesPerWeek: 0, releasesPerMonth: 0},
                numberOfMissedReleases: 0
            },
            children: {
                libDays: {average: 0, variance: 0, stdDev: 0},
                missedReleases: {average: 0, variance: 0, stdDev: 0},
                distance: {
                    first: {average: 0, variance: 0, stdDev: 0},
                    second: {average: 0, variance: 0, stdDev: 0},
                    third: {average: 0, variance: 0, stdDev: 0}
                },
                releaseFrequency: {average: 0, variance: 0, stdDev: 0}
            }
        };

        return {versionType: versionType as 'Minor' | 'Major' | 'Patch', stats} as Stats;
    });
};
