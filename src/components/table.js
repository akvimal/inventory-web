import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getClients } from '../middlewares/core';
import { connect } from 'react-redux'

class table extends Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [
                { customer_name: "Company 1", location: "BeaverCrick", status: "Installed", count: 20 },
                { customer_name: "Company 2", location: "Location 1", status: "Installed", count: 20 },
                { customer_name: "Company 3", location: "Location 1", status: "Available", count: 20 },
                { customer_name: "Company 4", location: "Location 1", status: "Bioclean", count: 20 },
                { customer_name: "Company 5", location: "Location 1", status: "Repair", count: 20 },
            ]
        };
    }

    componentDidMount() {
        this.props.getClients();
    }

    header = (data) => {
        return (
            <p className="table-data">{data.customer_name}</p>
        )

    }

    render() {
        return (
            <div >
                <div className="card tablecard">
                    <DataTable value={this.state.products}  >
                        <Column field="customer_name" header="Customer Name" ></Column>
                        <Column field="location" header="Location"></Column>
                        <Column field="status" header="Status"></Column>
                        <Column field="count" header="Count"></Column>
                    </DataTable>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getClients: () => dispatch(getClients()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(table)




