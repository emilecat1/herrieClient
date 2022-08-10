import Nav from '../components/Nav.js';
import Notification from '../components/Notification.js';
import { Button, GlobalStyles, Container, Stack } from "@mui/material";
import { Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';



const Home = () => {



    return (
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Container>

                <Stack direction="row" justifyContent="center">
                    <Stack direction="row" sx={{ ml: 2, mr: 2, mt: 5}}>
                        <Typography component="h1" variant="h6" sx={{ fontWeight: "bold", fontSize: 30, color: "primary.main"}} >LIJSTJES</Typography>
                        <Typography component="h1" variant="h6" sx={{ fontWeight: "light", fontSize: 30, color: "primary.main" }} >TIJD</Typography>
                    </Stack>
                    <IconButton component={Link} to="/Profile" color="primary" aria-label="profile" >
                        <AccountCircleOutlinedIcon sx={{ mt: 5, fontSize: 30 }} />
                    </IconButton>
                </Stack>

                <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 5 }} >
                    <Button component={Link} to="/about" variant="contained" color="light" sx={{ maxWidth: '160px', minWidth: '160px', minHeight: '100px', borderRadius: 2.5 }}>
                        <Stack alignItems="center">
                            <Typography sx={{ fontSize: 30 }}> 1 </Typography>
                            <Typography sx={{ fontSize: 20 }}> Reservaties </Typography>
                        </Stack>
                    </Button>
                    <Button component={Link} to="/List" variant="contained" color="light" sx={{ maxWidth: '160px', minWidth: '160px', minHeight: '100px', borderRadius: 2.5 }}>
                        <Stack alignItems="center">
                            <Typography sx={{ fontSize: 30 }}> 1 </Typography>
                            <Typography sx={{ fontSize: 20 }}> Lijstjes </Typography>
                        </Stack>
                    </Button>
                </Stack>
                <Stack sx={{ mt: 5 }}>
                    <Typography component="h2" variant="h2" sx={{ mb: 2 }}> Notificaties </Typography>
                    <Stack spacing={2} sx={{ mb: 15 }}>
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                        <Notification />
                    </Stack>

                </Stack>





                <Nav />
            </Container>

        </>
    );

}

export default Home;