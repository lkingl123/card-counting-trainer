"use client";

import React, { useState } from "react";
import Dealer from "./components/Dealer";
import Deck from "./components/Deck";
import PlayerSpot from "./components/PlayerSpot";
import { initializeDeck, shuffleDeck } from "./utils/deck";

const BlackjackTable = () => {
  const [deck, setDeck] = useState<any[]>(shuffleDeck(initializeDeck()));
  const [dealerHand, setDealerHand] = useState<any[]>([]); // Dealer's cards
  const [players, setPlayers] = useState(
    Array(4).fill({ seated: false, hand: [], bet: 0 })
  );
  const [bettingPlayer, setBettingPlayer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false); // Track round state
  const [currentTurn, setCurrentTurn] = useState<number | null>(null);

  // Sit down and place the bet
  const handleSit = (index: number) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], seated: true, bet: 0 };
    setPlayers(newPlayers);
    setBettingPlayer(index);
  };

  // Deal cards for the round
  const dealCards = () => {
    if (bettingPlayer !== null) {
      const newDeck = [...deck];
      const newPlayers = [...players];

      // Deal 2 cards to the betting player and 2 to the dealer
      newPlayers[bettingPlayer].hand = [newDeck.pop(), newDeck.pop()];
      setDealerHand([{ ...newDeck.pop(), faceDown: true }, newDeck.pop()]);

      setPlayers(newPlayers);
      setDeck(newDeck);
      setGameStarted(true);
      setCurrentTurn(bettingPlayer);
    }
  };

  const handleChipClick = (amount: number) => {
    if (bettingPlayer !== null) {
      const newPlayers = [...players];
      newPlayers[bettingPlayer].bet += amount;
      setPlayers(newPlayers);
    }
  };

  // Calculate hand value
  const calculateHandValue = (hand: any[]) => {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
      if (typeof card.value === "number") {
        value += card.value;
      } else if (["J", "Q", "K"].includes(card.value)) {
        value += 10;
      } else if (card.value === "A") {
        aces += 1;
        value += 11;
      }
    });

    while (value > 21 && aces > 0) {
      value -= 10;
      aces -= 1;
    }

    return value;
  };

  return (
    <>
      <style jsx>{`
        .table {
          position: relative;
          background: radial-gradient(circle, #2e2e2e, #1e1e1e);
          border: 8px solid #333;
          border-radius: 50% / 10%;
          width: 1600px;
          height: 700px;
          margin: 40px auto;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .controls {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
        }

        .action-button {
          background-color: #3b82f6;
          color: white;
          padding: 8px 12px;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .action-button:hover {
          background-color: #2563eb;
        }

        .bet-info {
          color: white;
          font-size: 0.9rem;
          margin-top: 5px;
        }
      `}</style>

      <div className="table">
        {/* Dealer Section */}
        <div className="dealer">
          <Dealer hand={dealerHand} />
        </div>

        {/* Player Spots */}
        <div className="player-spots-container">
          {players.map((player, i) => (
            <div key={i} className="text-center">
              <PlayerSpot
                player={player}
                onSit={() => handleSit(i)}
                seatNumber={i + 1}
              />
              {/* Bet Information */}
              {player.seated && !gameStarted && (
                <div className="bet-info">Current Bet: ${player.bet}</div>
              )}

              {/* Chip Buttons */}
              {player.seated && !gameStarted && bettingPlayer === i && (
                <div className="controls">
                  <button
                    className="action-button"
                    onClick={() => handleChipClick(1)}
                  >
                    +1
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleChipClick(5)}
                  >
                    +5
                  </button>
                  <button
                    className="action-button"
                    onClick={() => handleChipClick(10)}
                  >
                    +10
                  </button>
                </div>
              )}

              {/* Deal Button */}
              {bettingPlayer === i && player.seated && !gameStarted && (
                <div className="mt-4">
                  <button className="action-button" onClick={dealCards}>
                    Deal
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlackjackTable;
