import { useState, useRef, useEffect, useCallback } from "react";

// NOTE: react no actualiza inmediato el state, espera a terminar el renderizado y una vez eso puedes usar useEffect para utilizarlo

// TODO :
// - ui para la el registro de admin
//    1. crear el modal contendor
//    3. hacer 2 pasos para la confirm
//    2. tendra 3 inputs, name, gmail y el token enviado
//    4. hacer un componente para el header que sea un dropdown que contenga opciones sobre el usuario
// - logica para el registro de admin
//    1. confimar si el nombre si esta registrado
//    2. con una exprecion regular confirmar en el front y en el backend si el gmail es correcto
//    3. si es correcto registrarlo
//    4. apenas se registre guardarlo en el localstorage su registro y permanecerlo abierto mientras no lo cierre manualmente
// - custom hook para la preparcion del envio de la tabla
//    1. armar la estructura del hook
//    2. mediante el evento submit confirmar si todas las filas tengan la misma cantidad de indices
//    3. obtener el parametro de url para el user id
//

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);

  const [initialRange, setInitialRange] = useState({});
  const [finalRange, setFinalRange] = useState({});

  const [sizeSelector, setSizeSelector] = useState({});

  const tableRef = useRef(null);
  const selectedBoxRef = useRef(null);

  useEffect(() => {
    if (Object.keys(finalRange).length != 0) {
      const generatedTable = createTable(workSheet, initialRange, finalRange);
      const selectorPropertyes = selectorSize(initialRange, finalRange);

      console.log(selectorPropertyes);
      setTable(generatedTable);
    }
  }, [finalRange]);

  useEffect(() => {
    const shiftUp = (e) => {
      if (e.key == "Shift") {
        setShiftPressed(false);

        setInitialRange({});
        setFinalRange({});

        selectedBoxRef.current?.classList.remove("box-selected");
        selectedBoxRef.current = null;
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
      selectedBoxRef.current = element;
      selectedBoxRef.current.classList.add("box--selected");

      changeProperty(
        selectedBoxRef.current,
        "--width-selector",
        `${elementCoord.width}px`,
      );
      changeProperty(
        selectedBoxRef.current,
        "--height-selector",
        `${elementCoord.height}px`,
      );
      setInitialRange({ initialRow: currentRow, initialColumn: currentColumn });
    } else {
      setFinalRange({ finalRow: currentRow, finalColumn: currentColumn });
    }
  };

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
