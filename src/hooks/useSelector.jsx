import { useState, useRef, useEffect, useCallback } from "react";

// TODO :
// - mejoras en la ui para el formulario de subir la tabla
//    1. hacer un indicador visual para saber cual se selecciono
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

// NOTE:
// - al momento de oprimir el click en una casilla, se optiene su w,h,x,y luego cuando oprimas en la segunda casilla lo multiplicas por el numero de la casilla, en length
// - primero toca arreglar el error del selector de la tabla, que no esta reiniciando bien los valore

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);

  const [initialRange, setInitialRange] = useState({});
  const [finalRange, setFinalRange] = useState({});

  const tableRef = useRef(null);

  useEffect(() => {
    const shiftUp = (e) => {
      if (e.key == "Shift") {
        setShiftPressed(false);

        setInitialRange({});
        setFinalRange({});
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

    const box = e.target.id.split(",");
    const rowIndex = box[0];
    const columnIndex = box[1];

    if (Object.keys(initialRange).length === 0) {
      setInitialRange({ initialRow: rowIndex, initialColumn: columnIndex });
    } else {
      setFinalRange(() => {
        const updatedRange = {
          finalRow: rowIndex,
          finalColumn: columnIndex,
        };

        createTable(updatedRange);

        return updatedRange;
      });
    }
  };

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
