import { Paper, Typography, Stack, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import placeholder from '../assets/Iplaceholder.jpeg';

const ListSelf = () => {
    return (
        <>
            <Stack direction="row" justifyContent="center" sx={{ mt: 1 }} >
                <IconButton component={Link} to="/ListPage" aria-label="delete">
                <Paper elevation={1} sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                    <Box sx={{ ml: 3 }}>
                        <img src={placeholder} alt="placeholder" width={'70px'}></img>
                    </Box>
                    <Stack sx={{ ml: 3 }}>
                        <Typography sx={{ fontSize: 30, color: 'primary.main' }}>Lijst 1</Typography>
                        <Typography>73-C97C8</Typography>
                    </Stack>
                </Paper>
            </IconButton>
        </Stack>
        </>
    );
}

export default ListSelf;