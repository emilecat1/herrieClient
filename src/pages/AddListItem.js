import { GlobalStyles, TextField, Stack, Typography, Button, IconButton, } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const AddListItem = () => {
    return (
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Stack sx={{ ml: 5, mt: 5 }}>
                <Stack direction="row">
                    <IconButton component={Link} to="/ListPage" color="primary" aria-label="profile" >
                        <ArrowBackIcon sx={{ fontSize: 30 }} />
                    </IconButton>

                    <Typography sx={{mt: 1}} component="h1" variant="h1">Item toevoegen</Typography>
                </Stack>
                <Stack sx={{ mt: 5 }}>
                    <Typography variant="h2">1. van het internet</Typography>
                    <Typography sx={{ mt: 2 }} variant="h3">Kopieer het webadres van het artikel in het tekstvak hieronder en klik op gaan.</Typography>

                    <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" label="" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                    <Stack alignItems="flex-end" sx={{ maxWidth: 300 }}>
                        <Button type="submit" variant="contained" sx={{ maxWidth: '100px', mt: 5 }}>Submit</Button>
                    </Stack>
                </Stack>

                <Stack sx={{ mt: 4 }}>
                    <Typography variant="h2">2. manueel</Typography>
                    <Typography sx={{ mt: 2 }} variant="h3">Geef de naam van het artikel in dat je wil toevoegen en klik op gaan.</Typography>
                    <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                    <Stack alignItems="flex-end" sx={{ maxWidth: 300 }}>
                        <Button type="submit" variant="contained" sx={{ maxWidth: '100px', mt: 5 }}>Submit</Button>
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default AddListItem;