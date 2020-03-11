import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';

import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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
        voice: ""
    }

    // Ouvrir la fenetre de dialogue au click d'ajout
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    };

    // Fermer la fenetre de dialogue au click sur annuler
    handleClickCancel = () => {
        this.setState({
            open: false
        })
    };

    // Appeler la fonction qui va ajouter un personnage en BD et fermer la fenetre de dialogue
    handleValidate = evt => {
        this.setState({
            open: false
        })
        evt.preventDefault();
        this.addCharacter(this.state.name, this.state.episode, this.state.cristal, this.state.weapon, this.state.voice);
    };

    // Fonction permettant d'inscrire les données récupérées du formulaire en BD
    addCharacter(nom, episode, cristal, weapon, voice) {

        let json = {
            name: nom,
            episode: episode,
            cristal: cristal,
            weapon: weapon,
            voice: voice
        }
        let array = [];
        array.push(json);


        fetch('http://localhost:3001/characters/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(array)
        })
            // .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    // A chaque fois qu'un utilisateur tape qqch dans le formulaire, on enregistre la valeur dans le state
    change = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
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
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="name" label="Personnage" variant="outlined" onChange={this.change} /><br />
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="episode" label="Episode" variant="outlined" onChange={this.change} /><br />
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="cristal" label="Cristal" variant="outlined" onChange={this.change} /><br />
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="weapon" label="Weapon" variant="outlined" onChange={this.change} /><br />
                            <TextField style={{ width: 500, margin: 5, }} className="outlined-basic" id="voice" label="Voice" variant="outlined" onChange={this.change} /><br />
                            <DialogActions>
                                <Button autoFocus onClick={this.handleClickCancel} color="primary">Annuler</Button>
                                <Button type='submit' color="primary">Valider</Button>
                            </DialogActions>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

/**
 * Fonction des propriétés de pagination
 */
// Style CSS
const useStyles1 = makeStyles(theme => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const useStyles2 = makeStyles({
    table: {
        minWidth: 1200,
    },
});

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;

    // Fonction qui permet de retourner le numéro de la page du tableau suite à un évènement
    const handleFirstPageButtonClick = event => {
        onChangePage(event, 0);
    };

    // Fonction qui permet de retourner le numéro de la page du tableau suite à un évènement
    const handleBackButtonClick = event => {
        onChangePage(event, page - 1);
    };

    // Fonction qui permet de retourner le numéro de la page du tableau suite à un évènement
    const handleNextButtonClick = event => {
        onChangePage(event, page + 1);
    };

    // Fonction qui permet de retourner le numéro de la page du tableau suite à un évènement
    const handleLastPageButtonClick = event => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

// Vérification du type des variables et si leur présence est requise dans TablePaginationActions
TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

class TableauV1 extends Component {

    state = {
        personnage: [],
        page: 0,
        rowsPerPage: 10
    }

    // Récupérer au téléchargement de la page l'ensemble des données
    componentDidMount() {
        this.fetchData();
    }

    // Permet le rechargement des data lorsqu'on modifie la base de donnée
    componentDidUpdate(prevState) {
        if (prevState.personnage !== this.state.personnage) {
            this.fetchData();
        }
    }

    // Récupérer l'ensemble des données du tableau des personnages
    fetchData = () => {
        fetch('http://localhost:3001/characters/all')
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                this.setState({ personnage: result })
            })
    }

    // Suppression d'une ligne
    supprimerLigne = (id) => {
        fetch('http://localhost:3001/characters/delete/' + id, {method: 'delete'})
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }

    // ************************* Pagination ******************************

    // Fonction qui permet de connaitre le nombre de lignes vides à la dernière page
    emptyRows = () => {
        this.setState(
            {
                rowsPerPage: this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.personnage.length - this.state.page * this.state.rowsPerPage)
            }
        )
    }

    // Fonction qui permet d'afficher la bonne page du tableau
    handleChangePage = (event, newPage) => {
        this.setState(
            {
                page: newPage
            }
        )
    };

    // Fonction qui permet d'afficher le tableau selon le choix du nombre de lignes et repartir à la page principale
    handleChangeRowsPerPage = (event) => {
        this.setState(
            {
                rowsPerPage: parseInt(event.target.value, 10),
                page: 0
            }
        )
    };

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
                        {(this.state.rowsPerPage > 0 ? this.state.personnage.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage) : this.state.personnage).map(perso => (
                            <TableRow key={perso.name}>
                                <TableCell component="th" scope="row">{perso.name}</TableCell>
                                <TableCell align="left">{perso.episode}</TableCell>
                                <TableCell align="left">{perso.cristal}</TableCell>
                                <TableCell align="left">{perso.weapon}</TableCell>
                                <TableCell align="left">{perso.voice}</TableCell>
                                <TableCell align="center">
                                    {/* <Button><Link to={'/character/' + perso.id}><EditRoundedIcon></EditRoundedIcon></Link></Button> */}
                                    <Button><EditRoundedIcon></EditRoundedIcon></Button>
                                    <BoiteDeDialogue dataPerso={perso} supprimer={() => this.supprimerLigne(perso.id)}></BoiteDeDialogue>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'Tout', value: -1 }]}
                                colSpan={6}
                                count={this.state.personnage.length}
                                rowsPerPage={this.state.rowsPerPage}
                                page={this.state.page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}

                                // Affichage du label du nb de ligne par page
                                labelRowsPerPage='Lignes par page'
                                labelDisplayedRows={({ from, to, count }) => from + '-' + to + ' sur ' + count}
                            />
                        </TableRow>
                    </TableFooter>

                </Table>
            </div>

        );
    }
}

export default TableauV1;