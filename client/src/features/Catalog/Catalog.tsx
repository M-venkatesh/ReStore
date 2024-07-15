import { Button } from "@mui/material";
import { Product } from "../../app/Models/Product"
import ProductList from "./ProductList";
import { useState, useEffect } from "react";


export default function Catalog() {
    const [Products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('https://localhost:7028/api/Products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [])

    return (
        <>
            <ProductList products={Products}/>
        </>
    )
}