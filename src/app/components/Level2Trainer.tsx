import React, { useState } from "react";
import Card from "./Card";

const suits = ["clubs", "diamonds", "hearts", "spades"];
const values = [
  "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king", "ace",
];
const cards = suits.flatMap((suit) => values.map((value) => `${value}_of_${suit}`));

const playerSpots = [1, 2, 3, 4, 5, 6];

const Level2Trainer: React.FC = () => {
  const [dealtCards, setDealtCards] = useState<{ spot: number; card: string }[]>(
    []
  );
  const [dealerCards, setDealerCards] = useState<string[]>([]);
  const [runningCount, setRunningCount] = useState<number>(0);
  const [guessedCount, setGuessedCount] = useState<string>("");
  const [isDealing, setIsDealing] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>("");
  const [explanation, setExplanation] = useState<string>("");

  const getCardValue = (card: string) => {
    if (["2", "3", "4", "5", "6"].some((v) => card.includes(v))) return +1;
    if (["10", "jack", "queen", "king", "ace"].some((v) => card.includes(v)))
      return -1;
    return 0; // Neutral cards
  };

  const dealCards = () => {
    setDealtCards([]);
    setDealerCards([]);
    setRunningCount(0);
    setFeedback("");
    setExplanation("");
    setIsDealing(true);

    let currentCount = 0;
    let newDealtCards: { spot: number; card: string }[] = [];
    let newDealerCards: string[] = [];

    // Deal dealer cards
    for (let i = 0; i < 2; i++) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      newDealerCards.push(randomCard);
      currentCount += getCardValue(randomCard);
    }
    setDealerCards(newDealerCards);

    // Deal cards to player spots
    playerSpots.forEach((spot, index) => {
      setTimeout(() => {
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        newDealtCards.push({ spot, card: randomCard });
        currentCount += getCardValue(randomCard);

        setDealtCards([...newDealtCards]);
        setRunningCount(currentCount);

        if (index === playerSpots.length - 1) setIsDealing(false);
      }, index * 500);
    });
  };

  const validateGuess = () => {
    if (parseInt(guessedCount) === runningCount) {
      setFeedback("🎉 Correct! Well done!");
    } else {
      setFeedback(`❌ Incorrect. Actual count: ${runningCount}`);
    }

    // Build explanation breakdown
    let explanationText = "Explanation:\n";
    dealerCards.forEach((card) => {
      explanationText += `Dealer Card: ${card} → ${getCardValue(card)}\n`;
    });
    dealtCards.forEach(({ card, spot }) => {
      explanationText += `Player Spot ${spot}: ${card} → ${getCardValue(card)}\n`;
    });
    explanationText += `Total Running Count: ${runningCount}`;
    setExplanation(explanationText);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-800 text-white">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-4">
        <h1 className="text-xl md:text-3xl font-bold my-4 text-center">Level 2 - Blackjack Trainer</h1>

        {/* Dealer Cards */}
        <div className="flex items-center justify-center mb-4">
          <h2 className="text-lg md:text-xl mr-4">Dealer's Cards:</h2>
          {dealerCards.map((card, index) => (
            <Card
              key={index}
              card={card}
              style={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                margin: "0 8px",
              }}
            />
          ))}
        </div>

        {/* Blackjack Table */}
        <div className="relative w-full max-w-4xl bg-green-700 h-64 md:h-72 rounded-lg p-4">
          {/* Deck */}
          <div className="absolute left-4 bottom-1/2 transform translate-y-1/2">
            <Card card="back" style={{ width: "60px", height: "90px" }} />
          </div>

          {/* Player Spots */}
          {playerSpots.map((spot) => (
            <div
              key={spot}
              className="absolute"
              style={{
                left: `${10 + spot * 12}%`,
                bottom: "10%",
                width: "60px",
                height: "90px",
              }}
            >
              {dealtCards
                .filter((card) => card.spot === spot)
                .map((card, index) => (
                  <Card
                    key={index}
                    card={card.card}
                    style={{
                      position: "absolute",
                      top: `${index * 20}px`,
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                  />
                ))}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <button
            onClick={dealCards}
            disabled={isDealing}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm md:text-base"
          >
            Deal Cards
          </button>
          <input
            type="number"
            value={guessedCount}
            onChange={(e) => setGuessedCount(e.target.value)}
            placeholder="Your count guess"
            className="text-black px-2 py-1 rounded text-sm md:text-base"
          />
          <button
            onClick={validateGuess}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm md:text-base"
          >
            Submit Guess
          </button>
        </div>

        {/* Feedback */}
        {feedback && <p className="mt-4 text-sm md:text-lg font-bold text-center">{feedback}</p>}
      </div>

      {/* Explanation to the side */}
      <pre className="w-full md:w-1/4 bg-gray-700 text-white p-4 overflow-auto whitespace-pre-line">
        {explanation}
      </pre>
    </div>
  );
};

export default Level2Trainer;
