import { DAG } from './dag';

export interface Task {
  id: string;
  description: string;
}

export interface CodeBlock {
  taskId: string;
  code: string;
}

export interface CompilerState {
  task: string;
  subtasks: Task[];
  dag: DAG;
  code_blocks: CodeBlock[];
  analysis: string;
  plan: string;
  integrated_code: string;
  execution_output: string;
}