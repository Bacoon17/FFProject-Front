import React from 'react'
import MUIDataTable from "mui-datatables";
import { Component } from "react";

// Définition du header et des options du header du tableau d'affichage des personnages

const columns = [
    {
        name: "name",
        label: "Character",
        options: {
            filter: false,
            sort: true,
        }
    },
    {
        name: "episode",
        label: "Episode",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "cristal",
        label: "Cristal",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "weapon",
        label: "Weapon",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "voice",
        label: "Voice",
        options: {
            filter: false,
            sort: false,
        }
    },
];

const options = {
    filterType: 'checkbox',
};


class TableauPersonnages extends Component {

    state = {
        personnage: []
    }

    componentDidMount() {
        fetch('http://localhost:3001/characters/all')
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                this.setState({personnage: result})
            })
    }

    render() {
        return (
            <MUIDataTable
                title={"Personnages"}
                data={this.state.personnage}
                columns={columns}
                options={options}
            />
        )
    }
}

export default TableauPersonnages;
