import { VercelRequest, VercelResponse } from "@vercel/node";

//@ts-expect-error expect
export default function (req: VercelRequest, res: VercelResponse) {
  res.status(200).send("API is working!");
}
