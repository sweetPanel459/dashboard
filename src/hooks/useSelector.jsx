import { useState, useRef, useCallback } from "react";

const initialState = {
  initialIndex: null,
  finalIndex: null,
};

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);

  const [shiftPressed, setShiftPressed] = useState(false);
  // const [rowRange, setRowRange] = useState(initialState);
  // const [columnRange, setColumnRange] = useState(initialState);

  const rowRange = useRef(initialState);
  const columnRange = useRef(initialState);

  const tableRef = useRef(null);

  const hasValue = (property) =>
    rowRange.current[property] != null && columnRange.current[property] != null
      ? true
      : false;

  const shiftDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const shiftUp = (e) => {
    if (e.key == "Shift") {
      setShiftPressed(false);

      // rowRange.current.initialIndex = null;
      // rowRange.current.finalIndex = null;
      //
      // columnRange.current.initialIndex = null;
      // columnRange.current.finalIndex = null;
    }
  };

  const clickTable = (e) => {
    if (!e.target.classList.contains("box-table") || !shiftPressed) return;

    const box = e.target.id.split(",");
    const boxIndex = { rowId: box[0], columnId: box[1] };

    if (!hasValue("initialIndex")) {
      rowRange.current.initialIndex = boxIndex.rowId;
      columnRange.current.initialIndex = boxIndex.columnId;
    } else {
      rowRange.current.finalIndex = boxIndex.rowId;
      columnRange.current.finalIndex = boxIndex.columnId;

      console.log(
        `row index original: ${boxIndex.rowId} current: ${rowRange.current.finalIndex}`,
      );

      // if (hasValue("finalIndex")) createTable();
    }
  };

  const createTable = () => {
    const row = rowRange.current;
    const column = columnRange.current;
  };

  const registerNodeTable = useCallback((node) => {
    if (!node) return;

    tableRef.current = node;
  });

  return {
    ref: { registerNodeTable },
    handler: { clickTable, shiftUp, shiftDown },
  };
};
