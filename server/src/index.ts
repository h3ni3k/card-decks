import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
config();

import Deck from './models/Deck';

const PORT = 5000;
const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the base route');
});

app.get('/decks', (req: Request, res: Response) => {
  res.send('Decks');
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({ title: req.body.title });

  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose.connect(process.env.MONGO_URL ?? '').then(() => {
  console.log(`App listening on port ${PORT}`);
  app.listen(PORT);
});
