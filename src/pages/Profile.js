import { GlobalStyles, TextField, Stack, Typography, Button } from "@mui/material";

const Profile = () => {
    return (
        <>
            <GlobalStyles
                styles={{ body: { backgroundColor: "#eafcf7" }, }}
            />

            <Stack sx={{minWidth: 300}} alignItems="flex-end">
                <Button sx={{maxWidth: 90, mr: 5, mt:5}} variant="contained">Klaar</Button>
            </Stack>

            <Stack sx={{ml:5, mt:5}}>
                <Typography component="h1" variant="h2">Profiel</Typography>
                <Stack sx={{mt:5}}>
                    <Typography variant="h3">Email</Typography>
                    <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" label="emile.catteeuw3@gmail.com" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                </Stack>
                <Stack sx={{ mt:4 }}>
                    <Typography variant="h3">Naam</Typography>
                    <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" label="emile" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                </Stack>
                <Stack sx={{ mt: 4 }}>
                    <Typography variant="h3">Adres</Typography>
                    <TextField sx={{ mt: 2, maxWidth: 300 }} id="filled-basic" label="Haiglaan" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                </Stack>
                <Stack direction="row" justifyContent="space-between" sx={{maxWidth: 300}}>
                    <Stack sx={{ mt: 4 }}>
                        <Typography variant="h3">Postcode</Typography>
                        <TextField sx={{ mt: 2, maxWidth: 130 }} id="filled-basic" label="8900" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                    </Stack>
                    <Stack sx={{ mt: 4 }}>
                        <Typography variant="h3">Stad</Typography>
                        <TextField sx={{ mt: 2, maxWidth: 130 }} id="filled-basic" label="Ieper" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                    </Stack>
                </Stack>
                <Stack sx={{ minWidth: 300 }} alignItems="center">
                    <Button sx={{ maxWidth: 90, mr: 5, mt: 5 }} variant="contained">Afmelden</Button>
                </Stack>
            </Stack>
        </>
    );
}

export default Profile;