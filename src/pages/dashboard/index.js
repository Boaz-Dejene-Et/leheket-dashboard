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
import IncomeAreaChart from './IncomeAreaChart';
import MonthlyBarChart from './MonthlyBarChart';
import ReportAreaChart from './ReportAreaChart';
import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// assets
import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
    width: 36,
    height: 36,
    fontSize: '1rem'
};

// action style
const actionSX = {
    mt: 0.75,
    ml: 1,
    top: 'auto',
    right: 'auto',
    alignSelf: 'flex-start',
    transform: 'none'
};

// sales report status
const status = [
    {
        value: 'today',
        label: 'Today'
    },
    {
        value: 'month',
        label: 'This Month'
    },
    {
        value: 'year',
        label: 'This Year'
    }
];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    const [value, setValue] = useState('today');
    const [slot, setSlot] = useState('week');
    const [orderedBooks, setOrderedBooks] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalOrderedBooks, setTotalOrderedBooks] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);
    const [supportButton, setSupportButton] = useState(false)

    const GetOrders = () => {
        const query = `query MyQuery {
            orders {
              amount
              created_at
              deliveryOption
              id
              paymentMethod
              updated_at
              totalBooks
              user {
                name
              }
            }
            orders_aggregate {
              aggregate {
                count
              }
            }
            user_aggregate {
              aggregate {
                count
              }
            }
            orderedBooks_aggregate {
              aggregate {
                count
              }
            }
            books_aggregate {
              aggregate {
                count
              }
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
            // if(res.data?.data?.orders) {
                setOrderedBooks(res.data?.data?.orders)
                setTotalOrders(res.data?.data?.orders_aggregate?.aggregate?.count)
                setTotalOrderedBooks(res.data?.data?.orderedBooks_aggregate?.aggregate?.count)
                setTotalUsers(res.data?.data?.user_aggregate?.aggregate?.count)
                setTotalBooks(res.data?.data?.books_aggregate?.aggregate?.count)
            // }
        }).catch((err) => {
            console.log(err)
            console.log(err.response?.data)
        })
    }

    useEffect(()=>{
        GetOrders()
    },[])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            {/* row 1 */}
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count={totalUsers} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Orders" count={totalOrders} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Ordered Books" count={totalOrderedBooks} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Books" count={totalBooks} />
            </Grid>

            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

            {/* row 3 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Recent Orders</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <OrdersTable orderedBooks={orderedBooks} />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Transaction History</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <List
                        component="nav"
                        sx={{
                            px: 0,
                            py: 0,
                            '& .MuiListItemButton-root': {
                                py: 1.5,
                                '& .MuiAvatar-root': avatarSX,
                                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
                            }
                        }}
                    >
                        {orderedBooks.map((item, index) => {
                            return (
                                <ListItemButton divider key={index}>
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                color: 'success.main',
                                                bgcolor: 'success.lighter'
                                            }}
                                        >
                                            <GiftOutlined />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={<Typography variant="subtitle1">Order #{item.id.slice(0, 8)}</Typography>} secondary={item.created_at.slice(0, 10)} />
                                    <ListItemSecondaryAction>
                                        <Stack alignItems="flex-end">
                                            <Typography variant="subtitle1" noWrap>
                                                + ${item.amount}
                                            </Typography>
                                            {/* <Typography variant="h6" color="secondary" noWrap>
                                                78%
                                            </Typography> */}
                                        </Stack>
                                    </ListItemSecondaryAction>
                                </ListItemButton>
                            )
                        })}
                    </List>
                </MainCard>
                <MainCard sx={{ mt: 2 }}>
                    <Stack spacing={3}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Grid item>
                                <Stack>
                                    <Typography variant="h5" noWrap>
                                        Help {"&"} Support Chat
                                    </Typography>
                                    <Typography variant="caption" color="secondary" noWrap>
                                        Typical replay within 5 min
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                                    <Avatar alt="Boaz Dejene" src={avatar3} />
                                </AvatarGroup>
                            </Grid>
                        </Grid>
                        <Button onClick={()=>{
                            setSupportButton(!supportButton)
                            console.log(supportButton)
                        }} size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
                            {!supportButton ? "Need Help?" : "0911015526"}
                        </Button>
                    </Stack>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
