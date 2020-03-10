import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Data : Objets contenant les données du headers du tableau

const headCells = [
    { id: 'character', label: 'Character' },
    { id: 'episode', label: 'Episode' },
    { id: 'cristal', label: 'Cristal' },
    { id: 'weapon', label: 'Weapon' },
    { id: 'voice', label: 'Voice' },
];

class RecuperationAPI extends Component {

    state = {
        personnage: []
    }

    componentDidMount() {
        fetch('http://localhost:3001/characters/all')
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                this.setState({ personnage: result })
            })
    }

    render() {

        return (
            <TableBody>
                {this.state.personnage.map(perso => (
                    <TableRow key={perso.name}>
                        <TableCell component="th" scope="row">{perso.name}</TableCell>
                        <TableCell align="left">{perso.episode}</TableCell>
                        <TableCell align="left">{perso.cristal}</TableCell>
                        <TableCell align="left">{perso.weapon}</TableCell>
                        <TableCell align="left">{perso.voice}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        )
    }
}

export default function TableauV1() {

    return (
        <Table aria-label="simple table">
            <TableHead>
                <TableRow >
                    {headCells.map(headCell => (
                        <TableCell key={headCell.id}>
                            {headCell.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>

            <RecuperationAPI></RecuperationAPI>

        </Table>
    );
}