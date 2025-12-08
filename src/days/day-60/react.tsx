import { useState } from "react";

export const meta = {
  id: "day-60-react",
  title: "Ticket Quantity Control",
  prompt: "Control ticket count and show total price.",
};

const price = 199;

export function Solution() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="demo-surface">
      <span className="badge">Total: Rs {quantity * price}</span>
      <div className="demo-row">
        <button className="demo-button secondary" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
        <span className="badge">{quantity}</span>
        <button className="demo-button" onClick={() => setQuantity((value) => value + 1)}>+</button>
      </div>
    </div>
  );
}
