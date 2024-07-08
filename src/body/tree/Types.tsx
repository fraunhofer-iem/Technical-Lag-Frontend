import * as d3 from 'd3';

export interface JSONData {
    name: string,
    children?: JSONData[],
    version: string,
    releaseDate: string,
    ecosystem?: string,
    root: boolean,
    repoURL: string,
    revision: string;
    stats?: {
        Minor?: {
            //Aktueller Knoten
            technicalLag: {
                libDays: number;
                version: string;
                releaseFrequency: {
                    releasesPerMonth: number; //Eine Nachkommestelle
                };
                numberOfMissedReleases: number;
            };
            //Kinder
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
        };
        Major?: {
            //Aktueller Knoten
            technicalLag: {
                libDays: number;
                version: string;
                releaseFrequency: {
                    releasesPerMonth: number; //Eine Nachkommestelle
                };
                numberOfMissedReleases: number;
            };
            //Kinder
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
        };
        Patch?: {
            //Aktueller Knoten
            technicalLag: {
                libDays: number;
                version: string;
                releaseFrequency: {
                    releasesPerMonth: number; //Eine Nachkommestelle
                };
                numberOfMissedReleases: number;
            };
            //Kinder
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
        };
    };
}

export interface HierarchyNodeExtended extends d3.HierarchyNode<JSONData> {
    x0?: number;
    y0?: number;
    _children?: HierarchyNodeExtended[];
    hasChildren?: boolean;
}
