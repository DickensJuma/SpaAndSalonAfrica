import { BusinessClubController } from "../../server/controllers/business-club.controller";

export default async function handler(req: any, res: any) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST');
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed'
        });
    }

    try {
        // Mock Express req/res for the controller
        const mockReq = {
            body: req.body,
            method: req.method,
            headers: req.headers
        };

        const mockRes = {
            status: (code: number) => {
                res.status(code);
                return mockRes;
            },
            json: (data: any) => {
                res.json(data);
            }
        };

        await BusinessClubController.register(mockReq as any, mockRes as any, () => { });
    } catch (error) {
        console.error("Business Club Registration Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}
