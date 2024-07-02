import * as d3 from 'd3';
import {HierarchyNodeExtended, JSONData} from './Types';
import React from "react";
import {interpolatePath} from 'd3-interpolate-path';
import NodeManager from "./NodeManager.tsx";

function handleTransitionTime(event: MouseEvent | React.MouseEvent): number {
    // Type narrowing to ensure compatibility with both event types
    const nativeEvent = event instanceof MouseEvent ? event : event.nativeEvent;
    return nativeEvent.altKey ? 800 : 250;
}

const radius = 12;

export const updateTree = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    root: HierarchyNodeExtended,
    dimensions: { width: number; height: number },
    idMap: Map<HierarchyNodeExtended, number>,
    nodeManager: NodeManager
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
            update(d, event);
        }
    };

    const update = (source: HierarchyNodeExtended, event: MouseEvent | React.MouseEvent) => {
        const treeData = treeLayout(root);
        const nodes = treeData.descendants() as HierarchyNodeExtended[];
        const links = treeData.descendants().slice(1) as HierarchyNodeExtended[];

        const widthSpacingFactor = 3.0; // Adjust this factor to increase horizontal spacing
        const depthSpacingFactor = 180; // Adjust this factor to increase vertical spacing

        nodes.forEach(d => {
            d.y = d.depth * depthSpacingFactor;
            d.x = (d.x ?? 0) * widthSpacingFactor;
        });

        // Use handleTransitionTime to calculate the transition duration
        const transitionTime = handleTransitionTime(event);

        updateNodes(
            g,
            nodes,
            source,
            idMap,
            click,
            nodeManager,
            transitionTime
        );

        updateLinks(g, links, source, transitionTime);

        // Save the old positions for transition
        nodes.forEach(d => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    };
    // Initialize with a default event
    const defaultEvent = new MouseEvent('click') as unknown as React.MouseEvent;
    update(root, defaultEvent);

    // Add tween function for transition
    g.transition().tween('resize', () => {
        const initialHeight = +g.attr('height');
        const finalHeight = dimensions.height;

        return (t: number) => {
            const height = initialHeight + (finalHeight - initialHeight) * t;
            g.attr('height', height);
        };
    });
};

const updateNodes = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    nodes: HierarchyNodeExtended[],
    source: HierarchyNodeExtended,
    idMap: Map<HierarchyNodeExtended, number>,
    click: (event: React.MouseEvent, d: HierarchyNodeExtended) => void,
    nodeManager: NodeManager,
    transitionTime: number
) => {
    const node = g.selectAll<SVGGElement, HierarchyNodeExtended>('g.node')
        .data(nodes, (d: HierarchyNodeExtended) => idMap.get(d)!.toString());

    const tooltip = d3.select<HTMLDivElement, unknown>('#tooltip');

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .on('contextmenu', (event: React.MouseEvent, d: HierarchyNodeExtended) => {
            event.preventDefault();
            click(event, d);
        })
        .on('mouseover', (_event, d) => {
            tooltip.style('visibility', 'visible');
            d3.select('#tooltip-title').html(`<strong>${d.data.name}</strong>`);
            d3.select('#tooltip-content').text(d.data.version);
        })
        .on('mousemove', (event) => {
            tooltip.style('top', `${event.pageY + 10}px`)
                .style('left', `${event.pageX + 10}px`);
        })
        .on('mouseout', () => {
            tooltip.style('visibility', 'hidden');
        });

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', radius)
        .attr('fill', d => d._children ? 'black' : '#999')
        .attr('stroke', "#fff")
        .attr('stroke-width', "2px")
        .on('click', (event: React.MouseEvent, d: HierarchyNodeExtended) => {
            if (event.button === 0) { // Check for left mouse click
                // Open sidebar here with node information
                nodeManager.setSelectedNodeName(d.data.name);
                nodeManager.setSelectedNodeVersionNumber(d.data.version);
                nodeManager.setSelectedNodeReleaseDate(d.data.releaseDate);
                if (!d.parent) {
                    nodeManager.setIsRoot(true);
                    nodeManager.setAppEcosystem(d.data.ecosystem ?? "N/A");
                    nodeManager.setAppRepoURL(d.data.repoURL ?? "N/A");
                    nodeManager.setAppRevision(d.data.revision ?? "N/A");
                } else {
                    nodeManager.setIsRoot(false);
                }
            }
        });

    nodeEnter.append('text')
        .attr('dy', '0.31em')
        .attr('y', d => d.children || d._children ? -25 : 25)
        .attr('text-anchor', 'middle')
        .text(d => {
            const fullText = d.data.name;
            return fullText.length > 10 ? fullText.slice(0, 10) + '...' : fullText; // Truncate text
        })
        .lower()
        .attr('font', 'sans-serif')
        .attr('fill', 'white')
        .attr('font-size', '13px')
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "#212f36")
        .attr("paint-order", "stroke");

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(transitionTime)
        .ease(d3.easeCubicInOut)
        .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeUpdate.select('circle.node')
        .attr('r', radius)
        .attr('fill', d => d._children ? '#ffffff' : '#179b7c');

    //When collapsed
    const nodeExit = node.exit().transition()
        .duration(transitionTime)
        .ease(d3.easeCubicInOut)
        .attr('transform', () => `translate(${source.x},${source.y})`)
        .remove();

    nodeExit.select('circle')
        .attr('r', 1e-6);

    nodeExit.select('text')
        .style('fill-opacity', 1e-6)
        .attr("stroke-opacity", 0);
};

const updateLinks = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    links: HierarchyNodeExtended[],
    source: HierarchyNodeExtended,
    transitionTime: number
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
        .attr('stroke-width', "1.5px")
        .attr("stroke-opacity", 0.4)
        .attr('fill', 'none');

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(transitionTime)
        .ease(d3.easeCubicInOut)
        .attrTween('d', function (d) {
            const source = d.parent ? d.parent : d;

            // Interpolate between the current path and the new path
            const interpolate = interpolatePath(this.getAttribute('d')!, linkGenerator({source, target: d}) as string);

            // Return a function that calculates the interpolated path for the given transition time
            return function (t) {
                return interpolate(t) || '';
            };
        });

    link.exit().transition()
        .duration(transitionTime)
        .ease(d3.easeCubicInOut)
        .attr('d', () => {
            const o = {x: source.x, y: source.y};
            return linkGenerator({
                source: o as unknown as d3.HierarchyPointNode<JSONData>,
                target: o as unknown as d3.HierarchyPointNode<JSONData>
            });
        })
        .remove();
};
