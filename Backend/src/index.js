import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/jokes", (req, res) => {
  const jokes = [
    {
      id: 1,
      title: "Why did the scarecrow win an award?",
      content: "Because he was outstanding in his field!",
    },
    {
      id: 2,
      title: "What do you call fake spaghetti?",
      content: "An impasta!",
    },
    {
      id: 3,
      title: "Why don't skeletons fight each other?",
      content: "Because they don't have the guts!",
    },
    {
      id: 4,
      title: "Why couldn't the bicycle stand up by itself?",
      content: "Because it was two-tired!",
    },
    {
      id: 5,
      title: "What did one ocean say to the other ocean?",
      content: "Nothing, they just waved!",
    },
  ];
  res.json(jokes);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
