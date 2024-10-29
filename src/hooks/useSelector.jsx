import { useState, useRef, useCallback } from "react";

const initialState = {
  initialIndex: null,
  finalIndex: null,
};

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);

  const [shiftPressed, setShiftPressed] = useState(false);
  const [rowRange, setRowRange] = useState(initialState);
  const [columnRange, setColumnRange] = useState(initialState);

  const tableRef = useRef(null);

  const hasValue = (property) =>
    rowRange[property] == null && columnRange[property] == null ? true : false;

  const shiftDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const shiftUp = (e) => {
    if (e.key == "Shift") {
      setShiftPressed(false);
      setRowRange(initialState);
      setColumnRange(initialState);
    }
  };

  const clickTable = (e) => {
    if (!e.target.classList.contains("box-table") || !shiftPressed) return;

    console.log("matame");

    const box = e.target.id.split(",");
    const boxIndex = { rowId: box[0], columnId: box[1] };

    if (hasValue("initialIndex")) initialIndexTable(boxIndex);
    else finalIndexTable(boxIndex);
  };

  const initialIndexTable = (index) => {
    setColumnRange((prev) => ({ ...prev, initialIndex: index.columnId }));
    setRowRange((prev) => ({ ...prev, initialIndex: index.rowId }));
  };

  const finalIndexTable = (index) => {
    setColumnRange((prev) => ({ ...prev, finalIndex: index.columnId }));
    setRowRange((prev) => ({ ...prev, finalIndex: index.rowId }));

    console.log(rowRange.initialIndex, rowRange.finalIndex);
    if (hasValue("finalIndex")) createTable();
  };

  const createTable = () => {
    const selectedSectionTable = [];

    // console.log(workSheet.slice(rowRange.initialIndex, rowRange.finalIndex));
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
