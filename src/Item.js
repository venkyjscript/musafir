
export function Item({ samaan, deleteItem, onPacked }) {




  const { id, description, quantity, packed } = samaan;
  return (
    <li>
      <input type="checkbox" value={packed} onChange={() => onPacked(id)}></input>
      <span style={packed ? { textDecoration: 'line-through' } : {}}>
        {quantity} {description}</span>
      <button onClick={() => deleteItem(id)}>❌</button>
    </li>
  );
}
