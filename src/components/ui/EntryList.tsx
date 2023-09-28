import { DragEvent, FC, useContext, useMemo } from 'react';
import { Box, List, Paper } from "@mui/material"
import { EntryCard } from ".."
import { EntryStatus } from "@/interfaces"
import { EntriesContext, UIContext } from '@/context';

import styles from './EntryList.module.css'

interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext( EntriesContext )
    const { isDragging, endDragging } = useContext( UIContext )

    const entriesByStatus = useMemo( () => entries.filter( entry => entry.status === status ), [ entries ] )
    
    const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
        event.preventDefault()
    }
    
    const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find( e => e._id === id )!;
        entry.status = status

        updateEntry( entry )
        endDragging()
    }

    return (
        <Box component='div' onDrop={ onDropEntry } onDragOver={ allowDrop } className={ isDragging ? styles.dragging : '' } >
            <Paper sx={{ height: 'calc(100vh - 150px)', overflow: 'auto', backgroundColor: 'transparent', padding: 0.5, }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map( entry => (
                            <EntryCard key={ entry._id} entry={ entry } />
                        ))
                    }
                </List>
            </Paper>
        </Box>
    )
}
