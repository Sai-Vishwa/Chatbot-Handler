interface toolsFormat {
  name: string;
  description: string;
  paramsSchemaOrAnnotations: Object;
  handler: (params: any) => Promise<any>;
}

export { toolsFormat };