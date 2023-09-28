import { createContext } from 'react';
import { Entry } from '@/interfaces';


export interface EntriesContextProps {
    entries: Entry[]
    addNewEntry: (description: string) => void
    updateEntry: (entry: Entry, showSnakbar?: boolean) => void
}


export const EntriesContext = createContext({

} as EntriesContextProps)