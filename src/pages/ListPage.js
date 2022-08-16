import { GlobalStyles, Typography, Stack, IconButton, CircularProgress, Alert } from "@mui/material";
import ListItem from '../components/ListItem.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useQuery } from "react-query";

const backendURL = process.env.REACT_APP_BACKEND_URL;

const ListPage = () => {

    const { id } = useParams();



    const { isLoading, error, data: list } = useQuery(["lists", id], async () => {
        const data = await fetch(`${backendURL}/api/lists/${id}?populate=*`).then(r => r.json());
        console.log(data);
        return data;
    });

   

    if (isLoading) {
        return <CircularProgress />
    };

    if (error) {
        return <Alert severity="error">Something went wrong</Alert>
    };

    const items = list.data.attributes.items;

    if (list) {
        console.log(items.data);



        return (
            <>
                <GlobalStyles
                    styles={{ body: { backgroundColor: "#eafcf7" }, }}
                />

                {isLoading && <CircularProgress />}
                {error && <Alert severity="error">Something went wrong</Alert>}

                <Stack direction="row">
                    <IconButton component={Link} to="/List" color="primary" aria-label="profile" >
                        <ArrowBackIcon sx={{ mt: 6, fontSize: 30 }} />
                    </IconButton>
                    <Typography variant="h2" sx={{ mt: 7 }}>{list.data.attributes.name}</Typography>
                    <IconButton component={Link} to="/AddItem" color="secondary" aria-label="add"  >
                        <AddBoxIcon sx={{ mt: 5, fontSize: 40 }} />
                    </IconButton>
                </Stack>



                <Stack spacing={1} sx={{ maxHeight: 640, overflow: 'auto' }}>


                    <ListItem/>

                     {list && items.data.map(item => <ListItem key={item.id} item={item} />)}

                </Stack>
            </>
        );
    }
}

export default ListPage;