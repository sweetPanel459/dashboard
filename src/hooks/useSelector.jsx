import { useState, useEffect, useRef, useCallback } from "react";
import { TableHeader } from "../containers/tableSections";

const getElementsDimensions = (node) => {
  const { top, right, bottom, left, x, y, width, height } =
    node.getBoundingClientRect();

  return {
    top: Math.round(top),
    right: Math.round(right),
    bottom: Math.round(bottom),
    left: Math.round(left),
    width: Math.round(width),
    height: Math.round(height),
    x: Math.round(x),
    y: Math.round(y),
  };
};

export const useSelector = () => {
  const [collidingBoxes, setCollidingBoxes] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  useEffect(() => { }, [boxesRef, selectorRef, collidingBoxes]);

  const handlerSelectorSize = () => {
    const selector = selectorRef.current;
    const boxes = boxesRef.current;
    const collidingBoxes = [];

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (
        box.left <= selector.right &&
        box.right >= selector.left &&
        box.top <= selector.bottom &&
        box.bottom >= selector.top
      ) {
        console.log(
          "aqui va la logica para agrgar las casillas obtenidas al state",
        );
      }
    }
    handlerTableCreator();
  };

  const handlerTableCreator = () => {
    console.log(collidingBoxes);

    // NOTE:
    // - mejor mete las casillas colicionadas en el state
    // - ahora ya puedes crear una funcion que se encarge de hacer la tabla
    // - tomorrow cambias los nombre que no tienen sentido para su contenido
    // - antes verfica que si se guardaron bien las casillas
    // - imprime cada casilla
    // - la idea solo las colicionads
    // - porque se crea un bucle infinito
    // - al parecer hay tantas ya que la funcion se llama cada vez que hay una pulsacion
    // - ya pero, la primra no reincia el set
    // - podrias intentar con un array y guardar los datos obetnidos ahi, para ver si no se acumulan
  };

  const registerSelectorRef = useCallback((selectorNode) => {
    if (selectorNode == null) return;

    const { top, right, bottom, left } = getElementsDimensions(selectorNode);

    selectorRef.current = { top, right, bottom, left };
  });

  const registerTableBoxesRef = useCallback((boxNode, rowIndex) => {
    if (boxNode == null) return;

    const { top, right, bottom, left } = getElementsDimensions(boxNode);
    const value = boxNode.innerText;

    boxesRef.current = [
      ...boxesRef.current,
      { top, right, bottom, left, value, rowIndex },
    ];
  });

  return {
    reg: { registerTableBoxesRef, registerSelectorRef },
    fn: { handlerSelectorSize, handlerColligindboxes },
  };
};
