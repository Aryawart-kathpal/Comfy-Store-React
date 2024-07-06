import { Form,redirect } from "react-router-dom"
import FormInput from "./FormInput";
import SubmitBtn from "./SubmitBtn";
import { customFetch,formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";


export const action = (store,queryClient) => async({request}) =>{
  const formData = await request.formData();
  const {name,address} = Object.fromEntries(formData);

  const user = store.getState().userState.user;

  const {cartItems,orderTotal,numItemsInCart} = store.getState().cartState;

  // console.log(typeof orderTotal); // number
  // formatPrice returns a string
  const info ={
    name,address,chargeTotal:orderTotal,orderTotal:(orderTotal/100).toFixed(2),cartItems,numItemsInCart,
  }
  // toFixed again makes it string, but no error comes as backend automatically converts it to number

  // console.log(typeof info.orderTotal); // string
  // error coming as backend is expecting a number
  
  try {
    const response = await customFetch.post('/orders',info);

    queryClient.removeQueries(['orders']);
    store.dispatch(clearCart());
    toast.success('Order placed successfully'); 
    return redirect('/orders');

  } catch (error) {
    console.log(error);
    const errorMessage = error?.response?.data?.msg || 'there was an error placing your order';
    toast.error(errorMessage);
    if(error.response.status ===401) return redirect('/login');
    return null;
  }
}

const CheckoutForm = () => {
  return (
    <Form method='POST' className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">
        shipping information
      </h4>
      <FormInput label='first name' name='name' type='text'/>
      <FormInput label='address' name='address' type='text'/>
      <div className="mt-4">
        <SubmitBtn text='place your order' />
      </div>
    </Form>
  )
}
export default CheckoutForm