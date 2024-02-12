// app.get('/dependency-graph', asyncHandler(async (req, res) => {
//     try {
//         // Read package.json file
//         const packageJsonPath = resolve(__dirname, 'path/to/package.json');
//         const packageJsonData = await fs.readFile(packageJsonPath, 'utf8');

//         // Parse package.json
//         const { dependencies, devDependencies } = JSON.parse(packageJsonData);

//         // Create a graph
//         const graph = createGraph();

//         // Add nodes (dependencies)
//         Object.keys(dependencies).forEach(dep => graph.setNode(dep));
//         Object.keys(devDependencies).forEach(dep => graph.setNode(dep));

//         // Add edges (dependency relationships)
//         Object.keys(dependencies).forEach(dep => {
//             const version = dependencies[dep];
//             graph.setEdge('project', dep, { label: `dependency (${version})` });
//         });
//         Object.keys(devDependencies).forEach(dep => {
//             const version = devDependencies[dep];
//             graph.setEdge('project', dep, { label: `devDependency (${version})` });
//         });

//         // Optionally, use a layout library like dagre for better visualization
//         if (layout) {
//             layout(graph);
//         }

//         // Build HTML structure for D3.js visualization
//         const svg = d3.select('body')
//             .append('svg')
//             .attr('width', 800)
//             .attr('height', 600);

//         // Create nodes and edges using D3.js
//         const nodes = svg.append('g')
//             .selectAll('circle')
//             .data(graph.nodes())
//             .enter()
//             .append('circle')
//             .attr('r', 10)
//             .attr('fill', 'lightblue');

//         const edges = svg.append('g')
//             .selectAll('line')
//             .data(graph.edges())
//             .enter()
//             .append('line')
//             .attr('stroke', 'black')
//             .attr('stroke-width', 2);

//         // Add labels to nodes and edges
//         nodes.append('text')
//             .attr('dx', 15)
//             .attr('dy', 5)
//             .text(d => d);

//         edges.append('text')
//             .attr('x', (d) => (graph.edge(d).v.x + graph.edge(d).w.x) / 2)
//             .attr('y', (d) => (graph.edge(d).v.y + graph.edge(d).w.y) / 2)
//             .attr('dy', 5)
//             .text(d => graph.edge(d).label);

//         // Send HTML response
//         res.send(svg.node().outerHTML);
//     } catch (error) {
//         console.error('Error fetching dependency graph:', error.message);
//         res.status(500).json({ success: false, error: 'Failed to fetch dependency graph' });
//     }
// }));