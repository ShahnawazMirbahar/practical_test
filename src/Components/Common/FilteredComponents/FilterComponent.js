import React from "react";

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input
      id="search-input"
      type="text"
      placeholder="Filter"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
    <button id="search-clear-button" type="button" onClick={onClear}>
      X
    </button>
  </>
);
export default FilterComponent;
