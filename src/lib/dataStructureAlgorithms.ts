import { DS_Step } from '@/types';

export function generateLinkedListTraversalSteps(initialNodes: {id: string, value: number}[]): DS_Step[] {
    const steps: DS_Step[] = [];
    const nodes = initialNodes.map(n => ({...n, highlight: false, active: false}));

    steps.push({
        nodes: [...nodes],
        description: "Starting Linked List traversal from Head.",
        pointer: -1
    });

    for (let i = 0; i < nodes.length; i++) {
        // Highlight current node
        const currentNodes = nodes.map((n, idx) => ({
            ...n,
            active: idx === i,
            highlight: idx < i
        }));

        steps.push({
            nodes: currentNodes,
            description: `Visiting node with value ${nodes[i].value}. Moving 'next' pointer.`,
            pointer: i
        });
    }

    steps.push({
        nodes: nodes.map(n => ({...n, highlight: true, active: false})),
        description: "Reached end of the list (null).",
        pointer: nodes.length
    });

    return steps;
}

export function generateLinkedListSearchSteps(initialNodes: {id: string, value: number}[], targetValue: number): DS_Step[] {
    const steps: DS_Step[] = [];
    const nodes = initialNodes.map(n => ({...n, highlight: false, active: false}));

    steps.push({
        nodes: [...nodes],
        description: `Searching for value ${targetValue} in the list.`,
        pointer: -1
    });

    let found = false;
    for (let i = 0; i < nodes.length; i++) {
        const currentNodes = nodes.map((n, idx) => ({
            ...n,
            active: idx === i,
        }));

        if (nodes[i].value === targetValue) {
            steps.push({
                nodes: currentNodes.map((n, idx) => idx === i ? {...n, highlight: true} : n),
                description: `Value ${targetValue} found at index ${i}!`,
                pointer: i
            });
            found = true;
            break;
        }

        steps.push({
            nodes: currentNodes,
            description: `${nodes[i].value} != ${targetValue}. Moving to next node.`,
            pointer: i
        });
    }

    if (!found) {
        steps.push({
            nodes: [...nodes],
            description: `Value ${targetValue} not found in the list.`,
            pointer: nodes.length
        });
    }

    return steps;
}