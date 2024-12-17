import React, { useState, useEffect } from 'react';
import Card from './Card';

const Level2Trainer: React.FC = () => {
  const cards = ['2_of_clubs', '3_of_hearts', '4_of_spades', '5_of_diamonds'];
  const playerSpots = [1, 2, 3, 4, 5, 6];
  const [dealtCards, setDealtCards] = useState<{ spot: number; card: string }[]>([]);
  const [isDealing, setIsDealing] = useState<boolean>(false);

  const tableStyle: React.CSSProperties = {
    position: 'relative',
    height: '300px',
    backgroundColor: '#2C3E50',
    borderRadius: '10px',
  };

  const spotStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '10px',
    width: '80px',
    height: '120px',
  };

  const dealCards = () => {
    setIsDealing(true);
    const newDealtCards: { spot: number; card: string }[] = [];
    playerSpots.forEach((spot, index) => {
      setTimeout(() => {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        newDealtCards.push({ spot, card: randomCard });
        setDealtCards([...newDealtCards]);
        if (index === playerSpots.length - 1) setIsDealing(false);
      }, index * 500);
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h1>Level 2 - Blackjack Table</h1>
      <div style={tableStyle}>
        {playerSpots.map((spot) => (
          <div key={spot} style={{ ...spotStyle, left: `${spot * 14}%` }}>
            {dealtCards
              .filter((card) => card.spot === spot)
              .map((card, idx) => (
                <Card key={idx} card={card.card} style={{ top: `${idx * 20}px` }} />
              ))}
          </div>
        ))}
      </div>
      <button onClick={dealCards} disabled={isDealing} style={{ marginTop: '1rem', padding: '0.5rem 1rem' }}>
        Deal Cards
      </button>
    </div>
  );
};

export default Level2Trainer;
