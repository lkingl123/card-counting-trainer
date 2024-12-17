import React, { useState, useEffect } from 'react';

const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
const values = [
  '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace',
];

const Level1Trainer: React.FC = () => {
  const cards = suits.flatMap((suit) =>
    values.map((value) => `${value}_of_${suit}`)
  );

  const getCardValue = (card: string) => {
    if (['2', '3', '4', '5', '6'].some((v) => card.includes(v))) return +1;
    if (['10', 'jack', 'queen', 'king', 'ace'].some((v) => card.includes(v)))
      return -1;
    return 0; // Neutral cards: 7, 8, 9
  };

  const [deck, setDeck] = useState<string[]>([...cards]);
  const [usedCards, setUsedCards] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState<string>('');
  const [runningCount, setRunningCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    drawCard();
  }, []);

  const drawCard = () => {
    const availableCards = deck.filter((card) => !usedCards.includes(card));
    if (availableCards.length === 0) {
      setFeedback('No more cards left!');
      return;
    }

    const randomCard =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    setCurrentCard(randomCard);
    setUsedCards([...usedCards, randomCard]);
    setRunningCount(getCardValue(randomCard));
    setFeedback('');
  };

  const handleSelection = (selectedValue: number) => {
    const correct = selectedValue === runningCount;
    setFeedback(
      correct
        ? `✅ Correct! Running count: ${runningCount}`
        : `❌ Incorrect. Actual count: ${runningCount}`
    );
    setTimeout(() => drawCard(), 1000);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar - Deck Status */}
      <div className="w-1/6 p-2 overflow-y-auto border-r border-gray-300">
        <h2 className="text-sm font-bold mb-2 text-gray-700">Deck Status</h2>
        <div className="grid grid-cols-5 gap-1">
          {cards.map((card) => (
            <img
              key={card}
              src={`/cards/${card}.png`}
              alt={card}
              className={`w-8 h-auto border rounded ${
                usedCards.includes(card)
                  ? 'opacity-50 grayscale border-gray-300'
                  : 'border-gray-400 shadow-sm'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Level 1 - Card Counting Trainer
        </h1>

        {/* Centered Card */}
        <div className="flex items-center justify-center h-64 mb-6">
          {currentCard && (
            <img
              src={`/cards/${currentCard}.png`}
              alt="card"
              className="w-40 h-auto border-4 border-gray-400 rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Selection Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => handleSelection(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white w-16 h-16 rounded-full shadow flex items-center justify-center text-2xl"
          >
            -1
          </button>
          <button
            onClick={() => handleSelection(0)}
            className="bg-gray-500 hover:bg-gray-600 text-white w-16 h-16 rounded-full shadow flex items-center justify-center text-2xl"
          >
            0
          </button>
          <button
            onClick={() => handleSelection(1)}
            className="bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow flex items-center justify-center text-2xl"
          >
            +1
          </button>
        </div>

        {/* Feedback */}
        <p
          className={`mt-6 text-lg font-medium ${
            feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </p>
      </div>
    </div>
  );
};

export default Level1Trainer;
