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
  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  useEffect(() => { }, [boxesRef, selectorRef, selectorSize]);

  const handlerSelectorSize = () => {
    if (selectorRef.current == undefined) return;

    const { x, y, width, height } = selectorRef.current.getBoundingClientRect();
    setSelectorSize({ x, y, width, height });
  };

  const handlerBoxesPositions = () => { };

  const handlerColligindboxes = () => { };

  const registerSelectorRef = useCallback((selectorId) => {
    selectorRef.current = selectorId;
  });
  const registerTableBoxesRef = useCallback((boxId, boxPosition) => {
    if (boxPosition) boxesRef.current[boxId] = boxPosition;
  });
  console.log(boxesRef);

  return {
    reg: { registerTableBoxesRef, registerSelectorRef },
    fn: { handlerSelectorSize, handlerBoxesPositions, handlerColligindboxes },
  };
};
