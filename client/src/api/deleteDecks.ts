import { API_URL } from './config';

export async function deleteDecks(id: string) {
  await fetch(`${API_URL}/decks/delete/${id}`, {
    method: 'DELETE',
  });
}
