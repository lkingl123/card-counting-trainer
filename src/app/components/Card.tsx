const Card = ({ value, suit }: { value: string | number; suit: string }) => {
    const getCardImagePath = () => {
      const valueMap: { [key: string]: string } = { A: "ace", J: "jack", Q: "queen", K: "king" };
      const cardValue = typeof value === "number" ? value : valueMap[value] || value;
      return `/cards/${cardValue}_of_${suit}.png`;
    };
  
    return (
      <img
        src={getCardImagePath()}
        alt={`${value} of ${suit}`}
        className="w-16 h-24 bg-white rounded shadow-lg"
      />
    );
  };
  
  export default Card;
  