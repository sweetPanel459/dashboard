import { useState, useRef, useCallback } from "react";

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
  const [tableResult, setTableResult] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  //   TODO:
  //   -make the keyboard and mouse be detected
  //   -make the function so that the selector can be moved

  // logic to be able to move the selector
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

    setTableResult(table);
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
    fn: { handlerSelectorSize },
    reg: { registerTableBoxesRef, registerSelectorRef },
  };
};
