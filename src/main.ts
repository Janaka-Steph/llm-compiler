import { ChatRequest } from './chat/request';
import { Tools } from './tools/Tools';
import { ChatOpenAI } from "@langchain/openai";
import { RunLLMCompiler } from './chat/run';
import path from 'path';

async function main() {
  const chat = new ChatRequest({ message: "Calculate the sum of 5 and 3, then multiply the result by 2" });

  // Load tools from the math directory
  const tools = Tools.loadTools(path.join(__dirname, 'tools', 'math'));

  const llm = new ChatOpenAI({ temperature: 0, maxRetries: 3 });

  const llmCompiler = new RunLLMCompiler(chat, tools, llm);

  console.log("Running full LLMCompiler process:");
  const fullResult = await llmCompiler.run();
  console.log(fullResult);

  console.log("\nRunning without joiner:");
  const withoutJoinerResult = await llmCompiler.runWithoutJoiner();
  console.log(withoutJoinerResult);
}

main().catch(console.error);