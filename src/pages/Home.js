import Nav from '../components/Nav.js';
import Notification from '../components/Notification.js';
import { Button, GlobalStyles, Container, Stack, Paper, Alert, CircularProgress } from "@mui/material";
import { Typography } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import blog from '../assets/blog.jpeg';
import { useQuery } from 'react-query';
import { useStore } from '../store';

const backendURL = process.env.REACT_APP_BACKEND_URL;



const Home = () => {

    

    const isLoggedIn = useStore(state => state.isLoggedIn);
    const username = useStore(state => state.username);
    const logout = useStore(state => state.logout);

    // const { isLoading, error, data: lists } = useQuery(["lists"], async () => {
    //     const data = await fetch(`${backendURL}/api/lists?populate=*`).then(r => r.json());   
    //     console.log(data);
    //     return data;
    // });

    // const { isLoading, error, data: users } = useQuery(["users"], async () => {
    //     const data = await fetch(`${backendURL}/api/users/?populate=*`).then(r => r.json());
    //     console.log(data, 'homusers');
    //     return data;
    // });

    const { isLoading, error, data: users } = useQuery(["users"], async () => {
        const data = await fetch(`${backendURL}/api/users/?filters[username][$eq]=${username}&populate=*`).then(r => r.json());
        console.log(data[0].id, 'userid');
        console.log(data[0].lists, 'homusers');
        return data;
    });

    console.log(users);

    if (isLoading) {
        return <CircularProgress />
    };

    if (error) {
        return <Alert severity="error">Something went wrong</Alert>
    };

// refresh page once --> couldn't add lists or items (401 unauthorized) --> authorized after refresh voor een of andere reden
     if(!window.location.hash) {
	 	window.location = window.location + '#loaded';
	 	window.location.reload();
	 }

    if (users[0]) {
  

        return (
            <>

                <GlobalStyles
                    styles={{ body: { backgroundColor: "#eafcf7" }, }}
                />


                <Container>

                    <Stack direction="row" justifyContent="center">
                        <Stack direction="row" sx={{ ml: 2, mr: 2, mt: 5 }}>
                            <Typography component="h1" variant="h6" sx={{ fontWeight: "bold", fontSize: 30, color: "primary.main" }} >LIJSTJES</Typography>
                            <Typography component="h1" variant="h6" sx={{ fontWeight: "light", fontSize: 30, color: "primary.main" }} >TIJD</Typography>
                        </Stack>
                        <IconButton component={Link} to="/Profile" color="primary" aria-label="profile" >
                            <AccountCircleOutlinedIcon sx={{ mt: 5, fontSize: 30 }} />
                        </IconButton>
                    </Stack>

                    <Stack direction="row" justifyContent="center" spacing={3} sx={{ mt: 5 }} >
                        <Button component={Link} to="/Reservations" variant="contained" color="light" sx={{ maxWidth: '160px', minWidth: '160px', minHeight: '100px', borderRadius: 2.5 }}>
                            <Stack alignItems="center">
                                <Typography sx={{ fontSize: 30 }}> 4 </Typography>
                                <Typography sx={{ fontSize: 20 }}> Reservaties </Typography>
                            </Stack>
                        </Button>
                        <Button component={Link} to="/List" variant="contained" color="light" sx={{ maxWidth: '160px', minWidth: '160px', minHeight: '100px', borderRadius: 2.5 }}>
                            <Stack alignItems="center">
                                {users[0] && <Typography sx={{ fontSize: 30 }}> {Object.keys(users[0].lists).length} </Typography>}
                                <Typography sx={{ fontSize: 20 }}> Lijstjes </Typography>
                            </Stack>
                        </Button>
                    </Stack>

                    <Stack alignItems="center" sx={{ mt: 5 }} >
                        <a href="https://lijstjestijd.be/blog/onze-vakantie-ging-van-%e2%9b%b1%ef%b8%8f%e2%98%80%ef%b8%8fnaar-%f0%9f%8d%b2%e2%9b%ba-tips-dicht-bij-huis/">
                            <Paper sx={{ minWidth: '340px', pt: 2 }} >
                                <Stack alignItems="center">
                                    <img src={blog} alt="placeholder" width={'320px'} height={'150px'}></img>
                                    <Typography sx={{ mb: 2, mt: 2 }}> Onze vakantie ging van 🏖️ ☀️ naar... </Typography>
                                </Stack>

                            </Paper>
                        </a>

                    </Stack>


                    <Stack sx={{ mt: 5 }}>
                        <Typography component="h2" variant="h2" sx={{ mb: 2 }}> Notificaties </Typography>
                        <Stack spacing={2} sx={{ mb: 15, maxHeight: 420, overflow: 'auto' }}>
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

}

export default Home;