import { lcm } from "../libs/lib";

export type Node = {
  nodeId: string,
  leftNodeId: string,
  rightNodeId: string,
}

const STARTING_NODE_ID = 'AAA';
const TARGET_NODE_ID = 'ZZZ';
const LEFT_DIR = 'L';
const RIGHT_DIR = 'R';

export type Network = Map<string, Node>;

export type DesertMap = {
  instructions: string,
  network: Network
}

export const parseInput = (input: string[]):  DesertMap => {
  const instructions = input[0];
  const network: Network = new Map<string, Node>();
  for (let i=2; i<input.length; i++) {
    const node: Node = parseLine(input[i]);
    network.set(node.nodeId, node);
  }
  return {instructions, network}
}

export const parseLine = (line:string): Node => {
  const [nodeId, connections] = line.split('=').map(e => e.trim());
  const [leftNodeId, rightNodeId] = connections.slice(1, -1).split(',').map(e=>e.trim())
  return {nodeId, leftNodeId, rightNodeId}
}

export const getNextNodeId = (network: Network, move: string, currentNodeId: string): string | undefined => {
  const node = network.get(currentNodeId);
  return move == LEFT_DIR ? node?.leftNodeId : node?.rightNodeId
}

export const answerPart1 = (input: string[]): number => {
  const map = parseInput(input);
  let currentNodeId = STARTING_NODE_ID;
  let steps = 0;
  while (currentNodeId !== TARGET_NODE_ID) {
    for (const move of map.instructions) {
      const nextNodeId = getNextNodeId(map.network, move, currentNodeId);
      if (nextNodeId) {
        steps++;
        currentNodeId = nextNodeId;
      } else {
        throw new Error("nextNodeId is empty/undefined");
      }
      if (currentNodeId === TARGET_NODE_ID) {
        break;
      }
    }
  }
  return steps;
}

const startingNodeforPart2 = (nodeId: string): boolean => nodeId.endsWith('A')
const endingNodeforPart2 = (nodeId: string): boolean => nodeId.endsWith('Z')
const startingNodeIdsForPart2 = (map: DesertMap): string[] => {
  let currentNodeIds: string[] = [];
  map.network.forEach(n => {
    if (startingNodeforPart2(n.nodeId)) {
      currentNodeIds.push(n.nodeId)
    }
  });
  return currentNodeIds;
}

const calcPathlengthsForPart2 = (map: DesertMap, startingNodeIds: string[]) => {
  const pathLengths = startingNodeIds.map(() => 0);
  for (const [index, nodeId] of startingNodeIds.entries()) {
    let currentNodeId = nodeId
    while (!endingNodeforPart2(currentNodeId)) {
      for (const move of map.instructions) {
        const nextNodeId = getNextNodeId(map.network, move, currentNodeId);
        if (nextNodeId) {
          pathLengths[index]++;
          currentNodeId = nextNodeId;
        } else {
          throw new Error("nextNodeId is empty/undefined");
        }
        if (endingNodeforPart2(currentNodeId)) {
          break;
        }
      }
    }
  }
  return pathLengths;
}

export const answerPart2 = (input: string[]): number => {
  const map = parseInput(input);
  const startingNodeIds: string[] = startingNodeIdsForPart2(map);
  const pathLengths = calcPathlengthsForPart2(map, startingNodeIds);
  return lcm(pathLengths);
}