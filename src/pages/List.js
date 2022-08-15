import { GlobalStyles, Container, Stack, Typography, IconButton, Alert, CircularProgress } from "@mui/material";
import { useQuery } from 'react-query';
import Nav from '../components/Nav.js';
import ListSelf from '../components/ListSelf.js';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Link } from 'react-router-dom';
import { useStore } from '../store';


const backendURL = process.env.REACT_APP_BACKEND_URL;

const List = () => {

    const username = useStore(state => state.username);

    console.log("Hello World");



    //  const { isLoading, error, data: lists } = useQuery(["lists"], async () => {
    //      const data = await fetch(`${backendURL}/api/lists?populate=*`).then(r => r.json());
    //      console.log(data, 'halloooooooo');
    //      return data;
    //  });

     const { isLoading, error, data: lists } = useQuery(["users"], async () => {
         const data = await fetch(`${backendURL}/api/users/?filters[username][$eq]=${username}&populate=*`).then(r => r.json());
         console.log(data[0].lists, 'listusers');
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

                         {lists && <Typography component="h1" variant="h6" sx={{ fontWeight: "medium", fontSize: 85, color: "primary.main" }} >{Object.keys(lists[0].lists).length}</Typography>} 



                        <Typography component="h1" variant="h6" sx={{ fontWeight: "normal", fontSize: 40, color: "primary.main" }} >Lijstjes</Typography>
                    </Stack>
                    <IconButton component={Link} to="/AddList" color="secondary" aria-label="add"  >
                        <AddBoxIcon sx={{ mt: 5, fontSize: 60 }} />
                    </IconButton>
                </Stack>

                <Stack spacing={2} sx={{ mb: 15 }}>

                    {/* {lists && <Typography> {(lists.data[0].attributes.name)}</Typography>}  */}

                    <Stack spacing={1} sx={{ flex: 1, maxHeight: 550, overflow: 'auto' }}>

                        {isLoading && <CircularProgress />}
                        {error && <Alert severity="error">Something went wrong</Alert>}



                         {lists && lists[0].lists.map(list => <ListSelf key={list.id} list={list} />)} 

                    </Stack>


                </Stack>




            </Container>
            <Nav />
        </>
    );

}

export default List;