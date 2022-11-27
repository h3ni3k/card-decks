import { API_URL } from './config';

export type TDeck = {
  _id: string;
  title: string;
};

export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks`);
  console.log(response);

  return response.json();
}
