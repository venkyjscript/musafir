import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

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

export default App;