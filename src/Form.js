import { useState } from "react";

export function Form({ onAddItem }) {
  const [description, setDesc] = useState("");
  const [quantity, setQty] = useState(1);



  function handleSubmit(e) {
    e.preventDefault(); //to prevent page relode

    if (!description) return;

    const newItm = { description, quantity, packed: false, id: Date.now() };
    onAddItem(newItm);
    setDesc('');
    setQty(1);

  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Trip Items 😏🧐</h3>
      <select value={quantity}
        onChange={e => setQty(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(
          (num) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input type="text" placeholder="Item..."
        value={description} onChange={e => setDesc(e.target.value)}></input>
      <button>Add</button>
    </form>

  );
}
