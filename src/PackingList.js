import { useState } from "react";
import { Item } from "./Item";

export function PackingList({ saman, onDelete, onPacked, onClear }) {
  const [sortBy, setSortBy] = useState('input');
  let sortedItems;
  if (sortBy === 'input') sortedItems = saman;

  if (sortBy === 'description')
    sortedItems = saman.slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === 'pack')
    sortedItems = saman.slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((itm) => (
          <Item samaan={itm} deleteItem={onDelete}
            onPacked={onPacked} key={itm.id} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value='input'>Sort by input order</option>
          <option value='description'>Sort by description</option>
          <option value='pack'>Sort by packed Status</option>
        </select>
        <button onClick={onClear}>Clear List</button>
      </div>
    </div>
  );
}
