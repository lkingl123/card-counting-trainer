import Card from "./Card";

const PlayerSpot = ({
  player,
  onSit,
  seatNumber, // Add seat number for dynamic labeling
}: {
  player: { seated: boolean; hand: any[]; bet: number };
  onSit: () => void;
  seatNumber: number;
}) => (
  <>
    <style jsx>{`
      .player-spot {
        text-align: center;
        width: 120px;
        height: 100px;
        margin: 0 10px; /* Add spacing between player spots */
      }

      .seat-label {
        color: white;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .sit-button {
        background-color: #1d4ed8;
        color: white;
        padding: 8px 12px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: background-color 0.2s;
      }

      .sit-button:hover {
        background-color: #2563eb;
      }
    `}</style>

    <div className="player-spot">
      {/* Dynamic Seat Label */}
      <p className="seat-label">Player {seatNumber}</p>

      {/* Seated State */}
      {player.seated ? (
        <>
          <p className="text-white mb-2">Bet: ${player.bet}</p>
          <div className="flex justify-center space-x-2">
            {player.hand.map((card, i) => (
              <Card key={i} value={card.value} suit={card.suit} />
            ))}
          </div>
        </>
      ) : (
        /* "Sit" Button */
        <button onClick={onSit} className="sit-button">
          Sit
        </button>
      )}
    </div>
  </>
);

export default PlayerSpot;
