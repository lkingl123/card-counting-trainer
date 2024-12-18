import React, { useState, useEffect } from "react";

const suits = ["clubs", "diamonds", "hearts", "spades"];
const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "jack",
  "queen",
  "king",
  "ace",
];

const Level1Trainer: React.FC = () => {
  const cards = suits.flatMap((suit) =>
    values.map((value) => `${value}_of_${suit}`)
  );

  const getCardValue = (card: string) => {
    if (["2", "3", "4", "5", "6"].some((v) => card.includes(v))) return +1;
    if (["10", "jack", "queen", "king", "ace"].some((v) => card.includes(v)))
      return -1;
    return 0; // Neutral cards: 7, 8, 9
  };

  const [usedCards, setUsedCards] = useState<string[]>([]);
  const [currentCard, setCurrentCard] = useState<string | null>(null);
  const [runningCount, setRunningCount] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("Deck has been reset!");
  const [isCountVisible, setIsCountVisible] = useState<boolean>(false); // Toggle visibility of running count

  useEffect(() => {
    handleReset();
  }, []);

  const drawCard = () => {
    const availableCards = cards.filter((card) => !usedCards.includes(card));

    if (availableCards.length === 0) {
      setFeedback("No more cards left!");
      return;
    }

    const randomCard =
      availableCards[Math.floor(Math.random() * availableCards.length)];
    setCurrentCard(randomCard);
    setUsedCards((prev) => [...prev, randomCard]);
    setRunningCount((prev) => prev + getCardValue(randomCard));
    setFeedback("");
  };

  const handleSelection = (selectedValue: number) => {
    if (!currentCard) return;

    const correct = selectedValue === getCardValue(currentCard);
    setFeedback(correct ? `✅ Correct!` : `❌ Incorrect.`);
    setTimeout(() => drawCard(), 1000);
  };

  const handleReset = () => {
    setUsedCards([]); // Clear all used cards
    setCurrentCard(null); // No card displayed initially
    setRunningCount(0);
    setFeedback("Deck has been reset!");
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
                  ? "opacity-50 grayscale shadow-md"
                  : "shadow-lg"
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
          {isCountVisible ? "Hide Count" : "Show Count"}
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
            feedback.includes("Correct") ? "text-green-600" : "text-red-600"
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
          <p className="text-sm text-gray-200 mb-2">
            High cards (10, Jack, Queen, King, Ace) are advantageous for the
            player because they increase the chance of getting a blackjack or
            higher-value hands. When high cards are dealt, the count decreases
            (-1), making the deck less favorable for the player.
          </p>
          <div className="flex flex-wrap justify-center space-x-2">
            {[
              "10_of_hearts",
              "jack_of_clubs",
              "queen_of_diamonds",
              "king_of_spades",
              "ace_of_hearts",
            ].map((card) => (
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
          <p className="text-sm text-gray-200 mb-2">
            Low cards (2, 3, 4, 5, 6) are disadvantageous for the player because
            they favor the dealer by reducing the chance of a bust and creating
            low-value hands. When low cards are dealt, the count increases (+1),
            making the deck more favorable for the player.
          </p>
          <div className="flex flex-wrap justify-center space-x-2">
            {[
              "2_of_clubs",
              "3_of_hearts",
              "4_of_spades",
              "5_of_diamonds",
              "6_of_clubs",
            ].map((card) => (
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
          <p className="text-sm text-gray-200 mb-2">
            Neutral cards (7, 8, 9) have no effect on the count because they do
            not significantly impact the probability of favorable or unfavorable
            outcomes.
          </p>
          <div className="flex flex-wrap justify-center space-x-2">
            {["7_of_clubs", "8_of_diamonds", "9_of_hearts"].map((card) => (
              <img
                key={card}
                src={`/cards/${card}.png`}
                alt={card}
                className="w-10 h-auto rounded shadow-lg bg-white mb-2"
              />
            ))}
          </div>
        </div>

        {/* Favorability Guide */}
        <div className="mt-4">
          <h3 className="text-md font-bold text-yellow-400">
            True Count Favorability and Betting:
          </h3>
          <ul className="text-sm text-gray-300 list-disc list-inside mt-2">
            <li>
              <span className="font-bold text-green-400">+1 to +2:</span> Mildly
              Favorable. Slight edge to the player.
              <span className="font-bold text-gray-200">
                {" "}
                Bet the minimum or keep your bets small.
              </span>
            </li>
            <li>
              <span className="font-bold text-green-500">+3 to +5:</span>{" "}
              Favorable. The player has a strong advantage.
              <span className="font-bold text-gray-200">
                {" "}
                Consider increasing your bets moderately.
              </span>
            </li>
            <li>
              <span className="font-bold text-green-600">+6 or higher:</span>{" "}
              Very Favorable! The player has a significant edge.
              <span className="font-bold text-gray-200">
                {" "}
                Bet bigger to maximize your advantage.
              </span>
            </li>
            <li>
              <span className="font-bold text-red-400">
                0 or Negative Count:
              </span>{" "}
              Deck favors the dealer.
              <span className="font-bold text-gray-200">
                {" "}
                Keep your bets minimal or consider sitting out until the count
                improves.
              </span>
            </li>
          </ul>
        </div>

        <p className="mt-4 text-xs md:text-sm text-gray-300">
          A positive running count indicates a higher proportion of high cards
          remaining in the deck, favoring the player. The True Count, calculated
          by dividing the Running Count by the Decks Remaining, gives an
          accurate measure of the favorability. Adjust your bets and strategy
          accordingly!
        </p>
      </div>
    </div>
  );
};

export default Level1Trainer;
