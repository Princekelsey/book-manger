import React from "react";

export default function Spinner() {
  return (
    <div
      className="spinner-border text-danger"
      role="status"
      style={{
        margin: "auto",
        display: "block"
      }}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
