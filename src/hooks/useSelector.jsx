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

  const tableRef = useRef(null);
  const selectedBoxRef = useRef(null);

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

    const elementsCoorr = element.getBoundingClientRect();

    if (Object.keys(initialRange).length === 0) {
      selectedBoxRef.current = element;
      selectedBoxRef.current.classList.add("box-selected");

      selectedBoxRef.current.style.setProperty(
        "--width-selector",
        `${elementsCoorr.width}px`,
      );
      selectedBoxRef.current.style.setProperty(
        "--height-selector",
        `${elementsCoorr.height}px`,
      );

      setInitialRange({ initialRow: currentRow, initialColumn: currentColumn });
    } else {
      setFinalRange(() => {
        const updatedRange = {
          finalRow: currentRow,
          finalColumn: currentColumn,
        };

        createTable(updatedRange);

        return updatedRange;
      });
    }
  };

  const selectorSize = (endRange) => { };

  const createTable = (endRange) => {
    const tableTemplate = [];

    const selectedRows = workSheet.slice(
      parseInt(initialRange.initialRow),
      parseInt(endRange.finalRow) + 1,
    );

    selectedRows.forEach((tableColumns) => {
      const tableSelected = tableColumns.slice(
        parseInt(initialRange.initialColumn),
        parseInt(endRange.finalColumn) + 1,
      );

      tableTemplate.push(tableSelected);
    });

    setTable(tableTemplate);
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
