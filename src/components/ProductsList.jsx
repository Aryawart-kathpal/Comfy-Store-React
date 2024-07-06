import { Link,useLoaderData } from "react-router-dom"
import { formatPrice } from "../utils";

const ProductsList = () => {
    const {products} = useLoaderData();// as the productsGrid is nested in some other component, which invokes the loader, which here is the featuredProducts in the landing page, no matter how many levels deep nesting is there, we can still access the products data from the loader

    // console.log(products);
  return (
    <div className="mt-12 grid gap-y-8">
        {products?.map((product)=>{
            const {title,price,image,company} = product;
            const dollarsAmount= formatPrice(price);
            return(
                <Link key={product._id} to={`products/${product._id}`} className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap bg-base-100 shadow-xl hover:shadow-2xl duration-300 group">
                    {/* using this group property now, all children of it have the access to it for ex. here I want to scale the image at group-hover property */}
                    <img src={image} alt={title} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300"/>
                    <div className="ml-0 sm:ml-16">
                        <h3 className="capitalize font-medium text-lg">{title}</h3>
                        <h4 className="capitalize text-md text-neutral-content">{company}</h4>
                    </div>
                    <p className="font-medium ml-0 sm:ml-auto text-lg">{dollarsAmount}</p>
                </Link>
            )
        })}
    </div>
  )
}
export default ProductsList