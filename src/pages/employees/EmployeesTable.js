import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, ToggleButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import NumberFormat from 'react-number-format';
import Dot from 'components/@extended/Dot';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';

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
        id: 'Employees Id.',
        align: 'left',
        disablePadding: false,
        label: 'Employees Id.'
    },
    {
        id: 'First Name',
        align: 'left',
        disablePadding: true,
        label: 'First Name'
    },
    {
        id: 'Last Name',
        align: 'left',
        disablePadding: true,
        label: 'Last Name'
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
        id: 'Age',
        align: 'right',
        disablePadding: false,
        label: 'Age'
    },    {
        id: 'Salary',
        align: 'right',
        disablePadding: false,
        label: 'Salary'
    },
    {
        id: 'Deactivate Employee',
        align: 'right',
        disablePadding: false,
        label: 'Deactivate Employee'
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

const OrderStatus = ({ active }) => {
    let color;
    let title;

    switch (active) {
        case true:
            color = 'success';
            title = 'active';
            break;
        default:
            color = 'primary';
            title = 'deactivated';
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

export default function OrderTable({employees, GetEmployees}) {
    const [disabled, setDisabled] = useState(false)

    const deactivateEmployee = (email, isActive) => {
        console.log(isActive)
        setDisabled(true)
        const query = `mutation MyQuery($email: String!, $isActive: Boolean!) {
            update_employee_by_pk(pk_columns: {email: $email}, _set: {isActive: $isActive}) {
              email
              isActive
            }
        }`
        
        axios.post("https://leheket-hilcoe-55.hasura.app/v1/graphql", JSON.stringify({
            query: query,
            variables: {email: email, isActive: isActive}
        }),{
            headers: {
                "x-hasura-admin-secret": "3YX812ege3703HRPFtdbdPRIEe0iRXuO6CE9buCsn1nEjGMSxKXJZTJUrHWZiZ1b",
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log(res.data);
            if(res.data?.data?.update_employee_by_pk) {
                if(res.data?.data?.update_employee_by_pk.isActive) {
                    toast.success("Employee Activated")
                } else if(!res.data?.data?.update_employee_by_pk.isActive) {
                    toast.success("Employee Deactivated")
                }
                GetEmployees()
            } else {
                toast.error("something went wrong")
            }
            setDisabled(false)
        }).catch((err) => {
            console.log(err)
            console.log(err?.response?.data)
            setDisabled(false)
            toast.error("something went wrong")
        })
    }
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    console.log(employees)
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
                        {stableSort(employees, getComparator(order, orderBy)).map((row, index) => {
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
                                    <TableCell align="left">{row.firstName}</TableCell>
                                    <TableCell align="left">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus active={row.isActive} />
                                    </TableCell>
                                    <TableCell align="right">{row.age}</TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.salary} displayType="text" thousandSeparator prefix="Br." />
                                    </TableCell>
                                    <TableCell align="right">
                                    <ToggleButton
                                        disabled={disabled}
                                        value="check"
                                        // selected={selected}
                                        onChange={() => {
                                            console.log(row.isActive)
                                            deactivateEmployee(row.email, row.isActive === true ? false : true)
                                        }}
                                    >
                                        {disabled ? <LoadingOutlined /> : !row.isActive ? <CheckCircleIcon color="success" /> : <CancelIcon color="disabled" />}
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
