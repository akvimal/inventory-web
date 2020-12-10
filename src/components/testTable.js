import React, { Component } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Rating } from "primereact/rating";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import ProductService from "../service/Service";
import "../demo.css";
// import "./DataTableDemo.css";

export class TestTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      expandedRows: null,
    };

    this.productService = new ProductService();
    this.amountBodyTemplate = this.amountBodyTemplate.bind(this);
    this.rowExpansionTemplate = this.rowExpansionTemplate.bind(this);
    this.searchBodyTemplate = this.searchBodyTemplate.bind(this);
    this.imageBodyTemplate = this.imageBodyTemplate.bind(this);
    this.priceBodyTemplate = this.priceBodyTemplate.bind(this);
    this.ratingBodyTemplate = this.ratingBodyTemplate.bind(this);
    this.statusBodyTemplate = this.statusBodyTemplate.bind(this);
    this.statusOrderBodyTemplate = this.statusOrderBodyTemplate.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onRowCollapse = this.onRowCollapse.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
  }

  componentDidMount() {
    this.productService
      .getProductsWithOrdersSmall()
      .then((data) => this.setState({ products: data }));
  }

  onRowExpand(event) {
    this.toast.show({
      severity: "info",
      summary: "Product Expanded",
      detail: event.data.name,
      life: 3000,
    });
  }

  onRowCollapse(event) {
    this.toast.show({
      severity: "success",
      summary: "Product Collapsed",
      detail: event.data.name,
      life: 3000,
    });
  }

  expandAll() {
    let expandedRows = {};
    this.state.products.forEach((p) => (expandedRows[`${p.id}`] = true));

    this.setState(
      {
        expandedRows,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Expanded",
          life: 3000,
        });
      }
    );
  }

  collapseAll() {
    this.setState(
      {
        expandedRows: null,
      },
      () => {
        this.toast.show({
          severity: "success",
          summary: "All Rows Collapsed",
          life: 3000,
        });
      }
    );
  }

  formatCurrency(value) {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }

  amountBodyTemplate(rowData) {
    return this.formatCurrency(rowData.amount);
  }

  statusOrderBodyTemplate(rowData) {
    return (
      <span className={`order-badge order-${rowData.status.toLowerCase()}`}>
        {rowData.status}
      </span>
    );
  }

  searchBodyTemplate() {
    return <Button icon="pi pi-search" />;
  }

  imageBodyTemplate(rowData) {
    return (
      <img
        src={`showcase/demo/images/product/${rowData.image}`}
        onError={(e) =>
          (e.target.src =
            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
        }
        alt={rowData.image}
        className="product-image"
      />
    );
  }

  priceBodyTemplate(rowData) {
    return this.formatCurrency(rowData.price);
  }

  ratingBodyTemplate(rowData) {
    return <Rating value={rowData.rating} readonly cancel={false} />;
  }

  statusBodyTemplate(rowData) {
    return (
      <span
        className={`product-badge status-${rowData.inventoryStatus.toLowerCase()}`}
      >
        {rowData.inventoryStatus}
      </span>
    );
  }

  rowExpansionTemplate(data) {
    return (
      <div className="orders-subtable">
        <DataTable value={data.orders}>
          <Column field="id" header="Id" sortable></Column>
          <Column field="customer" header="Customer" sortable></Column>
          <Column field="date" header="Date" sortable></Column>
          <Column
            field="amount"
            header="Amount"
            body={this.amountBodyTemplate}
            sortable
          ></Column>
          <Column
            field="status"
            header="Status"
            body={this.statusOrderBodyTemplate}
            sortable
          ></Column>
        </DataTable>
      </div>
    );
  }

  render() {
    const header = (
      <div className="table-header-container">
        <Button
          icon="pi pi-plus"
          label="Expand All"
          onClick={this.expandAll}
          className="p-mr-2"
        />
        <Button
          icon="pi pi-minus"
          label="Collapse All"
          onClick={this.collapseAll}
        />
      </div>
    );

    return (
      <div className="datatable-rowexpansion-demo">
        <Toast ref={(el) => (this.toast = el)} />

        <div className="card">
          <DataTable
            value={this.state.products}
            expandedRows={this.state.expandedRows}
            onRowToggle={(e) => this.setState({ expandedRows: e.data })}
            onRowExpand={this.onRowExpand}
            onRowCollapse={this.onRowCollapse}
            rowExpansionTemplate={this.rowExpansionTemplate}
            dataKey="id"
            header={header}
          >
            <Column field="name" header="Name" sortable />
            <Column
              field="price"
              header="Price"
              sortable
              body={this.priceBodyTemplate}
            />
            <Column field="category" header="Category" sortable />
            <Column
              field="rating"
              header="Reviews"
              sortable
              body={this.ratingBodyTemplate}
            />
            <Column
              field="inventoryStatus"
              header="Status"
              sortable
              body={this.statusBodyTemplate}
            />
            <Column expander style={{ width: "1em" }} />
          </DataTable>
        </div>
      </div>
    );
  }
}

export default TestTable;
