import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { Request, Response } from 'express';
import generatePath from '../pathGenerator/pathGenerator.js';

interface toolName {
    name: string;
}

interface requestType {
    session: string;
    tools : toolName[];
}

async function createServer(req : Request & {body : requestType} , res : Response) {

    const path = generatePath();
    const mcpServer = new McpServer({
      name: "Marks_table_server_2",
      version: "1.0.0",
      capabilities:{
        resources:{},
        tools:{}
      }
    });
    let abc = ["mcpServer"];

    let sr = abc[0] as unknown as McpServer;
    sr.tool


}

export default createServer;