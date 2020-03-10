import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

// Data : Objets contenant les données du headers du tableau

const headCells = [
    { id: 'character', label: 'Character' },
    { id: 'episode', label: 'Episode' },
    { id: 'cristal', label: 'Cristal' },
    { id: 'weapon', label: 'Weapon' },
    { id: 'voice', label: 'Voice' },
    { id: 'options', label: '' }
];

class TableauV1 extends Component {

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

    supprimerLigne = (id) => {
        console.log(id);
        const test = this.state.personnage.findIndex((element) => element.id === id);
        
        let persoTemp = this.state.personnage;
        persoTemp.splice(test, 1);
        console.log(persoTemp);
        this.setState(
            {
                personnage : persoTemp
            }
        )
    }

    render() {
        return (

            <div>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headCells.map(headCell => (
                                <TableCell key={headCell.id}>
                                    <TableSortLabel>{headCell.label}</TableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.personnage.map(perso => (
                            <TableRow key={perso.name}>
                                <TableCell component="th" scope="row">{perso.name}</TableCell>
                                <TableCell align="left">{perso.episode}</TableCell>
                                <TableCell align="left">{perso.cristal}</TableCell>
                                <TableCell align="left">{perso.weapon}</TableCell>
                                <TableCell align="left">{perso.voice}</TableCell>
                                <TableCell align="center">
                                    <Button><EditRoundedIcon></EditRoundedIcon></Button>
                                    <Button><DeleteRoundedIcon onClick={() => this.supprimerLigne(perso.id)}></DeleteRoundedIcon></Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        );
    }
}

export default TableauV1;