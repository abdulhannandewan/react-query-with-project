import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [state, setState] = useState({
    title: "",
    description: "",
    price: 0,
    rating: 0,
    thumbnail: "",
  });

  const mutation = useMutation({
    mutationFn: (newProduct) =>
      axios.post(`http://localhost:3000/products`, newProduct),
    onSuccess:() =>{
        queryClient.invalidateQueries('products');
    }
  });
  const submitData = (e) => {
    e.preventDefault();
    
    const newData = {...state, id:crypto.randomUUID().toString()};
    console.log(newData);
    
    mutation.mutate(newData);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value =
      e.target.type === "number" ? e.target.valueAsNumber : e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
      <h1 className="text-2xl my-2">Add a Product</h1>
      <form className="flex flex-col" onSubmit={submitData}>
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product title"
        />
        <textarea
          name="description"
          value={state.description}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product description"
        />
        <input
          type="number"
          name="price"
          value={state.price}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product price"
        />
        <input
          type="text"
          name="thumbnail"
          value={state.thumbnail}
          onChange={handleChange}
          className="my-2 border p-2 rounded"
          placeholder="Enter a product thumbnail url"
        />
        <button
          type="submit"
          className="bg-black m-auto text-white text-xl p-1 rounded-md"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
