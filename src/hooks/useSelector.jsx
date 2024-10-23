import { useState, useRef, useCallback, useEffect } from "react";

export const useSelector = () => {
  const [table, setTable] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const [shiftPressed, setShiftPressed] = useState(false);
  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  const handlerKeyDown = () => setShiftPressed(true);
  const handlerkeyUp = () => setShiftPressed(false);

  const handlerClikDown = (e) => {
    if (!shiftPressed) return;
    console.log("Hola");
  };

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
    fn: { handlerSelectorSize, handlerkeyUp, handlerKeyDown, handlerClikDown },
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
