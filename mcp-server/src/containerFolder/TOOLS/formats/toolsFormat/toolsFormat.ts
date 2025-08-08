import { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

interface toolsFormat {
  name: string;
  description: string;
  paramsSchemaOrAnnotations: ToolAnnotations;
  handler: (params: any) => Promise<any>;
}

export { toolsFormat };