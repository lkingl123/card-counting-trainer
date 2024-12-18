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

  const [usedCards, setUsedCards] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [runningCount, setRunningCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('Deck has been reset!');
  const [isCountVisible, setIsCountVisible] = useState<boolean>(false); // Toggle visibility of running count

  useEffect(() => {
    handleReset();
  }, []);

  const drawCard = () => {
    const availableCards = cards.filter((card) => !usedCards.includes(card));

    if (availableCards.length === 0) {
      setFeedback('No more cards left!');
      return;
    }

    const randomCard =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    setCurrentCard(randomCard);
    setUsedCards((prev) => [...prev, randomCard]);
    setRunningCount((prev) => prev + getCardValue(randomCard));
    setFeedback('');
  };

  const handleSelection = (selectedValue: number) => {
    if (!currentCard) return;

    const correct = selectedValue === getCardValue(currentCard);
    setFeedback(
      correct
        ? `✅ Correct!`
        : `❌ Incorrect.`
    );
    setTimeout(() => drawCard(), 1000);
  };

  const handleReset = () => {
    setUsedCards([]); // Clear all used cards
    setCurrentCard(null); // No card displayed initially
    setRunningCount(0);
    setFeedback('Deck has been reset!');
    setTimeout(() => drawCard(), 500); // Draw the first card again
  };

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
      {/* Sidebar - Deck Status */}
      <div className="w-full md:w-1/6 p-2 border-b md:border-b-0 md:border-r border-gray-300">
        <h2 className="text-sm font-bold mb-2 text-gray-700">Deck Status</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1 mb-4">
          {cards.map((card) => (
            <img
              key={card}
              src={`/cards/${card}.png`}
              alt={card}
              className={`w-10 h-auto rounded-lg ${
                usedCards.includes(card)
                  ? 'opacity-50 grayscale shadow-md'
                  : 'shadow-lg'
              }`}
            />
          ))}
        </div>
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md shadow-md"
        >
          Reset Deck
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
          Level 1 - Card Counting Trainer
        </h1>

        {/* Centered Card with Running Count */}
        <div className="flex items-center justify-center h-48 md:h-64 mb-6 relative">
          {currentCard && (
            <img
              src={`/cards/${currentCard}.png`}
              alt="card"
              className="w-28 md:w-40 h-auto rounded-lg shadow-2xl"
            />
          )}
          {/* Running Count Circle */}
          {isCountVisible && (
            <div className="ml-4 bg-blue-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-xl shadow-md">
              {runningCount}
            </div>
          )}
        </div>

        {/* Toggle Button for Running Count */}
        <button
          onClick={() => setIsCountVisible((prev) => !prev)}
          className="bg-gray-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-gray-700"
        >
          {isCountVisible ? 'Hide Count' : 'Show Count'}
        </button>

        {/* Selection Buttons */}
        <div className="flex space-x-4 mt-4 mb-4">
          <button
            onClick={() => handleSelection(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md flex items-center justify-center text-lg md:text-2xl"
          >
            -1
          </button>
          <button
            onClick={() => handleSelection(0)}
            className="bg-gray-500 hover:bg-gray-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md flex items-center justify-center text-lg md:text-2xl"
          >
            0
          </button>
          <button
            onClick={() => handleSelection(1)}
            className="bg-green-500 hover:bg-green-600 text-white w-12 h-12 md:w-16 md:h-16 rounded-full shadow-md flex items-center justify-center text-lg md:text-2xl"
          >
            +1
          </button>
        </div>

        {/* Feedback */}
        <p
          className={`mt-6 text-sm md:text-lg font-medium text-center ${
            feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {feedback}
        </p>
      </div>

      {/* Card Counting Guide */}
      <div className="w-full md:w-1/4 bg-gray-800 p-4 border-t md:border-t-0 md:border-l border-gray-300 text-white">
        <h2 className="text-lg font-bold mb-4">Card Counting Guide</h2>
        <div className="mb-4">
          <p className="font-semibold mb-2">High Cards (-1):</p>
          <div className="flex flex-wrap justify-center space-x-2">
            {['10_of_hearts', 'jack_of_clubs', 'queen_of_diamonds', 'king_of_spades', 'ace_of_hearts'].map((card) => (
              <img
                key={card}
                src={`/cards/${card}.png`}
                alt={card}
                className="w-10 h-auto rounded shadow-lg bg-white mb-2"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <p className="font-semibold mb-2">Low Cards (+1):</p>
          <div className="flex flex-wrap justify-center space-x-2">
            {['2_of_clubs', '3_of_hearts', '4_of_spades', '5_of_diamonds', '6_of_clubs'].map((card) => (
              <img
                key={card}
                src={`/cards/${card}.png`}
                alt={card}
                className="w-10 h-auto rounded shadow-lg bg-white mb-2"
              />
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold mb-2">Neutral Cards (0):</p>
          <div className="flex flex-wrap justify-center space-x-2">
            {['7_of_clubs', '8_of_diamonds', '9_of_hearts'].map((card) => (
              <img
                key={card}
                src={`/cards/${card}.png`}
                alt={card}
                className="w-10 h-auto rounded shadow-lg bg-white mb-2"
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs md:text-sm">
          Keep a running count as cards are dealt. High cards decrease the count,
          and low cards increase it. This simple counting system helps you track
          the advantage in the deck!
        </p>
      </div>
    </div>
  );
};

export default Level1Trainer;
