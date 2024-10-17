import { Tool } from "@langchain/core/tools";

export class ExampleTool extends Tool {
  name = "example_tool";
  description = "An example tool for demonstration purposes";

  async _call(input: string): Promise<string> {
    return `Example tool called with input: ${input}`;
  }
}

export function createExampleTools(): Tool[] {
  return [new ExampleTool()];
}