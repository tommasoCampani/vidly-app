import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({
  items,
  columns,
  sortColumn,
  colIdProperty,
  itemIdProperty,
  onSort
}) => {
  return (
    <table className="table table-condensed">
      <TableHeader
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
        colIdProperty={colIdProperty}
      />
      <TableBody
        items={items}
        columns={columns}
        itemIdProperty={itemIdProperty}
      />
    </table>
  );
};

Table.defaultProps = {
  itemIdProperty: "_id",
  colIdProperty: "_id"
};

export default Table;
