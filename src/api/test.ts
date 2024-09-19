import { VercelRequest, VercelResponse } from "@vercel/node";
//@ts-expect-error request object not defined

export default function (req: VercelRequest, res: VercelResponse) {
  res.status(200).send("API is working!");
}
