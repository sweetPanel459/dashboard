import { useState, useRef, useEffect, useCallback } from "react";

// TODO :
// - Mas adelante
//    - drag and drop para soltar el archivo
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
// - busca el valor final de los inidice que obtienes

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
      setFinalRange({ finalRow: rowIndex, finalColumn: columnIndex });
    }

    if (
      Object.keys(initialRange).length !== 0 &&
      Object.keys(finalRange).length !== 0
    ) {
      createTable();
    }
  };

  const createTable = () => {
    const tableTemplate = [];

    const tableRows = sliceArray(
      workSheet,
      parseInt(initialRange.initialRow),
      parseInt(finalRange.finalRow),
    );

    tableRows.forEach((tableColumns) => {
      const tableSelected = sliceArray(
        tableColumns,
        parseInt(initialRange.initialColumn),
        parseInt(finalRange.finalColumn),
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
    table,
    handler: { clickOnBox },
    reference: { registerNodeTable },
  };
};

const sliceArray = (array, initialIndex, finalIndex) => {
  return array.slice(initialIndex, finalIndex + 1);
};
