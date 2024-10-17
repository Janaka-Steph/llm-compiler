import { Task } from './types';

export class DAGNode {
  id: string;
  task: Task;
  dependencies: Set<string>;
  children: Set<string>;

  constructor(id: string, task: Task) {
    this.id = id;
    this.task = task;
    this.dependencies = new Set();
    this.children = new Set();
  }
}

export class DAG {
  nodes: Map<string, DAGNode>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(id: string, task: Task): void {
    if (!this.nodes.has(id)) {
      this.nodes.set(id, new DAGNode(id, task));
    }
  }

  addEdge(fromId: string, toId: string): void {
    const fromNode = this.nodes.get(fromId);
    const toNode = this.nodes.get(toId);

    if (fromNode && toNode) {
      fromNode.children.add(toId);
      toNode.dependencies.add(fromId);
    }
  }

  topologicalSort(): string[] {
    const visited = new Set<string>();
    const result: string[] = [];

    const visit = (nodeId: string) => {
      if (visited.has(nodeId)) return;
      visited.add(nodeId);

      const node = this.nodes.get(nodeId);
      if (node) {
        for (const childId of node.children) {
          visit(childId);
        }
        result.unshift(nodeId);
      }
    };

    for (const nodeId of this.nodes.keys()) {
      visit(nodeId);
    }

    return result;
  }
}