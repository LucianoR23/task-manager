import { blueGrey, grey, indigo } from '@mui/material/colors';
import { createTheme, ThemeOptions } from '@mui/material/styles';

export const darkTheme: ThemeOptions = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: indigo[500],
        },
        secondary: {
            main: blueGrey[500],
        },
        background: {
            default: grey[900]
        },
    },
}
)