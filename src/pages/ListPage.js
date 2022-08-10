import { Button, GlobalStyles, Typography, Stack, IconButton } from "@mui/material";
import ListItem from '../components/ListItem.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
const ListPage = () => {
    return ( 
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Stack direction="row">
                <IconButton component={Link} to="/List" color="primary" aria-label="profile" >
                    <ArrowBackIcon sx={{ mt:5, fontSize: 30 }} />
                </IconButton>
                <Typography variant="h2" sx={{mt:5.5}}>Lijst 1</Typography>
                <IconButton component={Link} to="/AddList" color="secondary" aria-label="add"  >
                    <AddBoxIcon sx={{ mt: 5, fontSize: 60 }} />
                </IconButton>
            </Stack>



            <Stack spacing={1}>
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