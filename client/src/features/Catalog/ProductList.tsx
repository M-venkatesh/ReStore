import { Grid2, List } from "@mui/material";
import { Product } from "../../app/Models/Product";
import ProductCard from "./ProductCard";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
    products: Product[];
}

export default function ProductList({ products }: Props) {
    const {productsLoaded} = useAppSelector(state=>state.catalog);
    return (
        <Grid2 container spacing={4} marginTop={2}>
            {products.map(product => (
                <Grid2 size={4} key={product.id}>
                    {
                        !productsLoaded ?
                        (<ProductCardSkeleton/>):
                        (<ProductCard key={product.id} product={product} />)
                    }
                </Grid2>
            ))}
        </Grid2>
    )
}