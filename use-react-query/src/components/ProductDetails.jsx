import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const retreaveProduct = async({queryKey}) =>{
  const response = await axios.get(`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`);
  return response.data;
}

const ProductDetails = ({id}) => {
  
  
  const {data:product, isLoading, error} = useQuery({
    queryKey:['products', id],
    queryFn:retreaveProduct,
  })
  if(isLoading) return <div className="text-4xl text-center font-bold">Fetching Product Details</div>
  if(error) return <div>not found any product of : {error.message}</div>

  return (
    <div className="w-1/5 bg-slate-200 rounded-sm border p-5">
      <h1 className="text-center text-4xl font-bold ">Product Details</h1>
      <div>
        <img className="object-cover h-24 w-24 border rounded-full m-auto" src={product.thumbnail}
        alt={product.title} />
       <p>{product.title}</p>
       <p>{product.description}</p>
       <p>{product.price}</p>
       <p>{product.rating}</p>

      </div>
    </div>
  );
};

export default ProductDetails;