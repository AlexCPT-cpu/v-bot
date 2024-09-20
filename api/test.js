export default function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).send("API is working!");
    } catch (error) {
      console.log(error);
    }
  }
}
