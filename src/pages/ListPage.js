import { GlobalStyles, Typography, Stack, IconButton, CircularProgress, Alert } from "@mui/material";
import ListItem from '../components/ListItem.js';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from 'react-router-dom';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoadingButton from '@mui/lab/LoadingButton';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStore } from '../store'


const backendURL = process.env.REACT_APP_BACKEND_URL;

const ListPage = () => {

    const { id } = useParams();



    const { isLoading, error, data: list } = useQuery(["lists", id], async () => {
        const data = await fetch(`${backendURL}/api/lists/${id}?populate=*`).then(r => r.json());
        console.log(data);
        return data;
    });


    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const jwt = useStore(state => state.jwt)

    const defaultValues = {
        items: { id }
    };

    const { handleSubmit, formState: { errors }, register, reset } = useForm({ defaultValues });


    const deleteList = async (data) => {
        return await fetch(`${backendURL}/api/lists/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            body: JSON.stringify(data),

        })
            .then(console.log(data))
            .then(r => r.json());
    }

    const deleteMutation = useMutation(deleteList, {
        onSuccess: () => {
            console.log("success")
            queryClient.invalidateQueries('lists');
            reset()
        },
    })

    const onSubmit = data => {
        deleteMutation.mutate({ data })

        navigate('/list')
    }

   

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

                <Stack as="form" noValidate onSubmit={handleSubmit(onSubmit)} direction="row" justifyContent="center" sx={{ mt: 5, ml: 4, mr: 4 }}>
                    <LoadingButton
                        sx={{ backgroundColor: 'red.main', fontSize: 20 }}
                        // loading={deleteMutation.isLoading}
                        variant="contained"
                    
                        loadingIndicator="Adding list"
                        type="submit"
                    >
                        Verwijder lijst
                    </LoadingButton>
                </Stack>
            </>
        );
    }
}

export default ListPage;