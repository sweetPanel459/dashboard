import { useState, useRef, useEffect, useCallback } from "react";

// TODO :
// - mejoras al hook useSelector
//    1. cambiar el evento a shift a uno general :check:
//    2. repasar el siclo de ejecucion de react y hacer optimizaciones :check
//    3. al momento de dejar de oprimir shift se guarde la tabla :check:
//    4. solucionar los problemas de indices :check:
// - mejoras en el custom hook uploadFile
//    1. refactorizar nombre
//    2. revisar si tiene mucha carga una funcion
// - mejoras en la ui para el formulario de subir la tabla
//    1. hacer las celdas mas bonitas
//    2. cambiar la ubicacion de los elementos
//    3. add boton para la confirmacion de la tabla
//    5. hacer un indicador visual para saber cual se selecciono
//    6. una barra de carga para cuando subas el archivo
//    7. un componente que contenga el nombre del archivo y su tipo de archivo y ademas un boton para eliminar
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

const defaultRange = { initialIndex: null, finalIndex: null };

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);

  const tableRef = useRef(null);
  const rowRange = useRef(defaultRange);
  const columnRange = useRef(defaultRange);

  useEffect(() => {
    const shiftUp = (e) => {
      if (e.key == "Shift") {
        setShiftPressed(false);

        rowRange.current.initialIndex = null;
        columnRange.current.initialIndex = null;

        rowRange.current.finalIndex = null;
        columnRange.current.finalIndex = null;
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

    if (!hasValue("initialIndex")) {
      addValue("initialIndex", rowIndex, columnIndex);
    } else if (hasValue("initialIndex")) {
      addValue("finalIndex", rowIndex, columnIndex);

      createTable();
    }
  };

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
    table,
    handler: { clickOnBox },
    reference: { registerNodeTable },
  };
};

const sliceArray = (array, initialIndex, finalIndex) => {
  return array.slice(initialIndex, finalIndex + 1);
};
