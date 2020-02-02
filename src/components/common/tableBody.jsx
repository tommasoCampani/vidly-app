import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item[this.props.itemIdProperty] + "_" + (column.path || column._id);
  };

  render() {
    const { items, columns, itemIdProperty } = this.props;
    return (
      <tbody>
        {items.map(item => (
          <tr key={item[itemIdProperty]}>
            {columns.map(column => (
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

TableBody.defaultProps = {
  itemIdProperty: "_id"
};

export default TableBody;
