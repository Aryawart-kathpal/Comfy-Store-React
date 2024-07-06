import { Link,useLoaderData } from "react-router-dom"
import { formatPrice } from "../utils";

const ProductsGrid = () => {
    const {products} = useLoaderData();// as the productsGrid is nested in some other component, which invokes the loader, which here is the featuredProducts in the landing page, no matter how many levels deep nesting is there, we can still access the products data from the loader

    // console.log(products);
  return (
    <div className="pt-12 gap-4 grid md:grid-cols-2 lg:grid-cols-3">
        {products?.map((product)=>{
            const {title,price,image} = product;
            const dollarsAmount= formatPrice(price);
            return(
                <Link to={`/products/${product._id}`} key={product._id} className="card w-full shadow-xl hover:shadow-2xl transition duration-300">
                    <figure className="px-4 pt-4">
                        <img src={image} alt={title} className="rounded-xl h-64 md:h-48 w-full object-cover" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title capitalize tracking-wider">{title}</h2>
                        <span className="text-secondary">{dollarsAmount}</span>
                    </div>
                </Link>
            )
        })}
    </div>
  )
}
export default ProductsGrid