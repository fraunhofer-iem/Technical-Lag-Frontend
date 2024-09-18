import * as React from "react";
import {v4 as uuidv4} from 'uuid';
import {Artifact, Edge, Graph, Node, RepositoryInfo, RootNode, Stats} from "./JSONStructureInterfaces.tsx";


export const parseJSON = (
    files: File[],
    setTransformedJSONData: React.Dispatch<React.SetStateAction<{ normalGraph: Graph, devGraph: Graph } | null>>,
    setIsFileDropped: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);
                console.log("Parsed JSON:", json);
                const {normalGraph, devGraph} = transformData(json); // Destructure to get both graphs
                setTransformedJSONData({normalGraph, devGraph});
                setIsFileDropped(true); // Hide the FileDrop and show the chart

                // Store bo th graphs in session storage
                sessionStorage.setItem("normalGraph", JSON.stringify(normalGraph));
                sessionStorage.setItem("devGraph", JSON.stringify(devGraph));
                sessionStorage.setItem("isFileDropped", "true");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Error parsing JSON file:", {
                        message: error.message,
                        stack: error.stack,
                        data: event.target?.result,
                    });
                } else {
                    console.error("An unknown error occurred.", {
                        data: event.target?.result,
                    });
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

const transformData = (json: any): { normalGraph: Graph, devGraph: Graph } => {
    const projectDTO = json.projectDtos[0];

    const repositoryInfo: RepositoryInfo = {
        repoURL: json.repositoryInfo.url,
        revision: json.repositoryInfo.revision,
        ecosystem: json.repositoryInfo.projects[0].type,
        projectName: json.repositoryInfo.projects[0].name,
        projectVersion: json.repositoryInfo.projects[0].version
    };

    if (!projectDTO) {
        throw new Error("Project DTO is missing or undefined.");
    }

    if (!repositoryInfo) {
        throw new Error("Repository info is missing or undefined.");
    }

    const root: RootNode = createRootNode(repositoryInfo);

    // Create artifact map
    const artifactMap = createArtifactMap(projectDTO);

    // Process graphs for both scopes
    const normalGraph = processScopeGraph(root, projectDTO, artifactMap, "dependencies");
    console.log("normalGraph: ", normalGraph)
    const devGraph = processScopeGraph(root, projectDTO, artifactMap, "devDependencies");


    return {normalGraph, devGraph};
};

// Helper: Create root node
const createRootNode = (repositoryInfo: RepositoryInfo): RootNode => {
    return {
        rootName: repositoryInfo.projectName,
        rootId: repositoryInfo.projectName + "_" + uuidv4(),
        repositoryInfo
    };
};

// Helper: Create artifact map
const createArtifactMap = (projectDTO: any) => {
    const artifactMap = new Map<number, Artifact>();
    let id = 0;

    projectDTO.artifacts.forEach((artifactJson: { artifactId: string; }) => {
        const artifact = {
            artifactID: id++,
            artifactName: artifactJson.artifactId,
            defaultVersionNumber: "",
            releaseDate: 0
        };
        artifactMap.set(artifact.artifactID, artifact);
    });

    projectDTO.artifacts.forEach((artifactJson: { versions: any[]; artifactId: number; }) => {
        const defaultVersion = artifactJson.versions.find((version) => version.isDefault);
        if (defaultVersion) {
            const artifact = artifactMap.get(artifactJson.artifactId);
            if (artifact) {
                artifact.defaultVersionNumber = defaultVersion.versionNumber;
                artifact.releaseDate = defaultVersion.releaseDate;
            }
        }
    });
    return artifactMap;
};

// Helper: Process nodes and edges for a specific scope
const processScopeGraph = (
    root: RootNode,
    projectDto: any,
    artifactMap: Map<number, Artifact>,
    scope: string
): Graph => {
    const nodeMap = new Map<number, Node>();
    let edges: Edge[] = [];

    // Find the graph item for the given scope
    const graphItem = projectDto.graph.find((item: any) => item.scope === scope);
    console.log("graphItem: ", graphItem);

    if (graphItem) {
        // Process nodes
        graphItem.graph.nodes.forEach((node: any) => {
            const artifact = artifactMap.get(node.artifactIdx);
            if (!artifact) {
                console.warn(`Artifact with index ${node.artifactIdx} not found in artifactMap.`);
                return;
            }

            const nodeData: Node = {
                nodeName: artifact.artifactName,
                nodeId: scope + "_" + artifact.artifactName + "_" + uuidv4(),
                //usedVersion: artifact.versions[usedVersionIndex]?.versionNumber || "unknown",
                usedVersion: artifact.defaultVersionNumber,
                stats: node.stats ? simplifyStats(node.stats) : []
            };
            nodeMap.set(node.artifactIdx, nodeData);
        });

        const allNodesArray = Array.from(nodeMap.values());
        // Process direct dependencies
        edges = processDirectDependencies(root, allNodesArray, graphItem.graph.directDependencyIndices, edges);
        // Process edges between nodes
        edges = processEdges(allNodesArray, graphItem.graph.edges, edges);
    }

    return {
        root,
        nodes: [...nodeMap.values()],
        edges,
    };
};

// Helper: Process direct dependencies
const processDirectDependencies = (
    root: RootNode,
    nodeArray: Node[],
    directDependencyIndices: number[],
    edges: Edge[]
): Edge[] => {
    directDependencyIndices.forEach((artifactID: number) => {
        if (nodeArray.length > 0) {
            const directNode = nodeArray[artifactID];

            if (directNode) {
                edges.push({
                    from: root.rootId,
                    to: directNode.nodeId,
                });
            }
        } else {
            console.error('No nodes found in the nodeArray');
        }
    });
    return edges;
};

// Helper: Process edges between nodes
const processEdges = (
    nodeArray: Node[],
    graphEdges: any[],
    edges: Edge[]
): Edge[] => {
    graphEdges.forEach((edge: any) => {
        if (nodeArray.length > 0) {
            const fromNode = nodeArray[edge.from];
            const toNode = nodeArray[edge.to];
/*            console.log("fromArtifactNode: " + fromNode?.nodeName);
            console.log("toArtifactNode: " + toNode?.nodeName);*/
            if (fromNode && toNode) {
                edges.push({
                    from: fromNode.nodeId,
                    to: toNode.nodeId,
                });
            }
        }
    });
    return edges;
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
