export interface JSONData {
    name: string,
    children?: JSONData[],
    version: string,
    releaseDate: string,
    ecosystem?: string,
    root: boolean,
    repoURL: string,
    revision: string;
    stats: Stats[];
}

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
    version: string; //For each Versiontype
    releaseFrequency: ReleaseFrequency;
    numberOfMissedReleases: number;
}

export interface TechnicalLagChildren {
    libDays: {
        average: number; stdDev: number;
    };
    missedReleases: {
        average: number; stdDev: number;
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
        average: number; stdDev: number;
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
