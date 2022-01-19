import React from 'react';
import { TableRow, TableCell } from '@material-ui/core'
import { Link } from 'react-router-dom'

function Customer({data}) {
    return (
        <TableRow>
        <TableCell>{data.c_no}</TableCell>
        <TableCell><Link to={`/customer/${data.c_no}`}>{data.c_name}</Link></TableCell>
        <TableCell>{data.c_phone}</TableCell>
        <TableCell>{data.c_birthday}</TableCell>
        <TableCell>{data.c_gender}</TableCell>
        <TableCell>{data.c_addr}</TableCell>
        </TableRow>
    );
}

export default Customer;