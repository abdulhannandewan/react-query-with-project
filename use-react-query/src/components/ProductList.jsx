import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';


const retreaveProducts = async({queryKey}) =>{
  const response = await axios.get(`http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`);
  return response.data;
}

const ProductList = ({setId}) => {
  const [page, setPage] = useState(1);
  const {data:products , error, isLoading} =useQuery({
    queryKey:['products',{page}],
    queryFn: retreaveProducts,
    retry:false,
  });
  
 
  
  const handleId = (id) =>{
    setId(id);
  }
  if(isLoading) return <div className='text-6xl text-green-900 text-center'>Fetching Products...</div>;
  if(error) return <div>An error ocured : {error.message}</div>;
  
  
  return (
    <>
    <div className='flex flex-col justify-center items-center w-3/5'>
    <h2 className=' text-3xl my-2'>Product List</h2>
    <ul className='flex flex-wrap justify-center items-center'>
      {
       
        
        products.data.map(product =>{
         return ( <li className='flex flex-col items-center border rounded-sm' key={product.id}>
                <img className='object-cover h-64 w-96 rounded-sm' src={product.thumbnail} alt={product.title} />
                <p className='text-xl my-2'>{product.title}</p>
                <button onClick={() => handleId(product.id)}>Show Details</button>
          </li>)
        })
      }
    </ul>
    <div>
      {
        products.prev && (
          <button
              className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm' onClick={() => setPage(products.prev)}>Next</button>
        )
      }
      {
        products.next && (
          <button
              className='p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm' onClick={() => setPage(products.next)}>Next</button>
        )
      }
    </div>
    </div>
    </>
  );
};

export default ProductList;
