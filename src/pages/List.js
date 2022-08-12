import { GlobalStyles, Container, Stack, Typography, IconButton, Alert, CircularProgress  } from "@mui/material";
import { useQuery } from 'react-query';
import Nav from '../components/Nav.js';
import ListSelf from '../components/ListSelf.js';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';


const List = () => {

    console.log("Hello World");


   


    const { isLoading, error, data: lists } = useQuery(["lists"], async () => {
        const data = await fetch("http://localhost:1337/api/lists?populate=*").then(r => r.json());
        console.log(data);
        return data;
    });


   
 



 

    

    

    return (
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            

           
            <Container>
                <Stack direction="row" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ ml: 2, mr: 2, mt: 5 }}>
                        <Typography component="h1" variant="h6" sx={{ fontWeight: "medium", fontSize: 85, color: "primary.main" }} >2</Typography>
                        <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main" }} >Lijstjes</Typography>
                    </Stack>
                    <IconButton component={Link} to="/AddList" color="secondary" aria-label="add"  >
                        <AddBoxIcon sx={{mt:5, fontSize: 60 }} />
                    </IconButton>
                </Stack>

                {isLoading && <CircularProgress />}
                {error && <Alert severity="error">Something went wrong</Alert>}
                {error && console.log(error)}
              
                <Stack spacing={2} sx={{mb: 15}}>
              
                      


                </Stack>

                

               
            </Container>
            <Nav />
        </>
    );

}

export default List;