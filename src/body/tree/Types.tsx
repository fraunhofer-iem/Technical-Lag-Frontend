import * as d3 from 'd3';

export interface JSONData {
    name: string,
    children?: JSONData[],
    version: string,
    releaseDate: string,
    ecosystem?: string,
    ortVersion?: string,
    javaVersion?: string;
}

export interface HierarchyNodeExtended extends d3.HierarchyNode<JSONData> {
    x0?: number;
    y0?: number;
    _children?: HierarchyNodeExtended[];
}
