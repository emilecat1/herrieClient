import { Button, GlobalStyles, Typography, Stack, IconButton } from "@mui/material";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useStore } from '../store';
import { Link } from 'react-router-dom';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const LoginPage = () => {

    const isLoggedIn = useStore(state => state.isLoggedIn);
    const username = useStore(state => state.username);
    const logout = useStore(state => state.logout);
    return (

        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Stack direction="row" justifyContent="center">
                <Stack direction="row" sx={{ ml: 2, mr: 2, mt: 15 }}>
                    <Typography component="h1" variant="h6" sx={{ fontWeight: "bold", fontSize: 30, color: "primary.main" }} >LIJSTJES</Typography>
                    <Typography component="h1" variant="h6" sx={{ fontWeight: "light", fontSize: 30, color: "primary.main" }} >TIJD</Typography>
                </Stack>
            </Stack>

            {isLoggedIn ? (
                <>
                    {username}
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </>
            ) : (


                <Stack alignItems="flex-end" sx={{ maxWidth: 300 }}>
                    <Button sx={{ minWidth: '200px', maxWidth: '250px', mt: 5 }} variant="contained" component="a" href={`${backendURL}/api/connect/google`}>Login</Button>
                </ Stack>


            )}
        </>
    );
}

export default LoginPage;