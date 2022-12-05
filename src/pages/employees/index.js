import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Grid,
    Typography
} from '@mui/material';
import Employees from './EmployeesTable';
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

const DashboardDefault = () => {
    const [employees, setEmployees] = useState([]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalOrderedBooks, setTotalOrderedBooks] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalBooks, setTotalBooks] = useState(0);

    const GetEmployees = () => {
        const query = `query MyQuery {
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
            employee {
                age
                email
                firstName
                lastName
                password
                salary
                isActive
                id
            }
          }
          `

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
            if(res.data?.data?.employee) {
                setEmployees(res.data?.data?.employee)
                setTotalOrders(res.data?.data?.orders_aggregate?.aggregate?.count)
                setTotalOrderedBooks(res.data?.data?.orderedBooks_aggregate?.aggregate?.count)
                setTotalUsers(res.data?.data?.user_aggregate?.aggregate?.count)
                setTotalBooks(res.data?.data?.books_aggregate?.aggregate?.count)
            }
        }).catch((err) => {
            console.log(err)
            console.log(err.response?.data)
        })
    }

    useEffect(()=>{
        GetEmployees()
    },[])

    useEffect(()=>{
        console.log(employees)
    },[employees])

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ mb: -2.25 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Users" count={totalUsers} percentage={59.3} extra="35,000" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Orders" count={totalOrders} percentage={70.5} extra="8,900" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Ordered Books" count={totalOrderedBooks} percentage={27.4} isLoss color="warning" extra="1,943" />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce title="Total Books" count={totalBooks} percentage={27.4} isLoss color="warning" extra="20,395" />
            </Grid>
            <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />
            <Grid item xs={12} md={12} lg={12}>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Typography variant="h5">Employees</Typography>
                    </Grid>
                    <Grid item />
                </Grid>
                <MainCard sx={{ mt: 2 }} content={false}>
                    <Employees employees={employees} GetEmployees={GetEmployees} />
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default DashboardDefault;
