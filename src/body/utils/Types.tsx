export interface JSONData {
    name: string,
    children?: JSONData[],
    version: string,
    releaseDate: string,
    ecosystem?: string,
    root: boolean,
    repoURL: string,
    revision: string;
    stats?: Stats;
}

interface TechnicalLag {
    libDays: number;
    distance: {
        first: number;
        second: number;
        third: number;
    };
    releaseFrequency: {
        releasesPerMonth: number; //Eine Nachkommestelle
    };
    numberOfMissedReleases: number;
}

export interface Stats {
    technicalLag: TechnicalLag;
    versionType: {
        minor: string;
        major: string;
        patch: string;
    };
    libDays: {
        average: number;
        stdDev: number; //Threshhold definieren
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
