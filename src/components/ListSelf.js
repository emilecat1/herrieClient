import { Paper, Typography, Stack, Box } from '@mui/material';
import placeholder from '../assets/Iplaceholder.jpeg';

const ListSelf = () => {
    return (
        <>
            <Stack direction="row" justifyContent="center" sx={{mt:5}} >
                <Paper elevation={1} sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                    <Box sx={{ml:3}}>
                        <img src={placeholder} alt="placeholder" width={'70px'}></img>
                    </Box>
                    <Stack sx={{ml:3}}>
                        <Typography sx={{ fontSize: 30, color: 'primary.main' }}>Lijst 1</Typography>
                        <Typography>73-C97C8</Typography>
                    </Stack>
                </Paper>
            </Stack>
        </>
    );
}

export default ListSelf;