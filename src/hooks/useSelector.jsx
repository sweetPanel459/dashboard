import { useState, useRef, useCallback } from "react";

const defaultRange = { initialIndex: null, finalIndex: null };

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);

  const tableRef = useRef(null);
  const rowRange = useRef(defaultRange);
  const columnRange = useRef(defaultRange);

  const shiftDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const shiftUp = (e) => {
    if (e.key == "Shift") {
      setShiftPressed(false);
      setTable([]);

      rowRange.current.initialIndex = null;
      rowRange.current.finalIndex = null;

      columnRange.current.initialIndex = null;
      columnRange.current.finalIndex = null;
    }
  };

  const clickTable = (e) => {
    if (!e.target.classList.contains("box-table") || !shiftPressed) return;

    const box = e.target.id.split(",");
    const rowIndex = box[0];
    const columnIndex = box[1];

    if (!hasValue("initialIndex")) {
      addValue("initialIndex", rowIndex, columnIndex);
    } else if (hasValue("initialIndex")) {
      addValue("finalIndex", rowIndex, columnIndex);
      createTable();
    }
  };

  // NOTE: se volvio a bugear, indices erroneos
  const createTable = () => {
    const tableTemplate = [];
    const tableRows = sliceArray(
      workSheet,
      parseInt(rowRange.current.initialIndex),
      parseInt(rowRange.current.finalIndex),
    );

    tableRows.forEach((tableColumns) => {
      const tableSelected = sliceArray(
        tableColumns,
        parseInt(columnRange.current.initialIndex),
        parseInt(columnRange.current.finalIndex),
      );

      tableTemplate.push(tableSelected);
    });

    setTable(tableTemplate);
  };

  const hasValue = (property) =>
    rowRange.current[property] != null && columnRange.current[property] != null
      ? true
      : false;

  const addValue = (property, rowValue, columnValue) => {
    rowRange.current[property] = rowValue;
    columnRange.current[property] = columnValue;
  };

  const registerNodeTable = useCallback((node) => {
    if (!node) return;

    tableRef.current = node;
  });

  return {
    ref: { registerNodeTable },
    handler: { clickTable, shiftUp, shiftDown },
    values: table,
  };
};

const sliceArray = (array, initialIndex, finalIndex) => {
  return array.slice(initialIndex, finalIndex + 1);
};
