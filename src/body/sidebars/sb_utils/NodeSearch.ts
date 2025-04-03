import {Graph, Node} from "../../../file_handling/json_utils/JSONStructureInterfaces.tsx";

export const findPathToNode = (graph: Graph | null, targetNode: Node): string[] | null => {
    const visited = new Set();
    const path: string[] = [];

    // Start the search from the root node
    const rootNode = graph?.root;
    if (!rootNode) return null;

    path.push(rootNode.rootName);

    const dfs = (nodeId: string): boolean => {
        if (visited.has(nodeId)) return false;
        visited.add(nodeId);

        const currentNode = graph?.nodes.find((n) => n.nodeId === nodeId);
        if (currentNode) {
            path.push(currentNode.nodeName);
            if (currentNode.nodeId === targetNode.nodeId) return true;
        }

        // Find neighbors of the current node based on edges
        for (const edge of graph.edges) {
            let nextNodeId: string | null = null;

            if (edge.from === nodeId) {
                nextNodeId = edge.to;
            } else if (edge.to === nodeId) {
                nextNodeId = edge.from;
            }
            if (nextNodeId && dfs(nextNodeId)) return true;
        }

        if (currentNode) path.pop();
        return false;
    };

    return dfs(rootNode.rootId) ? path : null;
};

export const searchChartNodesByName = (graph: Graph | null, name: string | undefined): string | undefined => {
    if (!name) {
        return "Nodename not found!";
    }

    for (const node of graph?.nodes || []) {
        if (node.nodeName?.toLowerCase().includes(name.toLowerCase())) {
            const path = findPathToNode(graph, node);
            console.log(path);

            if (path && path.length > 0) {
                // Change the first element of the path to "..."
                path[0] = "..";
                const pathString = path.join(" / ");
                console.log(pathString);
                return pathString;
            }
        }
    }
    return "Node not found!";
};
