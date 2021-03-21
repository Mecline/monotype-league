import React from 'react';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import './theme.css';

class MatchTable extends React.Component {
    constructor() {
        super();
        this.state = {
        };
    }

    render() {
        const { orderedList } = this.props;

        return (
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableRow>
                            {orderedList.map((person, id) => (
                                id <= 7 &&
                                <TableCell style={{ height: '50px', width: '300px' }}>
                                    <Typography style={{ color: person.color }}>{person.name}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                        <TableRow>
                            {orderedList.map((person, id) => (
                                id > 7 &&
                                <TableCell style={{ height: '50px', width: '300px' }}>
                                    <Typography style={{ color: person.color }}>{person.name}</Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

export default MatchTable;