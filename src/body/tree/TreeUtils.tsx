import * as d3 from 'd3';
import { HierarchyNodeExtended, JSONData } from './Types';

const transitionTime = 500;

export const updateTree = (
    g: d3.Selection<SVGGElement, unknown, null, undefined>,
    root: HierarchyNodeExtended,
    dimensions: { width: number; height: number },
    idMap: Map<HierarchyNodeExtended, number>
) => {
    const treeLayout = d3.tree<JSONData>().size([dimensions.width, dimensions.height]);

    root.x0 = dimensions.height / 2;
    root.y0 = 0;

    const click = (_event: MouseEvent, d: HierarchyNodeExtended) => {
        if (d.children) {
            d._children = d.children;
            d.children = undefined;
        } else {
            d.children = d._children;
            d._children = undefined;
        }
        update(d);
    };

    const update = (source: HierarchyNodeExtended) => {
        const treeData = treeLayout(root);
        const nodes = treeData.descendants() as HierarchyNodeExtended[];
        const links = treeData.descendants().slice(1) as HierarchyNodeExtended[];

        nodes.forEach(d => d.y = d.depth * 120);

        updateNodes(g, nodes, source, idMap, click);
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
    click: (event: MouseEvent, d: HierarchyNodeExtended) => void
) => {
    const node = g.selectAll<SVGGElement, HierarchyNodeExtended>('g.node')
        .data(nodes, (d: HierarchyNodeExtended) => idMap.get(d)!.toString());

    const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .on('click', (event, d) => click(event, d));

    nodeEnter.append('circle')
        .attr('class', 'node')
        .attr('r', 7)
        .attr('fill', d => d._children ? '#555' : '#999');

    nodeEnter.append('text')
        .attr('dy', '0.35em')
        .attr('y', d => d.children || d._children ? -20 : 20)
        .attr('text-anchor', 'middle')
        .text(d => d.data.name)
        .lower()
        .attr('stroke', 'black')
        .attr('stroke-width', 2)
        .attr('font-size', '1.1em');

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
        .duration(transitionTime)
        .attr('transform', d => `translate(${d.x},${d.y})`);

    nodeUpdate.select('circle.node')
        .attr('r', 7)
        .attr('fill', d => d._children ? '#67bf98' : '#999');

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
            const o = { x: source.x0, y: source.y0 };
            return linkGenerator({
                source: o as unknown as d3.HierarchyPointNode<JSONData>,
                target: o as unknown as d3.HierarchyPointNode<JSONData>
            });
        })
        .attr('stroke', 'white')
        .attr('stroke-width', 2)
        .attr("stroke-opacity", 0.6)
        .attr('fill', 'none');

    const linkUpdate = linkEnter.merge(link);

    linkUpdate.transition()
        .duration(transitionTime)
        .attr('d', d => {
            const source = d.parent ? d.parent : d;
            return linkGenerator({ source, target: d });
        });

    link.exit().transition()
        .duration(transitionTime)
        .attr('d', () => {
            const o = { x: source.x, y: source.y };
            return linkGenerator({
                source: o as unknown as d3.HierarchyPointNode<JSONData>,
                target: o as unknown as d3.HierarchyPointNode<JSONData>
            });
        })
        .remove();
};