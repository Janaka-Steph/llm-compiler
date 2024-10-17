import { ChatRequest } from './request';
import { Tool } from "@langchain/core/tools";
import { BaseLanguageModel } from "@langchain/core/language_models/base";
import { LLMCompiler } from '../llm-compiler';
import { CompilerState } from '../types';

export class RunLLMCompiler {
  private chat: ChatRequest;
  private tools: Tool[];
  private llm: BaseLanguageModel;
  private compiler: LLMCompiler;

  constructor(chat: ChatRequest, tools: Tool[], llm: BaseLanguageModel) {
    this.chat = chat;
    this.tools = tools;
    this.llm = llm;
    this.compiler = new LLMCompiler(llm, tools);
  }

  async run(): Promise<CompilerState> {
    return await this.compiler.compile(this.chat.message);
  }

  async runWithoutJoiner(): Promise<{ task: string; result: string }> {
    const result = await this.run();
    return {
      task: result.task,
      result: result.execution_output
    };
  }
}