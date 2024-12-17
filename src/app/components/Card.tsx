import React from "react";

interface CardProps {
  card: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ card, style }) => (
  <div
    style={{
      width: "80px",
      height: "120px",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      ...style,
    }}
  >
    <img
      src={`/cards/${card}.png`}
      alt={card}
      style={{ width: "100%", height: "100%" }}
      className="rounded-lg"
    />
  </div>
);

export default Card;
