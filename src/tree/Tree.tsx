import d3, {hierarchy, json, tree} from "d3";


interface ChartData {
    name: string;
    children?: ChartData[];
}

/*function createTree() {
    const svg = d3.create("svg");

    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const dependencyTree = tree().size([height, width]); //could use cluster instead of tree

//d3.stratify only use when data is in tabular form and not already in hierarchical form!

    svg
        .attr("width", width)
        .attr("height", height)


    json("/src/assets/1715692927515-dependencies-stats.json")
        .then(data => {
            const root = hierarchy(data);
            const links = dependencyTree(root).links(); //Returns an array for the linkages between the nodes
            const linkPathGenerator = d3.linkHorizontal() //could be vertical
                .x(d => d.y) //vertical would be d.x for x
                .y(d => d.x); //vertical would be d.y for y


            svg.selectAll("path").data(links)
                .enter().append("path")
                .attr("d", linkPathGenerator)
                .attr("style", "fill: none; stroke: #57bdc3");

            svg.selectAll("text").data(root.descendants())
                .enter().append("text")
                .attr("x", d => d.y)
                .attr("y", d => d.x)
                .attr("dy", "0.32em")
                .attr("style", "text-shadow: -1px -1px 3px white, -1px 1px 3px white, 1px -1px 3px white, 1px 1px 3px white;")
                .text(d => d.data.versionNumber); //TODO
        });
    return svg.node();
}*/
const TREE_WIDTH = document.body.clientWidth;
const NODE_SIZE = 10;
const TREE_NODE_SPACING = 10;

function computeTreeHeight(data: ChartData[]): number {
    const root = d3.hierarchy(data);
    return root.height + 1;
}

function createTreeLayout(width: number, height: number): d3.TreeLayout {
    return d3.tree().nodeSize([NODE_SIZE, width / (height + 1)]);
}

function sortTree(root: d3.HierarchyNode<ChartData[]>) {
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
}

function computeTreeExtent(root: d3.HierarchyNode<ChartData>): [number, number] {
    let x0 = Infinity;
    let x1 = -x0;
    root.each((d) => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });
    return [x0, x1];
}

function createSvg(width: number, height: number): SVGSVGElement {
    return d3.create("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-NODE_SIZE / 3, x0 - NODE_SIZE, width, height])
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");
}

function chart(jsonData: never): SVGSVGElement {
    const data: ChartData[] = jsonData; // assume jsonData is an array of ChartData objects
    const height = computeTreeHeight(data);
    const treeLayout = createTreeLayout(TREE_WIDTH, height);
    const root = d3.hierarchy(data);
    sortTree(root);
    treeLayout(root);
    const [x0, x1] = computeTreeExtent(root);
    const svg = createSvg(TREE_WIDTH, x1 - x0 + NODE_SIZE * 2);

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll()
        .data(root.links())
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x((d) => d.y)
            .y((d) => d.x));

    const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll()
        .data(root.descendants())
        .join("g")
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("fill", (d) => d.children? "#555" : "#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", (d) => d.children? -6 : 6)
        .attr("text-anchor", (d) => d.children? "end" : "start")
        .text((d) => d.data.name)
        .attr("stroke", "white")
        .attr("paint-order", "stroke");

    return svg.node();
}


export default createTree;