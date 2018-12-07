function toposort(nodes, edges) {
    let cursor = nodes.length
    let sorted = new Array(cursor)
    let visited = {}
    let i = cursor
    let outgoingEdges = makeOutgoingEdges(edges)
    let nodesHash = makeNodesHash(nodes)

    while (i--) {
        if (!visited[i]) visit(nodes[i], i, new Set())
    }

    return sorted

    function visit(node, i, predecessors) {
        if (visited[i]) return;
        visited[i] = true

        let outgoing = outgoingEdges.get(node) || new Set()
        outgoing = Array.from(outgoing).sort().reverse()
        console.log(outgoing)

        if (i = outgoing.length) {
            predecessors.add(node)
            do {
                let child = outgoing[--i]
                visit(child, nodesHash.get(child), predecessors)
            } while (i)
            predecessors.delete(node)
        }
        sorted[--cursor] = node
    }   
}

function uniqueNodes(arr){
    let res = new Set()
    for (let i = 0, len = arr.length; i < len; i++) {
        let edge = arr[i]
        res.add(edge[0])
        res.add(edge[1])
    }
    return Array.from(res)
}

function makeOutgoingEdges(arr){
    let edges = new Map()
    for (let i = 0, len = arr.length; i < len; i++) {
        let edge = arr[i]
        if (!edges.has(edge[0])) edges.set(edge[0], new Set())
        if (!edges.has(edge[1])) edges.set(edge[1], new Set())
        edges.get(edge[0]).add(edge[1])
    }
    return edges
}

function makeNodesHash(arr){
    let res = new Map()
    for (let i = 0, len = arr.length; i < len; i++) {
        res.set(arr[i], i)
    }
    return res
}

module.exports = function(edges) {
    return toposort(uniqueNodes(edges), edges)
}
module.exports.array = toposort