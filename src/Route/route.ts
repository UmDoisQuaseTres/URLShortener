import { Router, Request, Response } from "express";
import Link from "../Models/Link";

const router: Router = Router();

router.get("/", (req: Request, res: Response) =>
  res.status(200).json({ message: "Hello world" })
);

router.post("/new", async (req: Request, res: Response) => {
  const url = req.body.url;
  const urlChecked = isUrlValid(url);
  if (urlChecked) {
    const code = generateCode();
    const result = await Link.create({ url, code });
    res.status(201).json(result.dataValues);
  } else {
    res.status(400).json({ message: "Invalid URL, ensure HTTP or HTTPS" });
  }
});

router.get("/:code", async (req: Request, res: Response) => {
  const code = req.params.code;
  const result = await Link.findOne({ where: { code } });
  if (!result) return res.sendStatus(404);
  result.hits++;
  await result.save();
  res.status(301).redirect(result.url);
});

function isUrlValid(url: string) {
  try {
    const newUrl = new URL(url);
    return newUrl.protocol === "http:" || newUrl.protocol === "https:";
  } catch (err) {
    return false;
  }
}

function generateCode() {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
}

export { router };
