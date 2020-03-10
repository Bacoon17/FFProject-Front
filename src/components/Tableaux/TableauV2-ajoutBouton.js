import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

// Data : Objets contenant les données du headers du tableau

const headCells = [
    { id: 'character', label: 'Character' },
    { id: 'episode', label: 'Episode' },
    { id: 'cristal', label: 'Cristal' },
    { id: 'weapon', label: 'Weapon' },
    { id: 'voice', label: 'Voice' },
    { id: 'options', label: '' },
];

function TableauV1(props) {

    return (
        <TableBody>
            {props.dataPerso.map(perso => (
                <TableRow key={perso.name}>
                    <TableCell component="th" scope="row">{perso.name}</TableCell>
                    <TableCell align="left">{perso.episode}</TableCell>
                    <TableCell align="left">{perso.cristal}</TableCell>
                    <TableCell align="left">{perso.weapon}</TableCell>
                    <TableCell align="left">{perso.voice}</TableCell>
                    <TableCell align="center">
                        <Button><EditRoundedIcon onClick={() => props.afficher(perso.id)}></EditRoundedIcon></Button>
                        <Button><DeleteRoundedIcon></DeleteRoundedIcon></Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

class RecuperationAPI extends Component {

    state = {
        personnage: [],
    }
    
    actionBoutonEditer = (id) => {
        console.log(id)
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
                <TableauV1 dataPerso={this.state.personnage} afficher={this.actionBoutonEditer}></TableauV1>
            </Table>
        )
    }
}

export default RecuperationAPI;