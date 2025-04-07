const express = require("express");
const WebTorrent = require("webtorrent");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
const client = new WebTorrent();

let activeTorrent = null;

app.post("/api/stream", (req, res) => {
  const { magnet } = req.body;
  if (activeTorrent) activeTorrent.destroy();

  client.add(magnet, (torrent) => {
    activeTorrent = torrent;
    const file = torrent.files.find((f) => f.name.match(/\.(mp4|mkv|webm|mov)$/i));
    if (!file) return res.status(404).json({ error: "No video file found" });
    res.json({ videoUrl: `/stream/${file.path}` });
  });
});

app.get("/stream/:filename", (req, res) => {
  if (!activeTorrent) return res.status(404).send("No active torrent");
  const file = activeTorrent.files.find((f) => f.path === req.params.filename);
  if (!file) return res.status(404).send("File not found");

  req.pipe = req.pipe || function (dest) {
    this.on("data", (chunk) => dest.write(chunk));
    this.on("end", () => dest.end());
  };

  res.setHeader("Content-Type", "video/mp4");
  file.createReadStream().pipe(res);
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
