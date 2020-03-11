import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';

// Data : Objets contenant les données du headers du tableau

const headCells = [
    { id: 'character', label: 'Character' },
    { id: 'episode', label: 'Episode' },
    { id: 'cristal', label: 'Cristal' },
    { id: 'weapon', label: 'Weapon' },
    { id: 'voice', label: 'Voice' }
];

/**
 * Boite de dialogue à la suppression d'un composant
 */
class BoiteDeDialogue extends Component {

    state = {
        open: false
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleCloseYes = () => {

        this.props.supprimer(this.props.dataPerso.id);

        this.setState({
            open: false
        })
    };

    handleCloseNo = () => {
        this.setState({
            open: false,
        })
    };

    render() {
        return (
            <>
                <Button onClick={this.handleClickOpen}>
                    <DeleteRoundedIcon></DeleteRoundedIcon>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Suppression"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {'Souhaitez-vous réellement supprimer ' + this.props.dataPerso.name + '?'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseYes} color="primary">Oui</Button>
                        <Button onClick={this.handleCloseNo} color="primary" >Non</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }
}

/**
 * Boite de dialogue à la création d'un personnage
 */
class BoiteDeDialogue2 extends Component {

    state = {
        open: false,
        name: "",
        episode: "",
        cristal: "",
        weapon: "",
        voice:""
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    handleValidate = evt => {       
        this.setState({
            open: false
        })
        evt.preventDefault();
    };

    change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state);
    }

    render() {
        return (
            <>
                <Button onClick={this.handleClickOpen}>
                    <AddCircleOutlineRoundedIcon></AddCircleOutlineRoundedIcon>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Ajout d'un personnage"}</DialogTitle>
                    <DialogContent>
                        <form style={{ width: 500 }} noValidate autoComplete="off" onSubmit={this.handleValidate}>
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="name" label="Personnage" variant="outlined" onChange={this.change}/><br/>
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="episode" label="Episode" variant="outlined" onChange={this.change}/><br/>
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="cristal" label="Cristal" variant="outlined" onChange={this.change}/><br/>
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="weapon" label="Weapon" variant="outlined" onChange={this.change}/><br/>
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="voice" label="Voice" variant="outlined" onChange={this.change}/><br/>
                            
                            <DialogActions>
                                <Button type='submit' color="primary">Valider</Button>
                            </DialogActions>
                            
                        </form>
                    </DialogContent>

                    
                </Dialog>
            </>
        )
    }
}

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
        const test = this.state.personnage.findIndex((element) => element.id === id);
        let persoTemp = this.state.personnage;
        persoTemp.splice(test, 1);
        this.setState(
            {
                personnage: persoTemp
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
                            <TableCell align="center"><BoiteDeDialogue2></BoiteDeDialogue2></TableCell>
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
                                    <BoiteDeDialogue dataPerso={perso} supprimer={() => this.supprimerLigne(perso.id)}></BoiteDeDialogue>
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