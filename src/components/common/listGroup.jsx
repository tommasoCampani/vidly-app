import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={"li_" + item[valueProperty]}
          style={{ cursor: "pointer" }}
          className={
            item[valueProperty] === selectedItem[valueProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.object.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default ListGroup;
