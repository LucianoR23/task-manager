import { ChangeEvent, useState, useContext } from 'react';
import { AddCircleRounded, SaveRounded } from "@mui/icons-material"
import { Box, Button, TextField } from "@mui/material"
import { EntriesContext, UIContext } from '@/context';


export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext )

    const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )

    const [inputValue, setInputValue] = useState('')

    const [touched, setTouched] = useState( false )

    const onTextChange = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value )
    }

    const onSave = () => {
        if( inputValue.length === 0 ) return

        addNewEntry( inputValue )
        setIsAddingEntry( false )
        setTouched( false )
        setInputValue('')

    }

    return (
        <Box sx={{ mb: 2, paddingX: 2 }}>

            {
                isAddingEntry ? (
                    <>
                        <TextField value={ inputValue } onChange={ onTextChange } fullWidth sx={{ mt: 1, mb: 1 }} placeholder="New entry" autoFocus multiline label='New entry' helperText={ inputValue.length <= 0 && touched && 'Enter a new value' } error={ inputValue.length <= 0 && touched } onBlur={ () => setTouched( true ) } />

                        <Box display='flex' justifyContent='space-around'>

                            <Button onClick={ () => setIsAddingEntry( false ) } variant="text" color="error">
                                Cancel
                            </Button>
                            
                            <Button onClick={ onSave } variant="outlined" color="secondary" endIcon={ <SaveRounded /> }>
                                Save
                            </Button>

                        </Box>
                    </>
                )
                : (
                    <Button onClick={ () => setIsAddingEntry( true ) } startIcon={ <AddCircleRounded /> } fullWidth variant="outlined">
                        Add new task
                    </Button>
                )
            }
        </Box>
    )
}
