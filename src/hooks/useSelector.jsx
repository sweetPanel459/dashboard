import { useState, useRef, useCallback, useEffect } from "react";

export const useSelector = () => {
  const [table, setTable] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const [shiftPressed, setShiftPressed] = useState(false);

  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  const handlerKeyDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const handlerkeyUp = (e) => {
    if (e.key == "Shift") setShiftPressed(false);
  };

  const handlerMouseMove = (e) => {
    if (!shiftPressed) return;
    console.log(e);
  };

  // NOTE :
  //  - tienes dudas de las matematicas que necesitas implementar para la posicion del selector?
  //  - necesito obtener la posicion relativa del mouse, con respecto a su contendor
  //  - puedo llamar a la valariable selecotReft para con su classList style modificarlo
  //  - quiza sea mejor directamente desde la funcion
  //  - ahora, las matematicas, como haras para que quede estatico en el punto que se puso
  //  - lo que he pensado es hacer unas restas
  //  - restas de que
  //  - no se
  //  -
  //

  const handlerSelectorSize = () => {
    handlerCollidingBoxes();
  };

  const handlerCollidingBoxes = () => {
    const selector = selectorRef.current;
    const boxes = boxesRef.current;

    const currentCollidingBoxes = [];
    boxesRef.current = [];

    for (let i = 0; i < boxes.length; i++) {
      if (
        boxes[i].left <= selector.right &&
        boxes[i].right >= selector.left &&
        boxes[i].top <= selector.bottom &&
        boxes[i].bottom >= selector.top
      ) {
        const value = boxes[i].value;
        const index = boxes[i].index;

        currentCollidingBoxes.push({ value, index });
      }
    }

    handlerTableCreator(currentCollidingBoxes);
  };

  const handlerTableCreator = (collidingBoxes) => {
    const table = [];

    collidingBoxes.forEach((item) => {
      if (!table[item.index - 1]) table[item.index - 1] = [];

      table[item.index - 1].push(item.value);
    });

    setTable(table);
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
    const index = rowIndex + 1;

    boxesRef.current = [
      ...boxesRef.current,
      { top, right, bottom, left, value, index },
    ];
  });

  return {
    values: { table },
    reg: { registerTableBoxesRef, registerSelectorRef },
    fn: { handlerSelectorSize, handlerkeyUp, handlerKeyDown, handlerMouseMove },
  };
};

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
