import { useState, useEffect, useRef, useCallback } from "react";

/*  NOTE::
 * - The selector function size will save the current size in the useRef
 * - The handlerposition function will evaluate whether the size or position of the selector is equal to the boxes
 * - Colliding Boxes will be responsible for storing colliding boxes within an array of sub-arrays, called box positions.
 *
 *  TODO :
 *
 * */

const getElementsDimensions = (node) => {
  const { x, y, width, height } = node.getBoundingClientRect();

  return {
    x: Math.round(x),
    y: Math.round(y),
    width: Math.round(width),
    height: Math.round(height),
  };
};

export const useSelector = () => {
  const [collidingBoxes, setCollidingBoxes] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  useEffect(() => {}, [boxesRef, selectorRef]);

  const handlerSelectorSize = () => {
    const selector = selectorRef.current;
    const boxes = boxesRef.current;

    for (let i = 0; i < boxes.length; index++) {
      //  NOTE :
      //   - aqui va a ir la logica si el selector hace colicion con alguna de las dimenciones de las cajas
      //
    }
  };

  const handlerBoxesPositions = () => {};

  const handlerColligindboxes = () => {};

  const registerSelectorRef = useCallback((selectorNode) => {
    if (selectorNode == null) return;

    const { x, y, width, height } = getElementsDimensions(selectorNode);

    selectorRef.current = { x, y, width, height };
  });

  const registerTableBoxesRef = useCallback((boxNode) => {
    if (boxNode == null) return;

    const { x, y, width, height } = getElementsDimensions(boxNode);
    const Value = boxNode.innerText;

    boxesRef.current = [...boxesRef.current, { x, y, width, height, Value }];
  });

  return {
    reg: { registerTableBoxesRef, registerSelectorRef },
    fn: { handlerSelectorSize, handlerBoxesPositions, handlerColligindboxes },
  };
};
