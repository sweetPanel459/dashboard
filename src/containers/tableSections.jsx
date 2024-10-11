import { Text } from "../components/common/texts";
import { Button } from "../components/common/button";

import {
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaTrashAlt,
  FaPencilAlt,
  FaPlus,
} from "react-icons/fa";

const optionHeadExample = [
  { text: "Nombre" },
  { text: "Wod 1", click: "s" },
  { text: "Wod 2A", click: "s" },
  { text: "Wod 2B", click: "s" },
  { text: "Wod 3", click: "s" },
  { text: "Total", click: "s" },
  { text: "Posicion final", click: "s" },
];

export const TableHeader = ({ styleButton }) => (
  <tr className="flex w-full gap-2 py-2">
    {optionHeadExample.map((index, keys) => (
      <td className={`w-full ${styleButton}`}>
        <Button
          key={keys}
          text={index.text}
          icon={index.click && <FaSortAmountDown />}
          styleIcon="order-2 relative bottom-0.5 text-xl"
          styleButton="items-center justify-center w-full gap-3 h-full text-xl font-montserrat font-bold  hover:text-gray-900"
        />
      </td>
    ))}
    <EditRow state={false} />
  </tr>
);

export const TableRow = ({ style, styleColm, cellValues, click }) => (
  <tr className={`${style} flex items-center w-full gap-2 py-3 border-b`}>
    {cellValues.map((index, key) => (
      <td
        key={key}
        className={`${styleColm} relative right-1 text-center  w-full font-grotesk`}
      >
        {index}
      </td>
    ))}
    <EditRow clickEdit={click} />
  </tr>
);

const EditRow = ({ state = true, clickEdit }) => (
  <td className="flex items-center justify-center gap-2 h-7 min-w-20">
    {state ? (
      <>
        <Button
          icon={<FaPencilAlt />}
          styleButton="flex-grow items-center justify-center h-full rounded text-white bg-blue-400 hover:bg-blue-500"
          click={clickEdit}
        />
        <Button
          icon={<FaTrashAlt />}
          styleButton="flex-grow items-center justify-center h-full rounded text-white bg-red-400 hover:bg-red-500"
        />
      </>
    ) : (
      <Button
        icon={<FaPlus />}
        styleButton="items-center justify-center h-full px-2 rounded text-white bg-blue-400 hover:bg-blue-500"
      />
    )}
  </td>
);
