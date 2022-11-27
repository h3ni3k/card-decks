import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
config();

import Deck from './models/Deck';

const PORT = 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from the base route');
});

app.get('/decks', async (req: Request, res: Response) => {
  // TODO - fetch all decks
  const decks = await Deck.find();
  // TODO - Send all decks to UI
  res.json(decks);
});

app.post('/decks', async (req: Request, res: Response) => {
  const newDeck = new Deck({ title: req.body.title });

  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete('/decks/delete/:deckId', async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  await Deck.findByIdAndDelete(deckId);
  res.json({ message: `Successfully deleted entry with id: ${deckId}` });
});

mongoose.connect(process.env.MONGO_URL ?? '').then(() => {
  console.log(`App listening on port ${PORT}`);
  app.listen(PORT);
});
