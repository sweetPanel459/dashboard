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
  const [collidingBoxes, setCollidingBoxes] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  const handlerSelectorSize = () => {
    const selector = selectorRef.current;
    const boxes = boxesRef.current;

    const currentCollidingBoxes = [];
    boxesRef.current = [];

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (
        box.left <= selector.right &&
        box.right >= selector.left &&
        box.top <= selector.bottom &&
        box.bottom >= selector.top
      ) {
        currentCollidingBoxes.push(box.value);
      }
    }

    setCollidingBoxes(currentCollidingBoxes);
  };

  //   TODO:
  //   -make the table be created with its respective rows and columns
  //   -change the function names so they are consistent with what they do
  //   -make the keyboard and mouse be detected
  //   -make the function so that the selector can be moved

  const handlerTableCreator = () => { };

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
    fn: { handlerSelectorSize, handlerTableCreator },
    values: { collidingBoxes, setCollidingBoxes },
  };
};
