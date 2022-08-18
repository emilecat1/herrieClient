import { Paper, Typography, Stack, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import placeholder from '../assets/Iplaceholder.jpeg';

const ListSelf = ({ list }) => {

   

    console.log(list , "check");



    return (
        <>
            <Stack direction="row" justifyContent="center" sx={{ mt: 1 }} >
                <IconButton component={Link} to={`/ListDetail/${list.id}`} aria-label="delete">
                    <Paper elevation={1} sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                        <Box sx={{ ml: 3 }}>
                            <img src={placeholder} alt="placeholder" width={'70px'}></img>
                        </Box>
                        <Stack alignItems="flex-end" sx={{ ml: 3, width: 170 }}>
                            <Typography noWrap sx={{ fontSize: 30, color: 'primary.main', width: 170 }}>{list.name}</Typography>
                            <Typography sx={{ mr: 4 }}>Lijstcode: {list.id}</Typography>
                        </Stack>
                    </Paper>
                </IconButton>
            </Stack>
        </>
    );
}

export default ListSelf;