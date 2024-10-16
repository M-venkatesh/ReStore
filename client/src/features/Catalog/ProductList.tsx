import { Grid, List } from "@mui/material";
import { Product } from "../../app/Models/Product";
import ProductCard from "./ProductCard";

interface Props{
    products:Product[];
}

export default function ProductList({products}:Props) {
    return (
        <Grid container spacing={4}>
            {products.map(product => (
                <Grid item xs={3}>
                <ProductCard key={product.id} product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}