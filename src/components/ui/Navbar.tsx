import { useContext } from "react";
import NextLink from "next/link";
import { AppBar, IconButton, Link, Toolbar, Typography, useTheme } from '@mui/material';
import { MenuRounded } from "@mui/icons-material"
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { UIContext } from "@/context";
import { useThemeContext } from "@/themes";


export const Navbar = () => {

    const { toggleTheme } = useThemeContext();
    const actualTheme = useTheme()

    const { openCloseSideMenu } = useContext( UIContext )

    return (
        <AppBar sx={{ backgroundColor: 'primary.main' }} position="sticky" elevation={ 0 } >

            <Toolbar>

                <IconButton onClick={ openCloseSideMenu } size="medium" edge="start">
                    <MenuRounded />
                </IconButton>
                &nbsp;
                    <Link component={ NextLink } href='/' underline="none" color='text.primary'>
                        <Typography variant="h6">Task Manager</Typography>
                    </Link>

                <IconButton sx={{ position: 'absolute', right: 20 }} onClick={ toggleTheme }>
                    {actualTheme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

            </Toolbar>

        </AppBar>
    )
}
