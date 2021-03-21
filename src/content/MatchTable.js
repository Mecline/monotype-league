import { Table, TableCell, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import './theme.css';

class MatchTable extends React.Component {

    render() {
        const { orderedList } = this.props;

        return (
            <div>
                <Table style={{ borderRadius: '5px' }}>
                    <TableRow>
                        {orderedList.map((person, id) => (
                            id <= 7 &&
                            <TableCell key={person.id} className="matchTable">
                                <Typography style={{ color: person.color }}>{person.name}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        {orderedList.map((person, id) => (
                            id > 7 &&
                            <TableCell key={person.id} className="matchTable">
                                <Typography style={{ color: person.color }}>{person.name}</Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </Table>
            </div>
        )
    }
}

export default MatchTable;