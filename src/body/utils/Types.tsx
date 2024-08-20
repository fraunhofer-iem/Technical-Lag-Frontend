/*
export interface JSONodeData {
    name: string,
    version: string,
    releaseDate: string,
    ecosystem?: string,
    root: boolean,
    repoURL?: string,
    revision?: string;
    stats?: Stats[];
    scopes: Scopes[];
}

export type Scopes = {
    scope: 'dependencies' | 'devDependencies';
    data: JSONodeData[];
};

interface Distance {
    first: number;
    second: number;
    third: number;
}

interface ReleaseFrequency {
    releasesPerMonth: number;
}

export interface TechnicalLagNode {
    libDays: number;
    distance: Distance;
    version: string; //For each versiontype
    releaseFrequency: ReleaseFrequency;
    numberOfMissedReleases: number;
}

export interface TechnicalLagChildren {
    libDays: {
        average: number;
        stdDev: number;
    };
    missedReleases: {
        average: number;
        stdDev: number;
    };
    distance: {
        first: {
            average: number;
        }; second: {
            average: number;
        }; third: {
            average: number;
        };
    };
    releaseFrequency: {
        average: number;
        stdDev: number;
    };
}

interface MajorStats {
    technicalLag: TechnicalLagNode;
    children: TechnicalLagChildren;
}


interface MinorStats {
    technicalLag: TechnicalLagNode;
    children: TechnicalLagChildren;
}


interface PatchStats {
    technicalLag: TechnicalLagNode;
    children: TechnicalLagChildren;
}

export type Stats = {
    versionType: 'Major';
    stats: MajorStats;
} | {
    versionType: 'Minor';
    stats: MinorStats;
} | {
    versionType: 'Patch';
    stats: PatchStats;
};*/

export interface RepositoryInfo {
    url: string;
    revision: string;
    projects: Project[];
}

export interface Project {
    type: string;
    namespace: string;
    name: string;
    version: string;
}

export interface Artifact {
    artifactId: string;
    groupId: string;
    versions: string[];
}

export interface Node {
    nodeid: string;
    name: string;
    version: string;
    releaseDate: string;
    root: boolean;
    stats?: Stats[];
    scopes: Scope[];
}
//dependecies-0-12321432
//generate random number
Math.random()

export interface Scope {
    scope: 'dependencies' | 'devDependencies';
    data: Node[];
}

export interface Edge {
    from: number;
    to: number;
}

export interface Graph {
    nodes: Node[];
    edges: Edge[];
    directDependencyIndices: number[];
    stats: Stats[];
    metadata: Metadata;
}

/*export interface Metadata {
    [key: string]: string;  // Metadata fields can be dynamic.
}*/

export interface ProjectDto {
    artifacts: Artifact[];
    graphs: Graph[];
    version: string;
    artifactId: string;
}

// Technical Lag Interfaces
interface Distance {
    first: number;
    second: number;
    third: number;
}

interface ReleaseFrequency {
    releasesPerMonth: number;
}

export interface TechnicalLagNode {
    libDays: number;
    distance: Distance;
    version: string; // For each version type
    releaseFrequency: ReleaseFrequency;
    numberOfMissedReleases: number;
}

export interface TechnicalLagChildren {
    libDays: {
        average: number;
        stdDev: number;
    };
    missedReleases: {
        average: number;
        stdDev: number;
    };
    distance: {
        first: {
            average: number;
        };
        second: {
            average: number;
        };
        third: {
            average: number;
        };
    };
    releaseFrequency: {
        average: number;
        stdDev: number;
    };
}

interface MajorStats {
    technicalLag: TechnicalLagNode;
    children: TechnicalLagChildren;
}

interface MinorStats {
    technicalLag: TechnicalLagNode;
    children: TechnicalLagChildren;
}

interface PatchStats {
    technicalLag: TechnicalLagNode;
    children: TechnicalLagChildren;
}

export type Stats = {
    versionType: 'Major';
    stats: MajorStats;
} | {
    versionType: 'Minor';
    stats: MinorStats;
} | {
    versionType: 'Patch';
    stats: PatchStats;
};

export interface RootJSON {
    repositoryInfo: RepositoryInfo;
    ecosystem: string;
    projectDtos: ProjectDto[];
}
