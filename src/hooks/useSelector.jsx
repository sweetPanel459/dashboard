import { useState, useRef, useCallback } from "react";

// NOTE:
// - implementacion general
//    1. la tabla tenga un evento click donde detecte unicamente a las casillas -- tableRef
//    2. cuando oprima en uno va obtener el valor de este y dependiendo de su idRow se agrega dinamica mente a su fila y con el ref se modifica su estilo
//    3. si selecciona de la primera fila el idice 0 y luego de esa misma fila el idice 4 va a tomar tambien los indices entre el 0 y 5
//    4. lo mismo pero en el eje y, como un selector invisible
// - implementacion logica
//    1. al momento que se oprima en un hijo de la tabla, que se evalue si tiene la id||clase "box", de lo contrario retorna
//    2. evalua el indice de la casillas oprimida, obtienes su valor y lo agregas en un array bidimencional
//    3. si se escoje 2 o mas de una misma fila evaluar si hay indices entre estos dos para obtener su valores e indices y agregarlos respectivamente en su array
//    4. asi en cada fila, si el indice es diferente, crear un nuevo sub array, como un selecotr invicisble
// - flujo  logico
//    1. primero crea un register para el ref de la tabla
//

export const useSelector = () => {
  const [table, setTable] = useState([]);
  const tableRef = useRef(null);
};
