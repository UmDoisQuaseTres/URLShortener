import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", (req: Request, res: Response) =>
  res.json({ message: "Hello world" })
);
router.post("/new", async (req: Request, res: Response) => {
  const url = req.body.url;
  const code = generateCode();
  res.send(`${process.env.DOMAIN}${code}`);
});

function generateCode() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export { router };
