"use client";

import React, { useState, useEffect } from "react";
import { initializeDeck, shuffleDeck } from "./utils/deck";

const Home = () => {
  const [deck, setDeck] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<boolean[]>([]);

  useEffect(() => {
    const newDeck = shuffleDeck(initializeDeck());
    setDeck(newDeck);
    setFlippedCards(Array(newDeck.length).fill(false));
  }, []);

  const getCardImagePath = (card: { value: string | number; suit: string }) => {
    const valueMap: { [key: string]: string } = { A: "ace", J: "jack", Q: "queen", K: "king" };
    const cardValue =
      typeof card.value === "number" ? card.value : valueMap[card.value] || card.value;
    return `/cards/${cardValue}_of_${card.suit}.png`;
  };

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  return (
    <>
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }

        .card-flip {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .card-flip.flipped {
          transform: rotateY(180deg);
        }

        .card-front,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
        }

        .card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-4xl font-bold mb-6 text-blue-600">Card Counting Trainer</h1>
        <div className="grid grid-cols-4 gap-4">
          {deck.map((card, index) => (
            <div
              key={index}
              className="w-24 h-32 perspective cursor-pointer"
              onClick={() => handleCardClick(index)}
            >
              <div className={`card-flip ${flippedCards[index] ? "flipped" : ""}`}>
                {/* Card Front */}
                <div className="card-front">
                  <img
                    src={getCardImagePath(card)}
                    alt={`${card.value} of ${card.suit}`}
                    className="w-full h-full rounded-md shadow-md"
                  />
                </div>
                {/* Card Back */}
                <div className="card-back">
                  <img
                    src="/cards/back.png"
                    alt="Card Back"
                    className="w-full h-full rounded-md shadow-md"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;
