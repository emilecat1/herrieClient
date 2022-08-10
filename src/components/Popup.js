import { Paper, Typography, Stack, TextField, Button } from '@mui/material';

const Popup = () => {
    return (

        <>
            <Stack alignItems="center" sx={{mt:25}}>
                <Paper sx={{ maxWidth: 350, minWidth: 350, minHeight: 280 }}>
                    <Stack sx={{mt:5, ml:2}}>
                        <Typography variant="h1">Lijstje maken</Typography>
                        <TextField sx={{ mt: 4, maxWidth: 300 }} id="filled-basic" label="lijst naam" variant="filled" onChange={(e) => this.handleTextFieldChange(e)} />
                        <Button sx={{ maxWidth: 300, mt: 4, }} variant="contained" color="secondary" textColor="white">submit</Button>
                    </Stack>
                </Paper>
            </Stack>
        </>

    );
}

export default Popup;