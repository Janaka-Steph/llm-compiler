import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LLMCompiler } from '../src/llm-compiler';
import { Tool } from "@langchain/core/tools";
import { BaseLanguageModel } from "@langchain/core/language_models/base";

class MockTool extends Tool {
  name = "mock_tool";
  description = "A mock tool for testing";
  async _call(input: string): Promise<string> {
    return `Mock result for ${input}`;
  }
}

class MockChatOpenAI extends BaseLanguageModel {
  predict: (input: string) => Promise<string>;

  constructor() {
    super({});
    this.predict = vi.fn();
  }

  async invoke(input: string): Promise<string> {
    return this.predict(input);
  }

  // Add any other necessary methods here
}

describe('LLMCompiler', () => {
  let compiler: LLMCompiler;
  let mockLLM: MockChatOpenAI;
  let mockTools: Tool[];

  beforeEach(() => {
    mockLLM = new MockChatOpenAI();
    mockTools = [new MockTool()];
    compiler = new LLMCompiler(mockLLM, mockTools);
  });

  it('should generate subtasks correctly', async () => {
    mockLLM.predict.mockResolvedValueOnce(`
1. Get wallet history
2. Calculate total balance
3. Summarize transactions
    `);

    const result = await compiler.compile('Get wallet summary for address 0x123');
    console.log('Subtasks:', JSON.stringify(result.subtasks, null, 2));
    expect(result.subtasks).toHaveLength(3);
    expect(result.subtasks[0]).toHaveProperty('id', 'task_1');
    expect(result.subtasks[0]).toHaveProperty('description', '1. Get wallet history');
    expect(result.subtasks[1]).toHaveProperty('description', '2. Calculate total balance');
    expect(result.subtasks[2]).toHaveProperty('description', '3. Summarize transactions');
  });

  // Add more tests here...
});