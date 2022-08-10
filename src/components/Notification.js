import { Paper, Typography, Stack } from '@mui/material';

const Notification = () => {
    return (
        <>
            <Stack sx={{alignItems:'center'}}>
                <Paper elevation={1} sx={{ width: '90vw', height: 130, display: 'flex', justifyContent: 'center', flexDirection: 'column',  }} >
                    <Stack>
                        <Typography sx={{color: "primary.main", ml: 2, mr: 2, mt:5 }} >Iemand heeft 1 of meerdere items van je lijstje 'lijst1' gereserveerd!</Typography>
                        <Typography sx={{ color: "primary.main", ml: 2, mr: 2, mt:2, mb:5 }}> Vandaag </Typography>
                    </Stack>
                </Paper>
            </Stack>

        </>
    );
}

export default Notification;