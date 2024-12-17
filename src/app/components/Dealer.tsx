import Card from "./Card";

const Dealer = ({ hand }: { hand: any[] }) => (
  <div className="text-center absolute top-8 left-1/2 transform -translate-x-1/2">
    <p className="text-white mb-2">Dealer</p>
    <div className="flex justify-center space-x-2">
      {hand.map((card, i) => (
        <Card key={i} value={card.value} suit={card.suit} />
      ))}
    </div>
  </div>
);

export default Dealer;
