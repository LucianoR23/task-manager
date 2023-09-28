import { FC, ReactNode, useReducer } from "react"
import { UIContext, uiReducer } from "../"
import { stat } from "fs"


export interface UIState {
    sideMenuOpen: boolean
    isAddingEntry: boolean
    isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
}

interface Props {
    children: ReactNode
}

export const UIProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE )

    const openCloseSideMenu = () => 
        state.sideMenuOpen 
        ? dispatch({ type: 'UI - Close Sidebar' })
        : dispatch({ type: 'UI - Open Sidebar' });

    const setIsAddingEntry = ( isAdding: boolean ) => {
        dispatch({ type: 'UI - Adding Entry', payload: isAdding })
    }

    const startDragging = () => {
        dispatch({ type: 'UI - Start Dragging' })
    }

    const endDragging = () => {
        dispatch({ type: 'UI - End Dragging' })
    }

    return (
        <UIContext.Provider value={{ ...state, openCloseSideMenu, setIsAddingEntry, startDragging, endDragging }}>
            { children }
        </UIContext.Provider>
    )
}