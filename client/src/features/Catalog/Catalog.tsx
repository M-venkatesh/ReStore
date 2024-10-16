import { Button } from "@mui/material";
import { Product } from "../../app/Models/Product"
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";


export default function Catalog() {
    const [Products, setProducts] = useState<Product[]>([])
    const [loading,setLoading] = useState(true);

  useEffect(() => {
     agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error=>console.log(error))
      .finally(()=>setLoading(false));
  }, [])

  if(loading) return <LoadingComponent message="Products Loading..."/>

    return (
        <>
            <ProductList products={Products}/>
        </>
    )
}