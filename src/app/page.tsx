"use client"; // Ensures this is a client component

import React, { useState, useEffect } from "react";
import { initializeDeck, shuffleDeck } from "./utils/desk";

const Home = () => {
  const [deck, setDeck] = useState<any[]>([]);

  useEffect(() => {
    const newDeck = shuffleDeck(initializeDeck());
    setDeck(newDeck);
  }, []);

  // Map face card values and Ace to their proper filenames
  const getCardImagePath = (card: { value: string | number; suit: string }) => {
    const valueMap: { [key: string]: string } = {
      A: "ace",
      J: "jack",
      Q: "queen",
      K: "king",
    };

    // Convert face card values or keep numeric values
    const cardValue =
      typeof card.value === "number" ? card.value : valueMap[card.value] || card.value;

    return `/cards/${cardValue}_of_${card.suit}.png`;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">
        Card Counting Trainer
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {deck.map((card, index) => (
          <div key={index} className="p-2 border rounded-md bg-white shadow-md">
            <img
              src={getCardImagePath(card)}
              alt={`${card.value} of ${card.suit}`}
              className="w-24 h-auto"
            />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
