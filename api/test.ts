import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    try {
      res.status(200).send("API is working!");
    } catch (error) {
      console.log(error);
    }
  }
}
