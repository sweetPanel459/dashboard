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

  useEffect(() => { }, [boxesRef, selectorRef]);

  const handlerSelectorSize = () => {
    const selector = selectorRef.current;
    const boxes = boxesRef.current;
    const table = [];

    for (let i = 0; i < boxes.length; i++) {
      const box = boxes[i];
      if (
        box.left <= selector.right &&
        box.right >= selector.left &&
        box.top <= selector.bottom &&
        box.bottom >= selector.top
      ) {
        setCollidingBoxes((prev) => [...prev, box]);
      }
    }
  };

  const handlerColligindboxes = () => {
    // NOTE:
    // - mejor mete las casillas colicionadas en el state
    // - ahora ya puedes crear una funcion que se encarge de hacer la tabla
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
