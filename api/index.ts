import { createServer } from "../server";

const serverPromise = createServer();

export default async function handler(req: any, res: any) {
    const server = await serverPromise;
    await server(req, res);
}
