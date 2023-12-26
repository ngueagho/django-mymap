function dijkstra(graph, startNode, endNode) {
    // Créer un dictionnaire pour stocker les distances initiales de chaque nœud (initialisée à l'infini)
    let distances = {};
    for (let node in graph) {
      distances[node] = Infinity;
    }
    distances[startNode] = 0;
  
    // Créer un dictionnaire pour stocker les nœuds précédents lors de la recherche du plus court chemin
    let previousNodes = {};
  
    // Créer un ensemble pour stocker les nœuds non visités
    let unvisitedNodes = new Set(Object.keys(graph));
  
    while (unvisitedNodes.size > 0) {
      // Trouver le nœud non visité avec la plus petite distance actuelle
      let currentNode = null;
      for (let node of unvisitedNodes) {
        if (currentNode === null || distances[node] < distances[currentNode]) {
          currentNode = node;
        }
      }
  
      // Si le nœud actuel est le nœud de fin, le plus court chemin a été trouvé
      if (currentNode === endNode) {
        break;
      }
  
      // Mettre à jour les distances des voisins du nœud actuel
      for (let neighbor in graph[currentNode]) {
        let distance = graph[currentNode][neighbor];
        let totalDistance = distances[currentNode] + distance;
        if (totalDistance < distances[neighbor]) {
          distances[neighbor] = totalDistance;
          previousNodes[neighbor] = currentNode;
        }
      }
  
      // Marquer le nœud actuel comme visité en le supprimant de l'ensemble des nœuds non visités
      unvisitedNodes.delete(currentNode);
    }
  
    // Reconstituer le plus court chemin à partir des nœuds précédents
    let shortestPath = [endNode];
    let currentNode = endNode;
    while (previousNodes[currentNode]) {
      currentNode = previousNodes[currentNode];
      shortestPath.unshift(currentNode);
    }
  
    return { path: shortestPath, distance: distances[endNode] };
  }

  const graph = {
        A: {B: 6, D: 5, C: 3},
        B: {A: 6, D: 2},
        C: {A: 3, D: 1, E: 11},
        D: {B: 2, A: 5, C: 1, E: 4},
        E: {C: 11, E: 4},
};
startNode = "A";
endNode = "E";
console.log(dijkstra(graph, startNode, endNode))



