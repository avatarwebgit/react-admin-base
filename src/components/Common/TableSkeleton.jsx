import React from "react";
import { Table } from "reactstrap";
import SkeletonLoader from "./SkeletonLoader";

const TableSkeleton = ({ columns = 5, rows = 5 }) => {
  const skeletonRows = Array.from({ length: rows });
  const skeletonCols = Array.from({ length: columns });

  return (
    <div className="table-responsive">
      <Table className="table table-bordered table-striped table-nowrap mb-0">
        <thead>
          <tr>
            {skeletonCols.map((_, i) => (
              <th key={i}>
                <SkeletonLoader height="20px" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {skeletonRows.map((_, i) => (
            <tr key={i}>
              {skeletonCols.map((_, j) => (
                <td key={j}>
                  <SkeletonLoader height="20px" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableSkeleton;
