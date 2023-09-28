import { ReactNode, FC } from 'react';
import Head from 'next/head';
import { Box, Grid } from '@mui/material';
import { Navbar, Sidebar } from '../';


interface LayoutProps {
    title?: string,
    children: ReactNode
}

export const Layout: FC<LayoutProps> = ({ title = 'Task Manager', children }) => {
    return (
        <Box sx={{ flexFlow: 1 }} >

            <Head>
                <title>{ title }</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Navbar />
            <Sidebar />

            <Box sx={{ padding: '10px 20px' }}>
                { children }
            </Box>

        </Box>
    )
}
