import express from "express";
import fs from "fs/promises";
import path from "path";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
app.use(cors());
app.use(express.json()); // Parse JSON requests

const publicDir = path.resolve("./public");
fs.mkdir(publicDir, { recursive: true }).catch((err) => {
  console.error("Error creating public directory:", err);
});

app.post("/generate-speech", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res
      .status(400)
      .json({ error: "Text is required for speech synthesis." });
  }

  let filePath;

  try {
    // Generate speech with OpenAI
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: "ash",
      input: text
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());
    const fileName = `speech-${Date.now()}.mp3`;
    filePath = path.resolve(`./public/${fileName}`);

    // Save MP3 file
    await fs.writeFile(filePath, buffer);

    // Return the file URL
    res.json({ audioUrl: `/public/${fileName}` });
  } catch (error) {
    console.error("Error generating speech:", error);
    res.status(500).json({ error: "Failed to generate speech." });
  } finally {
    if (filePath) {
      setTimeout(() => {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
          } else {
            console.log("File deleted successfully");
          }
        });
      }, 5000);
    }
  }
});

app.use("/public", express.static(path.resolve("./public"))); // Serve MP3 files

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
