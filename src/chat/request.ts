export interface ChatRequestOptions {
  message: string;
}

export class ChatRequest {
  message: string;

  constructor(options: ChatRequestOptions) {
    this.message = options.message;
  }
}