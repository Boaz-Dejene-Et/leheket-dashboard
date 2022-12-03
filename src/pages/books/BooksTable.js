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
        id: 'Book Id.',
        align: 'left',
        disablePadding: false,
        label: 'Book Id.'
    },
    {
        id: 'title',
        align: 'left',
        disablePadding: true,
        label: 'title'
    },
    {
        id: 'Email',
        align: 'left',
        disablePadding: false,
        label: 'Email'
    },
    {
        id: 'Link',
        align: 'right',
        disablePadding: false,
        label: 'Link'
    },
    {
        id: 'Sold',
        align: 'right',
        disablePadding: false,
        label: 'Sold'
    },
    {
        id: 'Role',
        align: 'left',
        disablePadding: false,
        label: 'Role'
    },
    {
        id: 'Price',
        align: 'right',
        disablePadding: false,
        label: 'Price'
    },
    {
        id: 'Edit Link',
        align: 'right',
        disablePadding: false,
        label: 'Edit Link'
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

const OrderStatus = ({ availability }) => {
    let color;
    let title;

    switch (availability) {
        case true:
            color = 'success';
            title = 'Available';
            break;
        default:
            color = 'warning';
            title = 'unavailable';
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

export default function OrderTable({books}) {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
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
                        {stableSort(books, getComparator(order, orderBy)).map((row, index) => {
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
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="left">{row.title}</TableCell>
                                    <TableCell align="right">
                                        <a style={{color: "#000"}} href={`${row.bookData}`} target="_blank">
                                            Link
                                        </a>
                                    </TableCell>
                                    <TableCell align="right">{row.sold}</TableCell>
                                    <TableCell align="left">
                                        <OrderStatus availability={row.availability} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <NumberFormat value={row.price} displayType="text" thousandSeparator prefix="Br." />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link style={{color: "#000"}} component={RouterLink} to={`edit-book/${row.id}`}>
                                            Edit Book
                                        </Link>
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
