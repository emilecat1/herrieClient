import { Paper, Typography, Stack, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import placeholder from '../assets/Iplaceholder.jpeg';

const ListItem = () => {
    return (
        <>
            <Stack direction="row" justifyContent="center" sx={{ mt: 5 }} >
                <IconButton component={Link} to="/ListPage" aria-label="delete">
                    <Paper elevation={1} sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                        <Box sx={{ ml: 3 }}>
                            <img src={placeholder} alt="placeholder" width={'70px'}></img>
                        </Box>
                        <Stack alignItems="flex-end" sx={{ ml: 3 }}>
                       
                            <Typography noWrap sx={{ fontSize: 20, color: 'primary.main', width: 170 }}>Productnaam van bol</Typography>
                            <Typography>€ 16,23</Typography>
                        
                        </Stack>
                    </Paper>
                </IconButton>
            </Stack>
        </>
    );
}

export default ListItem;