import { useContext } from 'react'
import { InboxRounded, MailRounded } from '@mui/icons-material'
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { UIContext } from '@/context'

const menuItems: string[] = ['Inbox', 'Starred', 'Send']

export const Sidebar = () => {

    const { sideMenuOpen, openCloseSideMenu } = useContext( UIContext )

    return (
        <Drawer anchor='left' open={ sideMenuOpen } onClose={ openCloseSideMenu }>
            <Box sx={{ width: 250 }}>

                <Box sx={{ padding: '5px 10px' }}>
                    <Typography variant='h4'>Just to learn</Typography>
                </Box>

                <List>
                    {
                        menuItems.map( ( text, index ) => (
                            <ListItemButton key={ text }>
                                <ListItemIcon>
                                    { index % 2 ? <InboxRounded /> : <MailRounded /> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItemButton>
                        ) )
                    }
                </List>

                <Divider />

                <List>
                    {
                        menuItems.map( ( text, index ) => (
                            <ListItemButton key={ text }>
                                <ListItemIcon>
                                    { index % 2 ? <InboxRounded /> : <MailRounded /> }
                                </ListItemIcon>
                                <ListItemText primary={ text } />
                            </ListItemButton>
                        ) )
                    }
                </List>

            </Box>

        </Drawer>
    )
}
