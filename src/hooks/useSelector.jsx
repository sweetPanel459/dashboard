import { useState, useRef, useCallback } from "react";

// NOTE:
// custom hook hara que podamos seleccionar la tabla de un worksheet de manera manual
// - flujo  logico
//  - principal
//    1. funcion que registre el nodo de la tabla
//    2. funcion que se llame al momento de oprimir en la tabla y continue si es alguna de las casillas
//    4. funciones para detectar si el shift y el click estan oprimidos
//    3. funcion que registre y organize en un array bidemencional las casillas obtenidas con su rowId
//
//
// - si tengo como objetivo si selecciono una casillas de la misma linea y selecciono de de la misma linea, deberia recorrer entre el rando de los valores que obtuve
// - como planeas solucionarlo? que haria un programador?
// - puedes obtener el array completo de la tabala
// - ahora, dependendiendo de la casillas que toque pudo obtengo su id de columan y su id de casilla
// - ahora que vas a hacer
// - podrias guardar en un staado los indices, un array bidemencional
// - envez de un array bidimencional, un objeto con 3 propiedaes, el indexStart, indexEnd y rowIndex
// - el primero para donde
//

export const useSelector = (workSheet) => {
  const [table, setTable] = useState([]);
  const [tableIndexRange, setTableIndexRange] = useState([]);
  const [shiftPressed, setShiftPressed] = useState(false);

  const tableRef = useRef(null);

  const shiftDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const shiftUp = (e) => {
    if (e.key == "Shift") setShiftPressed(false);
  };

  const clickTable = (e) => {
    if (!e.target.classList.contains("box-table") || !shiftPressed) return;

    createTable(e);
  };

  const createTable = (e) => {
    const box = e.target.id.split(",");
    const rowId = box[0];
    const boxId = box[1];

    // TODO:
    // - tableIndexRange va a tener 2 objetos, el primero el rango de las filas y el segundo el rango de columna
    // - hecho eso, crear la logica para la creacion de la tabla
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
