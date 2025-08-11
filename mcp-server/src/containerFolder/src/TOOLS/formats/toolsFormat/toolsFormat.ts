import { ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";

export type toolsFormat = {
  name: string;
  description: string;
  paramsSchemaOrAnnotations: any;
  handler: (params: any) => Promise<any>;
}
