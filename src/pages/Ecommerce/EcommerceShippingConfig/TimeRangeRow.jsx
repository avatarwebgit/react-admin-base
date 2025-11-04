import React from "react";
import { Button, FormFeedback } from "reactstrap";

const ClockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const TimeRangeRow = ({ index, time, onEdit, onRemove, error }) => {
  return (
    <li
      className="d-flex mb-2 align-items-center"
      style={{ maxWidth: "300px" }}
    >
      <div
        className={`d-flex align-items-center border rounded p-2 flex-grow-1 ${
          error ? "is-invalid" : ""
        }`}
      >
        <span className="flex-grow-1 text-center font-monospace">{time}</span>
        <Button
          type="button"
          color="light"
          className="btn-icon"
          onClick={() => onEdit(index)}
        >
          <ClockIcon />
        </Button>
      </div>
      <Button
        type="button"
        color="danger"
        className="ms-2 btn-icon"
        onClick={() => onRemove(index)}
      >
        &ndash;
      </Button>
      {error && <FormFeedback className="d-block">{error}</FormFeedback>}
    </li>
  );
};

export default TimeRangeRow;
