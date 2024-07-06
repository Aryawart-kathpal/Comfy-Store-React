import { redirect,useLoaderData } from "react-router-dom"
import { toast } from "react-toastify"
import { customFetch } from "../utils"
import { OrdersList,ComplexPaginationContainer,SectionTitle } from "../components";

const ordersQuery =(params,user) =>{
  return {
    queryKey : ['orders',user.userId,params.page?parseInt(params.page):1],
    queryFn : ()=>customFetch.get('/orders',{params})
  }
}

export const loader = (store,queryClient) => async({request}) =>{
  const user = store.getState().userState.user;
  // console.log("Hello bro");
  if(!user){
    toast.warn('You must be logged in to view your orders');
    return redirect('/login');
  }

  const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
  // console.log(params);

  try {
    const response = await queryClient.ensureQueryData(
      ordersQuery(params,user),
    )
    // console.log(response);

    return {orders : response.data.orders, pagination:response.data.pagination};
  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.msg || 'There was an error fetching your orders';

    toast.error(errorMessage);
    if(error.response.status === 401 ||403 ) return redirect('/login');
    return null;
  }
}

const Orders = () => {
  const {pagination} = useLoaderData();
  if(pagination.total < 1){
    return <SectionTitle text='please make an order' />
  }
  return (
    <>
      <SectionTitle text='Your orders' />
      <OrdersList/>
      <ComplexPaginationContainer/>
    </>
  )
}
export default Orders;