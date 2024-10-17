import { Tool } from "@langchain/core/tools";

export class MathTool extends Tool {
  name = "math_tool";
  description = "Performs basic mathematical operations";

  async _call(input: string): Promise<string> {
    // This is a simple example. In a real scenario, you'd implement more complex logic.
    const [operation, ...numbers] = input.split(' ');
    const nums = numbers.map(Number);

    switch (operation) {
      case 'add':
        return String(nums.reduce((a, b) => a + b, 0));
      case 'multiply':
        return String(nums.reduce((a, b) => a * b, 1));
      default:
        return "Unknown operation";
    }
  }
}