import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export default function DevicesTable({ rows, elements }) {

    const connectedAgents = elements.map((e) => e.ipv4);
    console.log(connectedAgents);


    return (
        <TableContainer style={{ minWidth: "800px" }}>
            <Table stickyHeader sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead >
                    <TableRow >
                        <StyledTableCell style={{ backgroundColor: '#1B203E', color: 'white' }}>Sr no</StyledTableCell>
                        <StyledTableCell style={{ backgroundColor: '#1B203E', color: 'white' }} align="right">IP Address</StyledTableCell>
                        <StyledTableCell style={{ backgroundColor: '#1B203E', color: 'white' }} align="right">MAC Address</StyledTableCell>
                        <StyledTableCell style={{ backgroundColor: '#1B203E', color: 'white' }} align="right">Agent Installed</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <StyledTableRow key={row.ip}>
                            <StyledTableCell align="right">{index + 1}</StyledTableCell>
                            <StyledTableCell align="right">{row.ip}</StyledTableCell>
                            <StyledTableCell align="right">{row.mac}</StyledTableCell>
                            <StyledTableCell align="right">
                                {
                                    connectedAgents.includes(row.ip) ? <CheckCircleIcon style={{ color: "green" }} /> : <CancelIcon style={{ color: "red" }} />
                                }
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
