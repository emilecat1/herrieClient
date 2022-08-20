import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#266a85',
        },
        secondary: {
            main: '#66bb6a',
        },
        succes: {
            main: '#66bb6a',
        },
        background: {
            main: '#eafcf7',
            darker: '#CBF5E9',
        },
        light: {
            main: '#FFFFFF',
        },
        red: {
            main: '#fa3434',
            softer: '#fd9b9b'
        },
        grey: {
            main: '#d3d3d3'
        }

    },

    shape: {
        borderRadius: 2.5,
    },

    typography: {
        button: {
            textTransform: 'none'
        },
        h1: {
            fontSize: 28,
            color: '#266a85',
            fontWeight: 'medium'
        },
        h2: {
            fontSize: 26,
            color: '#266a85',
            fontWeight: 'normal'
        },
        h2nalf: {
            fontSize: 22,
            color: '#266a85',
            fontWeight: 'normal'
        },
        h3plus: {
            fontSize: 18,
            color: '#266a85',
            fontWeight: 'normal'
        },
        h3: {
            fontSize: 16,
            color: '#266a85',
            fontWeight: 'normal'
        },
    }
});

export default theme;