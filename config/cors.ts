import type { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

export const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
});

export function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function = cors,
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
