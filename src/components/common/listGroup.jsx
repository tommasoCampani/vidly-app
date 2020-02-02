import React from "react";
import PropTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect
}) => {
  const allItems = [{ _id: 0, name: "Tutti" }, ...items];
  return (
    <ul className="list-group">
      {allItems.map(item => (
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
