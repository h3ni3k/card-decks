import { useEffect, useState } from 'react';
import './App.css';
import reactLogo from './assets/react.svg';

type TDeck = {
  _id: string;
  title: string;
};

function App() {
  const [title, setTitle] = useState('');
  const [decks, setDecks] = useState<TDeck[]>([]);

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault();
    await fetch('http://localhost:5000/decks', {
      method: 'POST',
      body: JSON.stringify({ title }),
      headers: { 'Content-Type': 'application/json' },
    });
    setTitle('');
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch('http://localhost:5000/decks');
      const newDecks = await response.json();
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
            {deck.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
