export class LLMCompilerError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LLMCompilerError';
  }
}

export class SubtaskGenerationError extends LLMCompilerError {
  constructor(message: string) {
    super(`Error generating subtasks: ${message}`);
    this.name = 'SubtaskGenerationError';
  }
}

export class CodeGenerationError extends LLMCompilerError {
  constructor(message: string) {
    super(`Error generating code: ${message}`);
    this.name = 'CodeGenerationError';
  }
}

export class CodeAnalysisError extends LLMCompilerError {
  constructor(message: string) {
    super(`Error analyzing code: ${message}`);
    this.name = 'CodeAnalysisError';
  }
}

export class ExecutionPlanError extends LLMCompilerError {
  constructor(message: string) {
    super(`Error generating execution plan: ${message}`);
    this.name = 'ExecutionPlanError';
  }
}