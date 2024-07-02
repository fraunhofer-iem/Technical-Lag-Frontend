import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {HierarchyNodeExtended, JSONData} from './Types';
import useResize from './Resizable';
import {updateTree} from './TreeUtils';
import "./tree.css";
import NodeManager from './NodeManager'; // Adjust path as needed

interface Props {
    jsonData: JSONData,
    nodeManager: NodeManager
}

const CollapsibleTreeComponent: React.FC<Props> = ({
                                                       jsonData,
                                                       nodeManager
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
        const margin = {top: 40, right: 10, bottom: 10, left: 10};
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
            }, idMap, nodeManager.setSelectedNodeName.bind(nodeManager),
            nodeManager.setSelectedNodeVersionNumber.bind(nodeManager),
            nodeManager.setSelectedNodeReleaseDate.bind(nodeManager),
            nodeManager.setAppEcosystem.bind(nodeManager),
            nodeManager.setAppRepoURL.bind(nodeManager),
            nodeManager.setAppRevision.bind(nodeManager),
            nodeManager.setIsRoot.bind(nodeManager));

        return () => {
            svg.selectAll('*').remove();
        };
    }, [jsonData, dimensions, nodeManager]);

    return (
        <div>
            <div id="tooltip" className="tooltip">
                <strong id="tooltip-title"></strong><br/>
                <span id="tooltip-content"></span>
            </div>
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
