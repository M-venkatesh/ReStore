import { Grid2, List } from "@mui/material";
import { Product } from "../../app/Models/Product";
import ProductCard from "./ProductCard";

interface Props{
    products:Product[];
}

export default function ProductList({products}:Props) {
    return (
        <Grid2 container spacing={4} margin={2}>
            {products.map(product => (
                <Grid2 size={3} key={product.id}>
                <ProductCard key={product.id} product={product}/>
                </Grid2>
            ))}
        </Grid2>
    )
}