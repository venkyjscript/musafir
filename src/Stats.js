export function Stats({ items }) {

  if (!items.length)
    return (
      <footer className="stats">
        <em>
          Add something

        </em>
      </footer>
    );

  const itm = items.length;
  const pckd = items.filter(i => i.packed).length;
  const perc = Math.round((pckd / itm) * 100);
  return (
    <footer className="stats">
      <em>
        {perc === 100 ?

          'You are ready to go ✈️✈️' :
          `💼You have ${itm} items in your list, 
        and you have already packed ${pckd} (${perc}%)`}

      </em>
    </footer>
  );

}
