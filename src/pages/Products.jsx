import { Filters, PaginationContainer, ProductsContainer } from "../components";
import { customFetch } from "../utils";
const url='/products';

// instead of sticking await inside the query, await is stick at the loader, so the same thing
const allProductsQuery = (queryParams) =>{
  const {search,category,company,sort,price,shipping,page} = queryParams;

  return {
    queryKey : ['products',search ?? '',category ?? 'all', company ?? 'all', sort ?? 'a-z', price ?? 100000,shipping ?? false,page ?? 1],
    queryFn : () => customFetch(url,{
      params:queryParams
    })
    }
}

export const loader = (queryClient) => async({request}) =>{

  // const params = new URL(request.url).searchParams;
  // const search= params.get('search');
  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  // console.log(params);

  const response = await queryClient.ensureQueryData(allProductsQuery(params));

  // console.log(response);
  const products=response.data.products;
  // console.log(products);
  const pagination = response.data.pagination;
  const categories = response.data.categories;
  const companies = response.data.companies;

  return {products,pagination,categories,companies,params};
}

const Products = () => {
  return (
    <>
      <Filters/>
      <ProductsContainer/>
      <PaginationContainer/>
    </>
  )
}
export default Products