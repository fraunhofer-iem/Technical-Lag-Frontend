import d3, {hierarchy, json, tree} from "d3";
import React, { useEffect, useRef } from 'react';

interface TreeProps {
    treeData: d3.HierarchyPointNode<any>;
}

const Tree: React.FC<TreeProps> = ({ treeData }) => {
    const ref = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const svg = d3.select(ref.current);
        const treeLayout = d3.tree<any>().size([500, 300]);

        const root = treeLayout(treeData);

        const linkGenerator = d3.linkHorizontal<d3.HierarchyPointNode<any>, any>()
            .x((d: any) => d.y)
            .y((d: any) => d.x);



        const nodeTreemap = d3.treemap<any>()
            .size([500, 300])
            .paddingInner(10);

        nodeTreemap(root);

        const node = svg.selectAll('.node')
            .data(root.descendants())
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', (d: any) => `translate(${d.x0}, ${d.y0})`);

        node.append('rect')
            .attr('width', (d: any) => d.x1 - d.x0)
            .attr('height', (d: any) => d.y1 - d.y0);

        node.append('text')
            .attr('x', (d: any) => (d.x1 - d.x0) / 2)
            .attr('y', (d: any) => (d.y1 - d.y0) / 2 + 5)
            .text((d: any) => d.data.name);

    }, [treeData]);

    return (
        <svg ref={ref} width="500" height="300"></svg>
    );
};

export default Tree;