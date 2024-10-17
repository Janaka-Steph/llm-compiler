import { Tool } from "@langchain/core/tools";
import fs from 'fs';
import path from 'path';

export class Tools {
  static loadTools(directory: string): Tool[] {
    const tools: Tool[] = [];
    const files = fs.readdirSync(directory);
    
    for (const file of files) {
      if (file.endsWith('.ts') || file.endsWith('.js')) {
        const fullPath = path.join(directory, file);
        const module = require(fullPath);
        
        for (const exportedItem of Object.values(module)) {
          if (typeof exportedItem === 'function' && exportedItem.prototype instanceof Tool) {
            tools.push(new (exportedItem as new () => Tool)());
          }
        }
      }
    }
    
    return tools;
  }
}