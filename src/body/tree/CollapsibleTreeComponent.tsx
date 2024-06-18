import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {HierarchyNodeExtended, JSONData} from './Types';
import useResize from './Resizable';
import {updateTree} from './TreeUtils';
import './tree.css';

interface Props {
    jsonData: JSONData,
    setSelectedNodeName: (name: string) => void,
    setSelectedNodeVersionNumber: (versionNumber: string) => void,
    setSelectedNodeReleaseDate: (releaseDate: string) => void,
    setAppEcosystem: (ecosystem: string) => void,
    setAppOrtVersion: (ortVersion: string) => void,
    setAppJavaVersion: (javaVersion: string) => void,
    setAppRepoURL: (repoURL: string) => void,
    setAppRevision: (revision: string) => void,
    setIsRoot: (root: boolean) => void
}

const CollapsibleTreeComponent: React.FC<Props> = ({
                                                       jsonData,
                                                       setSelectedNodeName,
                                                       setSelectedNodeVersionNumber,
                                                       setSelectedNodeReleaseDate,
                                                       setAppEcosystem,
                                                       setAppOrtVersion,
                                                       setAppJavaVersion,
                                                       setAppRepoURL,
                                                       setAppRevision,
                                                       setIsRoot
                                                   }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const dimensions = useResize(svgRef);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        const zoom = d3.zoom<SVGSVGElement, unknown>()
            .scaleExtent([0.5, 3])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svg.call(zoom);

        const {width, height} = dimensions;
        const margin = {top: 50, right: 0, bottom: 50, left: 0};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const root: HierarchyNodeExtended = d3.hierarchy<JSONData>(jsonData) as HierarchyNodeExtended;
        let i = 0;
        const idMap = new Map<HierarchyNodeExtended, number>();
        root.each((d: HierarchyNodeExtended) => {
            if (!idMap.has(d)) {
                idMap.set(d, ++i);
            }
        });

        updateTree(g, root, {
                width: innerWidth,
                height: innerHeight
            }, idMap, setSelectedNodeName, setSelectedNodeVersionNumber,
            setSelectedNodeReleaseDate, setAppEcosystem,
            setAppOrtVersion, setAppJavaVersion, setAppRepoURL, setAppRevision, setIsRoot);

        return () => {
            svg.selectAll('*').remove();
        };
    }, [jsonData, dimensions, setSelectedNodeName,
        setSelectedNodeVersionNumber, setSelectedNodeReleaseDate,
        setAppEcosystem, setAppOrtVersion, setAppJavaVersion, setAppRepoURL, setAppRevision, setIsRoot]);

    return (
        <div className="svg-container">
            <svg
                ref={svgRef}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMidYMid meet"
                style={{width: '100%', height: '100%', overflow: 'visible'}}
            ></svg>
        </div>
    );
};

export default CollapsibleTreeComponent;
