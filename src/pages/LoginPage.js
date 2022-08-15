import { Button, GlobalStyles, Container, Stack, Paper } from "@mui/material";
import { useStore } from '../store';

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

            {isLoggedIn ? (
                <>
                    {username}
                    <Button color="inherit" onClick={logout}>Logout</Button>
                </>
            ) : (
                <Button color="inherit" component="a" href={`${backendURL}/api/connect/google`}>Login</Button>
            )}
        </>
     );
}
 
export default LoginPage;