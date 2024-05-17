import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import './tree.css';

interface JSONData {
    [key: string]: any;
}

interface Props {
    jsonData: JSONData;
}

const TreeComponent: React.FC<Props> = ({ jsonData }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [dimensions, setDimensions] = useState({
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    });

    const handleResize = () => {
        if (svgRef.current) {
            const boundingRect = svgRef.current.getBoundingClientRect();
            setDimensions({ width: boundingRect.width, height: boundingRect.height });
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!svgRef.current) return;

        // Create a svg
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove();

        // Size
        const { width, height } = dimensions;
        const margin = { top: 50, right: 0, bottom: 50, left: 100 }; // Adjusted margin for better visibility
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        const g = svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        // Create the tree with swapped x and y positions
        const treeLayout = d3.tree<JSONData>().size([innerWidth, innerHeight]);

        // The root of the tree
        const root = d3.hierarchy<JSONData>(jsonData);
        treeLayout(root);

        // Create links between nodes
        const linkGenerator = d3
            .linkVertical<d3.HierarchyLink<JSONData>, d3.HierarchyPointNode<JSONData>>()
            .x((d) => d.x)
            .y((d) => d.y);

        g.selectAll('.link')
            .data(root.links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkGenerator)
            .attr('stroke', 'white')
            .attr('stroke-width', 1.5)
            .attr('fill', 'none');

        // Read node out of json
        const node = g
            .selectAll<SVGGElement, d3.HierarchyPointNode<JSONData>>('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.x},${d.y})`); // Adjusted x and y positions

        // Node as a circle
        node.append('circle').attr('r', 7).attr('fill', '#67bf98');

        // Node text
        node
            .append('text')
            .attr('dy', '0.32em')
            .attr('y', (d) => (d.children ? -20 : 20)) // Adjusted y position
            .attr('text-anchor', 'middle')
            .text((d) => d.data.name)
            .lower()
            .attr('stroke', 'black')
            .attr('stroke-width', 2)
            .attr('font-size', '1.1em');

        return () => {
            svg.selectAll('*').remove();
        };
    }, [jsonData, dimensions]);

    return (
        <div style={{ overflow: 'auto', width: '95%', height: '60vh' }}>
            <svg
                ref={svgRef}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                preserveAspectRatio="xMinYMin meet"
                style={{ width: '100%', height: '95%' }}
            ></svg>
        </div>
    );
};

export default TreeComponent;