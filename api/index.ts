import { createServer } from "../server";

export default async function handler(req: any, res: any) {
    try {
        const server = await createServer();

        // Handle the request
        server(req, res);
    } catch (error) {
        console.error("API Handler Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
