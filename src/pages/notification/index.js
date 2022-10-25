import { useState, useEffect } from 'react';
import axios from 'axios';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

// project import
import OrdersTable from './OrdersTable';
import MainCard from 'components/MainCard';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [userFeedback, setUserFeedback] = useState([]);

    const GetCommentsFromContactUs = () => {
        let query = `query {
            contactUs {
              email
              id
              message
              name
              created_at
            }
          }`

        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            // if(res.data?.data?.contactUs) {
            setUserFeedback(res.data?.data?.contactUs)
            // }
        }).catch((err) => {
            console.log(err)
            console.log(err.response?.data)
        })
    }

    useEffect(()=>{
        GetCommentsFromContactUs()
    },[])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>

            {/* row 3 */}
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Users Feedbacks</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable orderedBooks={userFeedback} />
                </MainCard>
            </Grid>

        </Grid>
    );
};

export default DashboardDefault;
