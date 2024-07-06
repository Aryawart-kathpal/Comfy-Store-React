import axios from "axios";

const productionUrl= import.meta.env.VITE_PRODUCTION_URL || "http://localhost:5000/api/v1";
// console.log(productionUrl);

axios.defaults.withCredentials=true;
export const customFetch = axios.create({
    baseURL:productionUrl,
    withCredentials:true,
});

export const formatPrice = (price)=>{
    const dollarsAmount= new Intl.NumberFormat('en-US',{
        style:'currency',
        currency:'USD',
    }).format((price/100).toFixed(2));
    return dollarsAmount;
}

export const generateAmountOptions =(number)=>{
    return Array.from({length:number},(_,index)=>{
        const amount=index+1;
        return <option value={amount} key={amount}>{amount}</option>
    })
}