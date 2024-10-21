import { useState, useEffect, useRef, useCallback } from "react";

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

  useEffect(() => { }, [boxesRef, selectorRef]);

  const handlerSelectorSize = () => {
    const selector = selectorRef.current;
    const boxes = boxesRef.current;

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (
        box.left <= selector.right &&
        box.right >= selector.left &&
        box.top <= selector.bottom &&
        box.bottom >= selector.top
      ) {
        console.log(`${box.value}`);
      }
    }
  };

  const handlerColligindboxes = () => { };

  const registerSelectorRef = useCallback((selectorNode) => {
    if (selectorNode == null) return;

    const { top, right, bottom, left, x, y, width, height } =
      getElementsDimensions(selectorNode);

    selectorRef.current = { top, right, bottom, left, x, y, width, height };
  });

  const registerTableBoxesRef = useCallback((boxNode) => {
    if (boxNode == null) return;

    const { top, right, bottom, left, x, y, width, height } =
      getElementsDimensions(boxNode);
    const value = boxNode.innerText;

    boxesRef.current = [
      ...boxesRef.current,
      { top, right, bottom, left, x, y, width, height, value },
    ];
  });

  return {
    reg: { registerTableBoxesRef, registerSelectorRef },
    fn: { handlerSelectorSize, handlerBoxesPositions, handlerColligindboxes },
  };
};
