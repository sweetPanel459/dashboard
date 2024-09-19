import { Button } from "../components/common/button";

import {
   FaSortAmountDown,
   FaSortAmountDownAlt,
   FaTrashAlt,
   FaPencilAlt,
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

export const TableHeader = () => (
   <tr className="flex w-full gap-2">
      {optionHeadExample.map((index, keys) => (
         <td className="w-full">
            <Button
               key={keys}
               text={index.text}
               icon={index.click && <FaSortAmountDown />}
               styleIcon="order-2"
               styleButton="items-center w-full gap-3 h-full text-lg font-montserrat font-bold text-gray-700 hover:text-gray-900"
            />
         </td>
      ))}
      <EditRow state={false} />
   </tr>
);

export const TableRow = () => (
   <tr className="flex items-center w-full gap-2 py-3 border-b border-gray-300">
      <td className="text-lg font-semibold w-full">Juan santiago</td>
      <td className=" w-full">1</td>
      <td className=" w-full">3</td>
      <td className=" w-full">1233</td>
      <td className=" w-full">123</td>
      <td className=" w-full">12</td>
      <td className=" w-full">10</td>
      <EditRow />
   </tr>
);

const EditRow = ({ state = true }) => (
   <td className="flex items-center justify-center gap-2 h-8 min-w-20">
      {state && (
         <>
            <Button
               icon={<FaPencilAlt />}
               styleButton="flex-grow items-center justify-center h-full rounded text-white bg-gray-500"
            />
            <Button
               icon={<FaTrashAlt />}
               styleButton="flex-grow items-center justify-center h-full rounded text-white bg-amber-500"
            />
         </>
      )}
   </td>
);
