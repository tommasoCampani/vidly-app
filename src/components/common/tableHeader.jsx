import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = path => {
    if (!path) return;
    const { sortColumn: propsSortCol, onSort } = this.props;
    const sortColumn = { ...propsSortCol };

    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    sessionStorage.setItem("sortTitle", sortColumn.path);
    sessionStorage.setItem("sortOrder", sortColumn.order);
    onSort(sortColumn);
  };

  renderSortIcon = column => {
    const { sortColumn } = this.props;

    if (column.path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    else return <i className="fa fa-sort-desc"></i>;
  };

  render() {
    const { columns, colIdProperty } = this.props;
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column[colIdProperty]}
              style={column.path ? { cursor: "pointer" } : null}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.title} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

TableHeader.defaultProps = {
  colIdProperty: "_id"
};

export default TableHeader;
