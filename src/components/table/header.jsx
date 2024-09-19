import { Button } from "../common/button";

import { FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

const optionHeadExample = [
   { text: "Nombre" },
   { text: "Wod 1", click: "sant" },
   { text: "Wod 2A", click: "sant" },
   { text: "Wod 2B", click: "sant" },
   { text: "Wod 3", click: "sant" },
   { text: "Total", click: "sant" },
   { text: "Posicion final", click: "sant" },
];

export const TableHeader = () => (
   <thead className="flex w-full h-fit pb-3 border-b-2 border-gray-400">
      <tr className="flex justify-between items-center gap-2 w-full">
         {optionHeadExample.map((index, keys) => (
            <td className="flex items-center">
               <Button
                  key={keys}
                  text={index.text}
                  icon={index.click && <FaSortAmountDown />}
                  styleIcon="order-2"
                  styleButton="items-center gap-3 h-full text-lg font-montserrat font-semibold text-gray-700 hover:text-gray-900"
               />
            </td>
         ))}
      </tr>
   </thead>
);
