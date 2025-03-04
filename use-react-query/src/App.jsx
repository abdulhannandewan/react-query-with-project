import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";




const App = () => {
  const [id, setId ] = useState(1)
 
  return (
    
    <div className="flex m-2">
    <AddProduct/>
      <ProductList setId={setId} />
      <ProductDetails id={id}/>
    
    </div>
  );
};

export default App;