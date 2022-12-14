import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ToggleButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import NumberFormat from 'react-number-format';
import Dot from 'components/@extended/Dot';
import axios from 'axios';
import { toast } from 'react-toastify';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'Users Id.',
        align: 'left',
        disablePadding: false,
        label: 'Users Id.'
    },
    {
        id: 'Username',
        align: 'left',
        disablePadding: true,
        label: 'Username'
    },
    {
        id: 'Email',
        align: 'right',
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'Role',
        align: 'left',
        disablePadding: false,
        label: 'Role'
    },
    {
        id: 'Total Amount',
        align: 'right',
        disablePadding: false,
        label: 'Total Amount'
    },
    {
        id: 'Delete user',
        align: 'right',
        disablePadding: false,
        label: 'Delete user'
    }
];

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

const OrderStatus = ({ role }) => {
    let color;
    let title;

    switch (role) {
        case "user":
            color = 'success';
            title = 'User';
            break;
        case "admin":
            color = 'warning';
            title = 'Admin';
            break;
        default:
            color = 'primary';
            title = 'User';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

export default function OrderTable({users}) {
    const deleteUser = (id) => {
        const query = `mutation MyQuery($id: String!) {
            delete_user_by_pk(id: $id) {
                amount
                email
                image
                name
            }
        }`
        
        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
            variables: {id: id}
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data?.data?.delete_user_by_pk) {
                toast.success("User deleted")
            } else {
                toast.error("something went wrong")
            }
        }).catch((err) => {
            console.log(err)
            console.log(err?.response?.data)
            toast.error("something went wrong")
        })
    }
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    console.log(users)
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table
                    aria-labelledby="tableTitle"
                    sx={{
                        '& .MuiTableCell-root:first-child': {
                            pl: 2
                        },
                        '& .MuiTableCell-root:last-child': {
                            pr: 3
                        }
                    }}
                >
                    <OrderTableHead order={order} orderBy={orderBy} />
                    <TableBody>
                        {stableSort(users, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    // hover
                                    role="checkbox"
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                    key={row.id}
                                    selected={isItemSelected}
                                >
                                    <TableCell component="th" id={labelId} scope="row" align="left">
                                        <Link color="secondary" component={RouterLink} to="">
                                            {row.id.slice(0,8)}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus role={row.role} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.amount} displayType="text" thousandSeparator prefix="Br." />
                                    </TableCell>
                                    <TableCell align="right">
                                    <ToggleButton
                                        value="check"
                                        // selected={selected}
                                        onChange={() => {
                                            deleteUser(row.id)
                                        }}
                                    >
                                        <DeleteIcon />
                                    </ToggleButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
