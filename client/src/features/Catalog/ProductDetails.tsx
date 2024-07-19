import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { Product } from "../../app/Models/Product";
import { useEffect, useState } from "react";
import axios from "axios";


export default function ProductDetails() {

    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://localhost:7028/api/Products/${id}`)
        .then(response => setProduct(response.data))
        .catch(error => console.log(error))
        .finally(()=>setLoading(false));
    },[id])

    if(loading) return <h3>Loading....</h3>
    if(!product) return <h3>Not Product Found</h3>

    return (
        <Grid container spacing={6}>
<Grid item xs={6}>
    <img src={product.pictureUrl} alt={product.name} style={{width:'100%'}}/>

</Grid>
<Grid item xs={6}>
    <Typography variant="h3">{product.name}</Typography>
    <Divider sx={{mb:2}} />
    <Typography variant="h4" color='secondary'>${(product.price/100).toFixed(2)}</Typography>
    <TableContainer>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{product.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>{product.description}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>{product.type}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Brand</TableCell>
                    <TableCell>{product.brand}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Quantity in Stock</TableCell>
                    <TableCell>{product.quantityInStock}</TableCell>
                </TableRow>
                
            </TableBody>
        </Table>
    </TableContainer>
</Grid>
        </Grid>
    )
} 