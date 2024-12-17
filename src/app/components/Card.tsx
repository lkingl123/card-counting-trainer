import React from 'react';

interface CardProps {
  card: string; // Card name (e.g., "2_of_clubs")
  style?: React.CSSProperties; // Positioning or animations
}

const Card: React.FC<CardProps> = ({ card, style }) => {
  return (
    <img
      src={`/cards/${card}.png`}
      alt={card}
      style={{
        width: '80px',
        height: 'auto',
        position: 'absolute',
        ...style,
      }}
    />
  );
};

export default Card;
