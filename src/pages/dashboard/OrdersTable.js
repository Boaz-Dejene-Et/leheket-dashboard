import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import NumberFormat from 'react-number-format';
import Dot from 'components/@extended/Dot';

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
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Tracking No.'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Product Name'
    },
    {
        id: 'fat',
        align: 'right',
        disablePadding: false,
        label: 'Total Order'
    },
    {
        id: 'carbs',
        align: 'left',
        disablePadding: false,
        label: 'Delivery'
    },
    {
        id: 'protein',
        align: 'right',
        disablePadding: false,
        label: 'Total Amount'
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

const OrderStatus = ({ deliveryOption }) => {
    let color;
    let title;

    switch (deliveryOption) {
        case "online":
            color = 'success';
            title = 'online';
            break;
        case 1:
            color = 'warning';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
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

export default function OrderTable({orderedBooks}) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    console.log(orderedBooks)
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
                        {stableSort(orderedBooks, getComparator(order, orderBy)).map((row, index) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <TableRow
                                    hover
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
                                    <TableCell align="left">{row.user?.name}</TableCell>
                                    <TableCell align="right">{row.totalBooks}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus deliveryOption={row.deliveryOption} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.amount} displayType="text" thousandSeparator prefix="Br." />
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
