import React, { useEffect, useState } from 'react';
import Card from './Card';

const cards = [
  '2_of_clubs', '3_of_hearts', '4_of_spades', '5_of_diamonds', '6_of_clubs',
  '7_of_hearts', '8_of_spades', '9_of_clubs', '10_of_diamonds', 'ace_of_hearts',
]; // Shortened deck for testing

const playerSpots = [1, 2, 3, 4, 5, 6];

const BlackjackTable: React.FC = () => {
  const [dealtCards, setDealtCards] = useState<{ spot: number; card: string }[]>(
    []
  );

  const [runningCount, setRunningCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');
  const [isDealing, setIsDealing] = useState<boolean>(false);

  const dealCards = () => {
    setDealtCards([]);
    setRunningCount(0);
    setIsDealing(true);

    let currentCount = 0;
    let newDealtCards: { spot: number; card: string }[] = [];

    playerSpots.forEach((spot, index) => {
      setTimeout(() => {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        newDealtCards.push({ spot, card: randomCard });
        currentCount += getCardValue(randomCard);

        setDealtCards([...newDealtCards]);
        setRunningCount(currentCount);

        if (index === playerSpots.length - 1) {
          setIsDealing(false);
        }
      }, index * 500); // Delay for card distribution
    });
  };

  const getCardValue = (card: string) => {
    if (['2', '3', '4', '5', '6'].some((v) => card.includes(v))) return +1;
    if (['10', 'jack', 'queen', 'king', 'ace'].some((v) => card.includes(v)))
      return -1;
    return 0;
  };

  const handleSubmit = () => {
    setFeedback(`Actual Count: ${runningCount}`);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Blackjack Table - Card Counting</h1>
      <div style={styles.table}>
        {playerSpots.map((spot) => (
          <div key={spot} style={{ ...styles.spot, left: `${spot * 15}%` }}>
            {dealtCards
              .filter((card) => card.spot === spot)
              .map((card, index) => (
                <Card
                  key={index}
                  card={card.card}
                  style={{ top: `${index * 20}px` }}
                />
              ))}
          </div>
        ))}
      </div>
      <button onClick={dealCards} disabled={isDealing} style={styles.button}>
        Deal Cards
      </button>
      <button onClick={handleSubmit} style={styles.button}>
        Submit Count
      </button>
      <p style={styles.feedback}>{feedback}</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center' as const,
    marginTop: '2rem',
    position: 'relative' as const,
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2C3E50',
  },
  table: {
    position: 'relative' as const,
    width: '100%',
    height: '300px',
    backgroundColor: '#2C3E50',
    borderRadius: '10px',
    margin: '0 auto',
  },
  spot: {
    position: 'absolute' as const,
    bottom: '10px',
    width: '80px',
    height: '120px',
  },
  button: {
    margin: '1rem',
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    backgroundColor: '#3498DB',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  feedback: {
    marginTop: '1rem',
    fontSize: '1.2rem',
    color: '#27AE60',
  },
};

export default BlackjackTable;
