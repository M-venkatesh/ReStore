import { Avatar, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/Models/Product";
import { Link } from "react-router-dom";
import { LoadingButton } from '@mui/lab';
import { useState } from "react";
import agent from "../../app/api/agent";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";
interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const {status} = useAppSelector(state=>state.basket);
    const dispatch = useAppDispatch();

    
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
               avatar = {
                  <Avatar>
                    {product.name.charAt(0)}
                  </Avatar>
               }
               title={product.name}
               titleTypographyProps={{sx:{fontFamily:'bold'}}}
            />
            <CardMedia
                sx={{ height: 140 }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" color='secondary' >
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    loading={status.includes('pendingAddItem'+product.id) } 
                    onClick={()=>dispatch(addBasketItemAsync({productId: product.id}))} 
                    size="small">Add to Cart</LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}