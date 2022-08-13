import {  GlobalStyles, Typography, Stack, IconButton } from "@mui/material";
import ListItem from '../components/ListItem.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const ListPage = () => {

    



    return ( 
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Stack direction="row">
                <IconButton component={Link} to="/List" color="primary" aria-label="profile" >
                    <ArrowBackIcon sx={{ mt:6, fontSize: 30 }} />
                </IconButton>
                <Typography variant="h2" sx={{ mt: 7 }}>lijstnaam</Typography>
                <IconButton component={Link} to="/AddListItem" color="secondary" aria-label="add"  >
                    <AddBoxIcon sx={{ mt: 5, fontSize: 40 }} />
                </IconButton>
            </Stack>



            <Stack spacing={1} sx={{ maxHeight: 640, overflow: 'auto' }}>
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                
            </Stack>
        </>
     );
}
 
export default ListPage;