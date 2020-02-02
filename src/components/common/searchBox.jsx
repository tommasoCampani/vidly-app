import React from "react";
import Input from "./input";

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <Input
        name="search"
        value={value}
        type="text"
        placeholder="Cerca..."
        onChange={onChange}
      ></Input>
    </div>
  );
};

export default SearchBox;
