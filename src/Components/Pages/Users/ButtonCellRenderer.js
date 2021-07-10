import React from "react";
import { ICellRendererParams } from "ag-grid-community";

export default function ButtonCellRenderer(props: ICellRendererParams) {
  const { context } = props;

  return (
    <button
      onClick={() => {
        context.foo();
        context.bar();
      }}
    >
      Click
    </button>
  );
}
