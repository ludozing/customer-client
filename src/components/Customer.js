import React from 'react';
import {TableRow, TableCell} from '@material-ui/core'

function Customer({data}) {
    return (
        <TableRow>
        <TableCell>{data.c_no}</TableCell>
        <TableCell>{data.c_name}</TableCell>
        <TableCell>{data.c_phone}</TableCell>
        <TableCell>{data.c_birthday}</TableCell>
        <TableCell>{data.c_gender}</TableCell>
        <TableCell>{data.c_addr}</TableCell>
        </TableRow>
    );
}

export default Customer;