import { GlobalStyles, Container, Stack, Typography, IconButton } from "@mui/material";
import Nav from '../components/Nav.js';
import ListSelf from '../components/ListSelf.js';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';


const Pinned = () => {



    return (
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />


            <Container>
                <Stack direction="row" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 5 }}>
                        <Typography component="h1" variant="h6" sx={{ fontWeight: "medium", fontSize: 85, color: "primary.main" }} >2</Typography>
                        <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main", lineHeight: "35px" }} >Bewaarde lijstjes</Typography>
                    </Stack>
                    <IconButton component={Link} to="/LijstBewaren" color="secondary" aria-label="add"  >
                        <AddBoxIcon sx={{ mt: 5, fontSize: 60 }} />
                    </IconButton>
                </Stack>

                <Stack spacing={2} sx={{mb: 15}}>
           
                        <ListSelf />
                        <ListSelf />
                        <ListSelf />
                        <ListSelf />
                        <ListSelf />
                        <ListSelf />
                        <ListSelf />
                        <ListSelf />
                 
                </Stack>




            </Container>
            <Nav />
        </>
    );

}

export default Pinned;