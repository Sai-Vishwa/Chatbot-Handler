import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import generatePath from '../pathGenerator/pathGenerator.js';
async function createServer(req, res) {
    const path = generatePath();
    const mcpServer = new McpServer({
        name: "Marks_table_server_2",
        version: "1.0.0",
        capabilities: {
            resources: {},
            tools: {}
        }
    });
    let abc = ["mcpServer"];
    let sr = abc[0];
    sr.tool;
}
export default createServer;
