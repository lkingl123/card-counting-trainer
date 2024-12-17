const Controls = ({
    bet,
    onBetChange,
    onDeal,
  }: {
    bet: number;
    onBetChange: (bet: number) => void;
    onDeal: () => void;
  }) => (
    <div className="text-center mt-4">
      <input
        type="number"
        value={bet}
        onChange={(e) => onBetChange(Number(e.target.value))}
        className="border p-2 rounded mr-2"
        placeholder="Bet Amount"
      />
      <button onClick={onDeal} className="bg-green-600 hover:bg-green-500 text-white p-2 rounded">
        Deal Cards
      </button>
    </div>
  );
  
  export default Controls;
  