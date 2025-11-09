import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { MongoClient, ObjectId } from "mongodb";

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/movies", async (req: Request, res: Response) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  try {
    await client.connect();
    const db = client.db("devweb");
    const movies = db.collection("movies");

    const docs = await movies.find().toArray();
    res.status(200).json(docs);
  } finally {
    await client.close();
  }
});

app.get("/movies/:id", async (req: Request, res: Response) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  try {
    await client.connect();
    const db = client.db("devweb");
    const movies = db.collection("movies");

    const id = new ObjectId(req.params.id);
    const movie = await movies.findOne({ _id: id });

    if (!movie) {
      res.status(404).json({ message: "Filme não foi encontrado!" });
      return;
    }

    res.status(200).json(movie);
  } finally {
    await client.close();
  }
});

app.post("/movies", async (req: Request, res: Response) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  try {
    await client.connect();
    const db = client.db("devweb");
    const movies = db.collection("movies");

    const movie = req.body;
    await movies.insertOne(movie);
    res.status(201).json(movie);
  } finally {
    await client.close();
  }
});

app.put("/movies/:id", async (req: Request, res: Response) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  try {
    await client.connect();
    const db = client.db("devweb");
    const movies = db.collection("movies");

    const id = new ObjectId(req.params.id);
    const movie = req.body;
    const result = await movies.updateOne({ _id: id }, { $set: movie });

    if (result.modifiedCount === 0) {
      res.status(404).json({ message: "Filme não foi encontrado!" });
      return;
    }

    const updatedMovie = await movies.findOne({ _id: id });
    res.status(200).json(updatedMovie);
  } finally {
    await client.close();
  }
});

app.delete("/movies/:id", async (req: Request, res: Response) => {
  const client = new MongoClient("mongodb://127.0.0.1:27017/");
  try {
    await client.connect();
    const db = client.db("devweb");
    const movies = db.collection("movies");

    const id = new ObjectId(req.params.id);
    const result = await movies.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Filme não foi encontrado!" });
      return;
    }

    res.status(204).send();
  } finally {
    await client.close();
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({
    message,
  });
});

app.listen(port, () => {
  console.log(`Servidor sendo executado na porta ${port}.`);
});

