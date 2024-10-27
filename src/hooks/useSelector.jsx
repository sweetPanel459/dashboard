import { useState, useRef, useCallback } from "react";

export const useSelector = () => {
  const [table, setTable] = useState([]);
  const [selectorSize, setSelectorSize] = useState({});
  const [shiftPressed, setShiftPressed] = useState(false);
  const [clickPressed, setClickPressed] = useState(false);
  const [currentClickPosition, setCurrentClickPosition] = useState({});

  const selectorRef = useRef(undefined);
  const boxesRef = useRef([]);

  // NOTE:
  //  - el trabajo de un PROGRAMDOR es hacer la mejor soluciona a un problema en determinado contexto
  //  - en vez de constantemente saber la posicion del selector, podria hacer la tabla con un selector falso
  //  - dame ideas generales de la logica de este
  //  - 1. al momento de oprimir shift y click encima de una casilla esta se pondra de azul
  //  - 2. este se a;adira a un array, que dependiendo de su row id va a aplicarse en una fila u otra
  //  - que eliminarias del sistema actual
  //  - 1. podria eliminar el register de todos los casillas y en vez de eso, pongo un evento al padre que detecte que hijo estoy tocando
  //  - 2. la logica de colicion del selector
  //  - 3. el registro del selector
  //  - porque no empiezad de cero el custom hook
  //  - lo hare, igual tenemos git

  const handlerMouseDown = (e) => {
    setClickPressed(true);
    setCurrentClickPosition({ x: e.clientX, y: e.clientY });
  };

  const handlerMouseUp = () => {
    setClickPressed(false);
    setCurrentClickPosition({});
  };

  const handlerKeyDown = (e) => {
    if (e.key == "Shift") setShiftPressed(true);
  };

  const handlerkeyUp = (e) => {
    if (e.key == "Shift") setShiftPressed(false);
  };

  const handlerMouseMove = () => {
    if (!shiftPressed || !clickPressed) return;
    handlerSelectorSize();
  };

  const handlerSelectorSize = () => {
    const selector = selectorRef.current;
    const { x, y } = currentClickPosition;
    const { top, right, bottom, left } =
      selectorRef.current.getBoundingClientRect();

    // handlerCollidingBoxes();
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
    selectorRef.current = selectorNode;
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
    fn: {
      handlerSelectorSize,
      handlerkeyUp,
      handlerKeyDown,
      handlerMouseUp,
      handlerMouseDown,
      handlerMouseMove,
    },
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
