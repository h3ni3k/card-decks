import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addDecks } from './api/addDecks';
import { deleteDecks } from './api/deleteDecks';
import { getDecks, TDeck } from './api/getDecks';
import './App.css';

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    const deck = await addDecks(title);
    setDecks([...decks, deck]);
    setTitle('');
  }
  async function handleDeckDelete(deckId: string) {
    await deleteDecks(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <div className="App">
      <form onSubmit={handleCreateDeck}>
        <label htmlFor="deck-title">Deck Title</label>
        <input
          type="text"
          name="title"
          id="deck-title"
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value);
          }}
        />
        <button>Create deck</button>
      </form>
      <div className="decks">
        {decks.map((deck) => (
          <div key={deck._id} className="deck">
            <button onClick={() => handleDeckDelete(deck._id)}>X</button>
            <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
