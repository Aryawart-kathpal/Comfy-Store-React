import { FeaturedProducts, Hero } from "../components"
import { customFetch } from "../utils";

const url='/products?featured=true'; 

const featuredProductsQuery = {
  queryKey:['featuredProducts'],
  queryFn: ()=> customFetch(url)
}

export const loader = (queryClient)=>async() =>{
  // const response = await customFetch.get(url);
  const response = await queryClient.ensureQueryData(featuredProductsQuery);
  // console.log(response.data);
  const products = response.data.products;
  // console.log(response.data.products);
  return {products};
} 

const Landing = () => {
  return (
    <>
      <Hero/>
      <FeaturedProducts/>
    </>
  )
}
export default Landing