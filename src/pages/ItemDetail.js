import { GlobalStyles, Paper, Typography, Stack, Alert, CircularProgress, Button, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import placeholder from '../assets/Iplaceholder.jpeg';

const backendURL = process.env.REACT_APP_BACKEND_URL;

const ItemDetail = () => {

    const { id } = useParams();
    console.log(id)


    const { isLoading, error, data: item } = useQuery(["items", id], async () => {
        const data = await fetch(`${backendURL}/api/items/${id}?populate=*`).then(r => r.json());
        console.log(data);
        return data;
    });


    if (isLoading) {
        return <CircularProgress />
    };

    if (error) {
        return <Alert severity="error">Something went wrong</Alert>
    };


    if (item) {
        console.log(item.data.attributes.image.data.attributes.url);

        return (


            <>

                <GlobalStyles
                    styles={{ body: { backgroundColor: "#eafcf7" }, }}
                />



                <Stack>
                    <Stack direction="row" justifyContent="space-between" sx={{ mt: 5, ml: 4, mr: 4 }}>
                        <Button sx={{ color: 'red.main', fontSize: 25 }} variant="text">Verwijder</Button>
                        <Button sx={{ fontSize: 25 }} variant="text">Klaar</Button>
                    </Stack>
                    <Stack alignItems="center">
                        <Box sx={{ mt: 3 }}>
                            <img src={item.data.attributes.image.data.attributes.url} alt="placeholder" width={'100px'}></img>
                        </Box>
                    </Stack>
                    <Stack sx={{ ml: 2, mr: 2 }}>
                        <Typography sx={{ mt: 3, mb: 1 }} variant="h2nalf">Product naam</Typography>
                        <Paper>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.productName}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Prijs</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.price}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Aantal</Typography>
                        <Paper sx={{ maxWidth: 160 }}>
                            <Typography sx={{ mt: 1, ml: 2, mb: 1 }} variant="h3">{item.data.attributes.amount}</Typography>
                        </Paper>

                        <Typography sx={{ mt: 2, mb: 1 }} variant="h2nalf">Omschrijving</Typography>
                        <Paper sx={{ minHeight: 150 }}>
                            <Typography sx={{ mt: 2, ml: 2, mr: 2, mb: 1 }} variant="h3">{item.data.attributes.description} </Typography>
                        </Paper>

                    </Stack>

                </Stack>


            </>
        );

    }

}


export default ItemDetail;