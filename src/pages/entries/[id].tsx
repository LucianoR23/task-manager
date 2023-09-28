import { ChangeEvent, useMemo, useState, FC, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from "@mui/material"
import { DeleteForeverRounded, SaveRounded } from "@mui/icons-material"
import { Layout } from "@/components"
import { Entry, EntryStatus } from "@/interfaces"
import { dbEntries } from '@/database';
import { EntriesContext } from '@/context';
import { dateFunctions } from '@/utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {
    const { updateEntry } = useContext( EntriesContext )


    const [inputValue, setInputValue] = useState( entry.description )
    const [status, setStatus] = useState<EntryStatus>( entry.status )
    const [touched, setTouched] = useState(false)

    const isInvalid = useMemo(() => inputValue.length <= 3 && touched, [inputValue, touched])

    const onInputChange = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value )
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
        setStatus( event.target.value as EntryStatus )
    }

    const onSave = () => {
        if( inputValue.trim().length <= 3 ) return

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true )
    }

    return (
        <Layout title={ inputValue.substring(0,15) + '...' }>

            <Grid container justifyContent='center' sx={{ mt: 2 }}>

                <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
                    <Card>
                        <CardHeader title="Entry:" subheader={`Created ${ dateFunctions.getDistanceToNow( entry.createdAt ) }`} />
                        <CardContent>
                            <TextField fullWidth autoFocus multiline sx={{ mt: 2, mb: 1 }} placeholder="New entry" label="New entry" value={ inputValue } onChange={ onInputChange } onBlur={ () => setTouched( true ) } error={ isInvalid } helperText={ isInvalid && 'Insert a valid entry' } />
                            <FormControl sx={{ mt: 2 }}>
                                <FormLabel>Status:</FormLabel>
                                <RadioGroup row value={ status } onChange={ onStatusChanged }>
                                    {
                                        validStatus.map( option => (
                                            <FormControlLabel key={ option } value={ option } control={ <Radio /> } label={ capitalize(option) } />
                                        ) )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button startIcon={ <SaveRounded /> } variant="contained" fullWidth onClick={ onSave } disabled={ inputValue.length <= 3 }>
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

            </Grid>

            <IconButton size="large" sx={{ position: 'fixed', bottom: 30, right: 30, backgroundColor: 'error.dark' }}>
                <DeleteForeverRounded />
            </IconButton>

        </Layout>
    )
}



export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById( id )

    if( !entry ){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage