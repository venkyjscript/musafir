import { useState } from "react";

// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: false },
//   { id: 3, description: "charger", quantity: 12, packed: true }
// ];

function App(){
  const [items,setItems]=useState([]);
  
  function handlePacked(id){
    setItems(items=>items.map(item=>
      //need to spread the json object to add new property and updating existing one
      item.id===id?{...item,packed:!item.packed}
      :item
    
      ))

  }
  
  function handleClearList(){
    setItems([]);
  }
  
  function handleDelete(id){
    setItems(items=>items.filter(item=>item.id!==id));
  }
  function handleItems(itm){
    setItems(items=>[...items,itm]);
  
  }
  return(
    <div className="app">
      <Logo/>
    <Form onAddItem={handleItems}/>
    <PackingList saman={items} onDelete={handleDelete}
    onPacked={handlePacked} onClear={handleClearList}/>
    <Stats items={items} />
    </div>
    
  );
}

function Logo(){
  return(
    <h1>⛰️ Musafir 🎒</h1>
  )
}

function Form({onAddItem}){
const [description,setDesc]=useState("")
const [quantity,setQty]=useState(1);



  function handleSubmit(e){
    e.preventDefault();//to prevent page relode

    if(!description)return;

    const newItm={description,quantity,packed:false,id:Date.now()};
    onAddItem(newItm)
    setDesc('');
    setQty(1);

  }

  return(
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Trip Items 😏🧐</h3>
      <select value={quantity} 
       onChange={e=>setQty(+e.target.value)}>
        {Array.from({length:20},(_,i)=>i+1).map(
          (num)=>(
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      <input type="text" placeholder="Item..."
      value={description}  onChange={e=>setDesc(e.target.value)}></input>
      <button>Add</button>
    </form>
    
  )
}

function PackingList({saman,onDelete,onPacked,onClear}){
const [sortBy,setSortBy]=useState('input');
let sortedItems;
if(sortBy==='input') sortedItems=saman;

  if(sortBy==='description')
  sortedItems=saman.slice()
  .sort((a,b)=>a.description.localeCompare(b.description));

  if(sortBy==='pack')
  sortedItems=saman.slice()
  .sort((a,b)=>Number(a.packed)-Number(b.packed));

  return (
    <div className="list">
  <ul >
    {sortedItems.map((itm)=>(
      <Item samaan={itm} deleteItem={onDelete} 
      onPacked={onPacked} key={itm.id}/>
    ))}
    </ul>
    <div className="actions">
      <select value={sortBy} onChange={e=>setSortBy(e.target.value)}>
        <option value='input'>Sort by input order</option>
        <option value='description'>Sort by description</option>
        <option value='pack'>Sort by packed Status</option>
      </select>
      <button onClick={onClear}>Clear List</button>
    </div>
    </div>
  );
}

function Item({samaan,deleteItem,onPacked}){

  

  
  const {id,description,quantity,packed}=samaan;
  return(
    <li>
      <input type="checkbox" value={packed}  onChange={()=>onPacked(id)}></input>
      <span style={packed?{textDecoration:'line-through'}:{}}>
        {quantity} {description}</span>
      <button  onClick={()=>deleteItem(id)}>❌</button>
      </li>
  )
}

function Stats({items}){

  if(!items.length)
  return(
    <footer className="stats">
      <em>
       Add something
        
      </em>
    </footer>
    );

  const itm=items.length;
  const pckd=items.filter(i=>i.packed).length;
  const perc=Math.round((pckd/itm)*100);
  return(
    <footer className="stats">
      <em>
        {perc===100?
        
      'You are ready to go ✈️✈️':
      `💼You have ${itm} items in your list, 
        and you have already packed ${pckd} (${perc}%)`}
        
      </em>
    </footer>
  )

}





export default App;