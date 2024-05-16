import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface JSONData {
    [key: string]: any;
}

interface Props {
    jsonData: JSONData;
}

const TreeComponent: React.FC<Props> = ({ jsonData }) => {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        const width = +svg.attr('width');
        const height = +svg.attr('height');
        const g = svg.append('g').attr('transform', `translate(40,0)`);

        const treeLayout = d3.tree<JSONData>().size([height, width - 160]);

        const root = d3.hierarchy<JSONData>(jsonData);

        const linkGenerator = (d: any) => {
            return `M${d.source.y},${d.source.x}L${d.target.y},${d.target.x}`;
        };

        g.selectAll('.link')
            .data(treeLayout(root).links())
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkGenerator);

        const node = g
            .selectAll<SVGGElement, d3.HierarchyPointNode<JSONData>>('.node')
            .data(root.descendants())
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d) => `translate(${d.y},${d.x})`);

        node
            .append('circle')
            .attr('r', 5)
            .attr('fill', 'steelblue');

        node
            .append('text')
            .attr('dy', '0.31em')
            .attr('x', (d) => (d.children ? -6 : 6))
            .attr('text-anchor', (d) => (d.children ? 'end' : 'start'))
            .text((d) => d.data.name)
            .clone(true)
            .lower()
            .attr('stroke', 'white');

        return () => {
            svg.selectAll('*').remove();
        };
    }, [jsonData]);

    return <svg ref={svgRef} width="960" height="500"></svg>;
};

export default TreeComponent;
