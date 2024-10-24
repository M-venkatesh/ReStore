import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

const midLinks = [
    { title: 'Catalog', path: '/catalog' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' }
]
const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    fontSize: '10',
    textDecoration: 'none',
    '&:hover': {
        color: 'white'
    },
    '&.active': {
        typography: 'h6'
    }
}
interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    const { basket } = useAppSelector(state=>state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant="h6" component={NavLink}
                        to='/' sx={{ color: 'inherit', textDecoration: 'none' }}>
                        My Store
                    </Typography>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem
                            component={NavLink}
                            to={path}
                            key={path}
                            sx={navStyles}
                        >
                            {title.toUpperCase()}
                        </ListItem>
                    ))}
                </List>

                <Box display='flex' alignItems='center'>
                    <IconButton component={Link} to='/basket' color="inherit">
                        <Badge badgeContent={itemCount}>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={{
                                    color: 'inherit',
                                    '&:hover': {
                                        color: 'black',
                                        backgroundColor: 'white'
                                    }
                                }}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}