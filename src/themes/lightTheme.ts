import { cyan, indigo, lightBlue } from '@mui/material/colors';
import { ThemeOptions, createTheme } from '@mui/material/styles';

export const lightTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: lightBlue.A700,
        },
        secondary: {
            main: cyan[300],
        },
        background: {
            default: indigo[100],
            paper: indigo[50],
        },
    },
})