import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/Home";
import Catalog from "../../features/Catalog/Catalog";
import ProductDetails from "../../features/Catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import AboutPage from "../../features/about/AboutPage";
import ServerError from "../Errors/ServerError";
import NotFound from "../Errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <HomePage /> },
            { path: 'catalog', element: <Catalog /> },
            { path: 'catalog/:id', element: <ProductDetails /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'about', element: <AboutPage /> }, 
            { path: 'server-error', element: <ServerError /> } ,
            { path: 'not-found', element: <NotFound /> } ,
            { path: 'basket', element: <BasketPage /> } ,
            { path: 'checkout', element: <CheckoutPage /> } ,
            { path: '*', element: <Navigate replace to='/not-found'/> } 
        ]
    }
])