import { useState, useRef, useCallback } from "react";

// TODO: refactor code

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);

  const [shiftPressed, setShiftPressed] = useState(false);

  const initialRow = useRef(null);
  const initialcolumn = useRef(null);

  const finalRow = useRef(null);
  const finalcolumn = useRef(null);

  const tableRef = useRef(null);

  const shiftDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const shiftUp = (e) => {
    if (e.key == "Shift") {
      setShiftPressed(false);
      setTable([]);

      initialRow.current = null;
      finalRow.current = null;

      initialcolumn.current = null;
      finalcolumn.current = null;
    }
  };

  const sliceArray = (array, initialIndex, finalIndex) => {
    return array.slice(initialIndex, finalIndex + 1);
  };

  const clickTable = (e) => {
    if (!e.target.classList.contains("box-table") || !shiftPressed) return;

    const box = e.target.id.split(",");
    const boxIndex = { rowId: box[0], columnId: box[1] };

    if (initialRow.current == null && initialcolumn.current == null) {
      initialRow.current = boxIndex.rowId;
      initialcolumn.current = boxIndex.columnId;
    } else {
      finalRow.current = boxIndex.rowId;
      finalcolumn.current = boxIndex.columnId;

      const slice = sliceArray(
        workSheet,
        parseInt(initialRow.current),
        parseInt(finalRow.current),
      );

      slice.forEach((element) => {
        const finalCol = parseInt(finalcolumn.current);
        const tableSelected = element.slice(
          initialcolumn.current,
          finalCol + 1,
        );

        setTable((prev) => [...prev, tableSelected]);
      });
    }
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
