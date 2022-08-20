import { Paper, Typography, Stack, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import placeholder from '../assets/Iplaceholder.jpeg';

const SearchItem = ({ item }) => {

    



    if (item) {

        let reserved;
        if (item !== undefined) {
            reserved = item.attributes.isReserved;
        }

        return (
            <>
                <Stack direction="row" justifyContent="center" sx={{ mt: 5 }} >
                    <IconButton component={Link} to={`/SearchDetail/${item.id}`} aria-label="delete">
                        <Paper elevation={1} sx={{ width: 300, height: 100, display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                            <Box sx={{ ml: 3 }}>
                             { item.attributes.imgPath === null ?  <img src="https://res.cloudinary.com/ddinuqloh/image/upload/v1660836557/lijstjestijd/present-gift_jczbd5.gif" alt="placeholder" width={'70px'}></img> : <img src={item.attributes.imgPath} alt="placeholder" width={'70px'}></img> }
                            </Box>
                              <Stack alignItems="flex-end" sx={{ ml: 3, minWidth:170, mr:2 }}>

                                <Typography noWrap sx={{ fontSize: 20, color: 'primary.main'}}>{item.attributes.productName}</Typography>
                                <Typography>€ {item.attributes.price}</Typography>

                                {reserved ? <Typography sx={{color: "secondary.main"}}>gereserveerd!</Typography> :  <Typography noWrap sx={{color: "red.main"}}>niet gereserveerd!</Typography> }

                            </Stack>
                        </Paper>
                    </IconButton>
                </Stack>
            </>
        );


    }
}

export default SearchItem;