export interface Stats {
    versionType: 'Minor' | 'Major' | 'Patch';
    stats: {
        technicalLag: {
            libDays: number;
            distance: {
                first: number;
                second: number;
                third: number;
            };
            version: string;
            releaseFrequency: {
                releasesPerDay: number;
                releasesPerWeek: number;
                releasesPerMonth: number;
            };
            numberOfMissedReleases: number;
        };
        children: {
            libDays: {
                average: number;
                variance: number;
                stdDev: number;
            };
            missedReleases: {
                average: number;
                variance: number;
                stdDev: number;
            };
            distance: {
                first: {
                    average: number;
                    variance: number;
                    stdDev: number;
                };
                second: {
                    average: number;
                    variance: number;
                    stdDev: number;
                };
                third: {
                    average: number;
                    variance: number;
                    stdDev: number;
                };
            };
            releaseFrequency: {
                average: number;
                variance: number;
                stdDev: number;
            };
        };
    };
}

export interface Node {
    nodeName: string;
    nodeId: string;
    usedVersion: string;
    stats: Stats[];
}

export interface Edge {
    from: string;
    to: string;
}

export interface RepositoryInfo {
    repoURL: string;
    revision: string;
    ecosystem: string;
    projectName: string;
    projectVersion: string;
}

export interface RootNode {
    rootName: string;
    rootId: string;
    repositoryInfo: RepositoryInfo;
}

export interface Graph {
    //scope: string;
    root: RootNode;
    nodes: Node[];
    edges: Edge[];
    directDependencies: number[];
}

export interface Artifact {
    artifactID: number;
    artifactName: string;
    defaultVersionNumber: string;
    releaseDate: number;
/*    [key: string]: any; // Adjust this if needed*/
}
