import { useState, useEffect, useRef, useCallback } from "react";

/*  NOTE::
 * - The selector function size will save the current size in the useRef
 * - The handlerposition function will evaluate whether the size or position of the selector is equal to the boxes
 * - Colliding Boxes will be responsible for storing colliding boxes within an array of sub-arrays, called box positions.
 *
 *  TODO :
 *
 * */

export const useSelector = () => {
  const [collidingBoxes, setCollidingBoxes] = useState([]);
  const [boxesPositions, setBoxesPositions] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const selectorRef = useRef(null);
  const boxesRef = useRef([]);

  useEffect(() => {}, [boxesRef, selectorRef, selectorSize]);

  const handlerSelectorSize = () => {
    if (selectorRef.current == null) return;
    const node = selectorRef.current.getBoundingClientRect();

    const x = Math.round(node.x);
    const y = Math.round(node.y);
    const width = Math.round(node.width);
    const height = Math.round(node.height);

    setSelectorSize({ x, y, width, height });
  };

  const handlerBoxesPositions = () => {};

  const handlerColligindboxes = () => {};

  const registerSelectorRef = useCallback((selectorId) => {
    selectorRef.current = selectorId;
  });

  const registerTableBoxesRef = useCallback((node) => {
    const valueNode = node.innerText;
    const { x, y, width, height } = node.getBoundingClientRect();

    console.log(x, y, width, height, valueNode);

    // boxesRef.current = [...boxesRef.current, node];
  });

  return {
    reg: { registerTableBoxesRef, registerSelectorRef },
    fn: { handlerSelectorSize, handlerBoxesPositions, handlerColligindboxes },
  };
};
