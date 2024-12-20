import { useState, useRef, useEffect, useCallback } from "react";

// NOTE: react no actualiza inmediato el state, espera a terminar el renderizado y una vez eso puedes usar useEffect para utilizarlo

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);

  const [initialRange, setInitialRange] = useState({});
  const [finalRange, setFinalRange] = useState({});

  const tableRef = useRef(null);
  const selectorRef = useRef(null);

  useEffect(() => {
    if (Object.keys(finalRange).length == 0) return;

    const generatedTable = createTable(workSheet, initialRange, finalRange);
    const selectorPropertyes = selectorSize(initialRange, finalRange);

    const isInvertedRow = selectorPropertyes.isInverted.rowIsInverted;
    const isInvertedColumn = selectorPropertyes.isInverted.columnIsInverted;

    const rowSize = selectorPropertyes.length.rowLength;
    const columnSize = selectorPropertyes.length.columnLength;

    // Aplicar el size del selector
    selectorRef.current.style.setProperty("--scale-w-factor", columnSize);
    selectorRef.current.style.setProperty("--scale-h-factor", rowSize);
    selectorRef.current.style.setProperty("--scale-h-extra", `${rowSize}px`);

    console.log(generatedTable, "tabla generada");
    invertedSelector(selectorRef.current, isInvertedRow, isInvertedColumn);
  }, [finalRange]);

  useEffect(() => {
    const shiftUp = (e) => {
      if (e.key == "Shift") {
        setShiftPressed(false);

        setInitialRange({});
        setFinalRange({});

        //mientras refactorizo el codigo
        selectorRef.current?.style.setProperty("--scale-w-factor", 1);
        selectorRef.current?.style.setProperty("--scale-h-factor", 1);
        selectorRef.current?.style.setProperty("--scale-h-extra", `0px`);

        selectorRef.current?.classList.remove("box-selected");
        selectorRef.current?.classList.remove(
          "inverted-row inverted-column inverted-both",
        );
        selectorRef.current = null;
      }
    };

    const shiftDown = (e) => {
      if (e.key == "Shift") {
        setShiftPressed(true);
        setTable([]);
      }
    };

    window.addEventListener("keydown", shiftDown);
    window.addEventListener("keyup", shiftUp);

    return () => {
      window.addEventListener("keydown", shiftDown);
      window.addEventListener("keyup", shiftUp);
    };
  }, []);

  const clickOnBox = (e) => {
    if (!e.target.classList.contains("box-table") || !shiftPressed) return;

    const element = e.target;

    const boxPosition = element.id.split(",");
    const currentRow = boxPosition[0];
    const currentColumn = boxPosition[1];

    const elementCoord = element.getBoundingClientRect();

    if (Object.keys(initialRange).length === 0) {
      selectorRef.current = element;
      selectorRef.current.classList.add("box-selected");

      selectorRef.current.style.setProperty(
        "--width-selector",
        `${elementCoord.width}px`,
      );
      selectorRef.current.style.setProperty(
        "--height-selector",
        `${elementCoord.height}px`,
      );

      setInitialRange({ initialRow: currentRow, initialColumn: currentColumn });
    } else {
      setFinalRange({ finalRow: currentRow, finalColumn: currentColumn });
    }
  }; // sacarlo de aqui pero despues de termianl la funcion

  const registerNodeTable = useCallback((node) => {
    if (!node) return;

    tableRef.current = node;
  });

  return {
    table,
    handler: { clickOnBox },
    reference: { registerNodeTable },
  };
};

const changeProperty = (node, property, newValue) => {
  node.style.setProperty(property, newValue);
};

const createTable = (workSheet, initialRange, finalRange) => {
  const tableTemplate = [];

  const selectedRows = workSheet.slice(
    parseInt(initialRange.initialRow),
    parseInt(finalRange.finalRow) + 1,
  );

  selectedRows.forEach((tableColumns) => {
    const tableSelected = tableColumns.slice(
      parseInt(initialRange.initialColumn),
      parseInt(finalRange.finalColumn) + 1,
    );

    tableTemplate.push(tableSelected);
  });

  return tableTemplate;
};

const selectorSize = (initialRange, finalRange) => {
  const result = {
    row: generateArray(initialRange.initialRow, finalRange.finalRow),
    column: generateArray(initialRange.initialColumn, finalRange.finalColumn),
  };

  const rowLength = result.row.array.length;
  const columnLength = result.column.array.length;

  const rowIsInverted = result.row.isInverted;
  const columnIsInverted = result.column.isInverted;

  return {
    isInverted: { rowIsInverted, columnIsInverted },
    length: { rowLength, columnLength },
  };
};

const generateArray = (initial, final) => {
  const array = [];
  const start = Math.min(initial, final);
  const end = Math.max(initial, final);

  let isInverted = false;

  for (let i = start; i <= end; i++) {
    array.push(i);
  }

  if (!(initial <= final)) isInverted = true;

  return { array, isInverted };
};

const invertedSelector = (node, isInvertedRow, isInvertedColumn) => {
  if (!node || !(node instanceof HTMLElement)) return;

  const classMap = {
    "inverted-row": isInvertedRow && !isInvertedColumn,
    "inverted-column": isInvertedColumn && !isInvertedRow,
    "inverted-both": isInvertedRow && isInvertedColumn,
  };

  Object.keys(classMap).forEach((className) =>
    node.classList.remove(className),
  );

  Object.entries(classMap)
    .filter(([_, shouldAdd]) => shouldAdd)
    .forEach(([className]) => node.classList.add(className));
};
