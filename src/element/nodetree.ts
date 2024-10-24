// type NodeData = {
//   type: string;
//   name: string;
//   [key: string]: any; // Allow for additional properties
// };

// class FastTreeNode {
//   private static nodeMap = new Map<string, FastTreeNode>();

//   public readonly id: string;
//   public readonly data: NodeData;
//   public readonly path: string[];
//   public readonly children: FastTreeNode[];

//   constructor(data: NodeData) {
//     this.data = data;
//     this.id = FastTreeNode.generateHash();
//     this.path = [this.id];
//     this.children = [];

//     FastTreeNode.nodeMap.set(this.id, this);
//   }

//   public addChild(childData: NodeData): FastTreeNode {
//     const child = new FastTreeNode(childData);
//     child.path.push(...this.path);
//     this.children.push(child);
//     return child;
//   }

//   public findAncestor(
//     predicate: (data: NodeData) => boolean,
//   ): FastTreeNode | null {
//     for (let i = this.path.length - 1; i >= 0; i--) {
//       const ancestor = FastTreeNode.nodeMap.get(this.path[i]);
//       if (ancestor && predicate(ancestor.data)) {
//         return ancestor;
//       }
//     }
//     return null;
//   }

//   public static findNodeById(id: string): FastTreeNode | null {
//     return this.nodeMap.get(id) || null;
//   }

//   private static generateHash(): string {
//     return (
//       Math.random().toString(36).substring(2, 15) +
//       Math.random().toString(36).substring(2, 15)
//     );
//   }
// }
