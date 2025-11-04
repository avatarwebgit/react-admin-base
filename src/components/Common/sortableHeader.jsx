import React from "react";

const SortableHeader = ({ columnKey, label, requestSort, sortConfig }) => {
  const getClassNames = () => {
    if (!sortConfig) return "";
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? "sort-asc" : "sort-desc";
    }
    return "";
  };

  return (
    <th
      scope="col"
      className={`text-center sortable ${getClassNames()}`}
      onClick={() => requestSort(columnKey)}
      style={{ cursor: "pointer" }}
    >
      {label}{" "}
      {sortConfig.key === columnKey && (
        <span>{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
      )}
    </th>
  );
};

export default SortableHeader;
