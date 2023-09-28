import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { UIContext } from '@/context';
import { Entry } from '@/interfaces';
import { dateFunctions } from '@/utils';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging, isDragging } = useContext( UIContext )
    const router = useRouter()


    const onDragStart = ( event: DragEvent<HTMLButtonElement> ) => {
        event.dataTransfer.setData('text', entry._id)

        startDragging()
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`)
    }

    return (
        <Card sx={{ mb: 1, backgroundColor: isDragging ? 'primary.main' : '' }}>
            <CardActionArea onClick={ onClick } draggable onDragStart={ onDragStart } onDragEnd={ endDragging }>

                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', pr: 2 }}>
                    <Typography variant='body2'>{ dateFunctions.getDistanceToNow( entry.createdAt ) }</Typography>
                </CardActions>

            </CardActionArea>
        </Card>
    )
}
