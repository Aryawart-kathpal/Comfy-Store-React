import { FormInput,SubmitBtn } from "../components";
import { Form,Link,redirect,useNavigate } from "react-router-dom";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

export const action = (store) =>async ({request})=>{
  //console.log(store);// now we can use the dispatch using this store, whole explanation of thi functionality, on 5.7.24 messages

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post('/auth/login',data);
    // console.log(response);

    store.dispatch(loginUser(response.data));
    toast.success('logged in successfully');
    return redirect('/');
  } catch (error) {

    const errorMessage = error?.response?.data?.msg;
    toast.error(errorMessage);
    return null;
  }

}

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async()=>{
    try {
      const response = await customFetch.post('/auth/login',{
        email:'test@test.com',
        password:'secret',
      });
      dispatch(loginUser(response.data));
      toast.success('Welcome Guest user');
      navigate('/');
    } catch (error) {
        toast.error('Guest user login error, please try again');
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form method='post' className="card w-96 p-8 bg-bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>

        <FormInput type="email" label="email" name="email"/>
        <FormInput type="password" label="password" name="password" />

        <div className="mt-4">
          <SubmitBtn text="login"/>
        </div>
        <button type="button" className="btn btn-secondary btn-block uppercase" onClick={loginAsGuestUser}>
            guest user
        </button>
        <p className="text-center">
          Not a member yet? <Link to='/register' className="ml-2 link link-hover link-primary capitalize" >
          register</Link>
        </p>
      </Form>
    </section>
  )
}
export default Login