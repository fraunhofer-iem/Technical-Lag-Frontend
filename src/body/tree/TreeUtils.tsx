import * as d3 from 'd3';
import {HierarchyNodeExtended, JSONData} from './Types';
import React from "react";

const transitionTime = 500;
const radius = 12;

export const updateTree = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    root: HierarchyNodeExtended,
    dimensions: { width: number; height: number },
    idMap: Map<HierarchyNodeExtended, number>,
    setSelectedFullName: (name: string) => void,
    setSelectedVersion: (version: string) => void,
    setSelectedReleaseDate: (releaseDate: string) => void,
    setSelectedNodeEcosystem: (ecosystem: string) => void,
    setSelectedNodeOrtVersion: (ortVersion: string) => void,
    setSelectedNodeJavaVersion: (javaVersion: string) => void,
) => {
    const treeLayout = d3.tree<JSONData>().size([dimensions.width, dimensions.height]);

    root.x0 = dimensions.height / 2;
    root.y0 = 0;

    const click = (event: React.MouseEvent, d: HierarchyNodeExtended) => {
        if (event.button === 2) {  // 2 is the right mouse button
            if (d.children) {
                d._children = d.children;
                d.children = undefined;
            } else {
                d.children = d._children;
                d._children = undefined;
            }
            update(d);
        }
    };


    const update = (source: HierarchyNodeExtended) => {
        const treeData = treeLayout(root);
        const nodes = treeData.descendants() as HierarchyNodeExtended[];
        const links = treeData.descendants().slice(1) as HierarchyNodeExtended[];

        nodes.forEach(d => {
            d.y = d.depth * 140; // Increase depth spacing
            // @ts-ignore
            d.x *= 3; // Increase width spacing
        });


        updateNodes(
            g,
            nodes,
            source,
            idMap,
            click,
            setSelectedFullName,
            setSelectedVersion,
            setSelectedReleaseDate,
            setSelectedNodeEcosystem,
            setSelectedNodeOrtVersion,
            setSelectedNodeJavaVersion
        );
        updateLinks(g, links, source);

        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };

    update(root);
};

const updateNodes = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    nodes: HierarchyNodeExtended[],
    source: HierarchyNodeExtended,
    idMap: Map<HierarchyNodeExtended, number>,
    click: (event: React.MouseEvent, d: HierarchyNodeExtended) => void,
    setSelectedFullName: (name: string) => void,
    setSelectedVersion: (name: string) => void,
    setSelectedReleaseDate: (name: string) => void,
    setSelectedNodeEcosystem: (ecosystem: string) => void,
    setSelectedNodeOrtVersion: (ortVersion: string) => void,
    setSelectedNodeJavaVersion: (javaVersion: string) => void,
) => {
    const node = g.selectAll<SVGGElement, HierarchyNodeExtended>('g.node')
        .data(nodes, (d: HierarchyNodeExtended) => idMap.get(d)!.toString());

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .on('contextmenu', (event: React.MouseEvent, d: HierarchyNodeExtended) => {
            event.preventDefault(); // Prevent the default context menu
            click(event, d);
        });

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', radius)
        .attr('fill', d => d._children ? 'black' : '#999')
        .attr('stroke', "#fff")
        .attr('stroke-width', "3px")
        .on('click', (event: React.MouseEvent, d: HierarchyNodeExtended) => {
            if (event.button === 0) { // Check for left mouse click
                // Open sidebar here with node information
                setSelectedFullName(d.data.name);
                setSelectedVersion(d.data.version);
                setSelectedReleaseDate(d.data.releaseDate);
                if (!d.parent) { // Check if the node is the root
                    setSelectedNodeEcosystem(d.data.ecosystem || "N/A");
                    setSelectedNodeOrtVersion(d.data.ortVersion || "N/A");
                    setSelectedNodeJavaVersion(d.data.javaVersion || "N/A");
                }
            }
        });

    nodeEnter.append('text')
        .attr('dy', '0.35em')
        .attr('y', d => d.children || d._children ? -25 : 30)
        .attr('text-anchor', 'middle')
        .text(d => {
            const fullText = d.data.name;
            return fullText.length > 10 ? fullText.slice(0, 10) + '...' : fullText; // Truncate text
        })
        .lower()
        .attr('font', 'sans-serif')
        .attr('fill', 'white')
        .attr('font-size', '1.0vw');

    nodeEnter.filter((d: any) => d.parent !== null) // Assuming null indicates the root node
        .append('title')
        .text((d: any) => `${d.data.name}\n${d.data.version}`);

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(transitionTime)
        .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeUpdate.select('circle.node')
        .attr('r', radius)
        .attr('fill', d => d._children ? '#ffffff' : '#179b7c');

    //When collapsed
    const nodeExit = node.exit().transition()
        .duration(transitionTime)
        .attr('transform', () => `translate(${source.x},${source.y})`)
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6);
};

const updateLinks = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    links: HierarchyNodeExtended[],
    source: HierarchyNodeExtended
) => {
    const link = g.selectAll<SVGPathElement, HierarchyNodeExtended>('path.link')
        .data(links, d => d.id ? d.id : "");

    const linkGenerator = d3.linkVertical<d3.HierarchyLink<JSONData>, d3.HierarchyPointNode<JSONData>>()
        .x(d => d.x)
        .y(d => d.y);

    const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
            const o = {x: source.x0, y: source.y0};
            return linkGenerator({
                source: o as unknown as d3.HierarchyPointNode<JSONData>,
                target: o as unknown as d3.HierarchyPointNode<JSONData>
            });
        })
        .attr('stroke', '#ccc')
        .attr('stroke-width', "2px")
        .attr("stroke-opacity", 0.6)
        .attr('fill', 'none');

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(transitionTime)
        .attr('d', d => {
            const source = d.parent ? d.parent : d;
            return linkGenerator({source, target: d});
        });

    link.exit().transition()
        .duration(transitionTime)
        .attr('d', () => {
            const o = {x: source.x, y: source.y};
            return linkGenerator({
                source: o as unknown as d3.HierarchyPointNode<JSONData>,
                target: o as unknown as d3.HierarchyPointNode<JSONData>
            });
        })
        .remove();
};