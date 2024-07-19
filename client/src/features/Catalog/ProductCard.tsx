import { ListItem, ListItemAvatar, Avatar, ListItemText, Button, Card, CardActions, CardContent, CardMedia, Typography, CardHeader } from "@mui/material";
import { Product } from "../../app/Models/Product";
import { Link } from "react-router-dom";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
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
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Add to Cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}