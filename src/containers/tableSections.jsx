import { Button } from "../components/common/button";

import { FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

const optionHeadExample = [
   { text: "Nombre" },
   { text: "Wod 1", click: "" },
   { text: "Wod 2A", click: "" },
   { text: "Wod 2B", click: "" },
   { text: "Wod 3", click: "" },
   { text: "Total", click: "" },
   { text: "Posicion final", click: "" },
];

export const TableHeader = () => (
   <thead className="w-full h-fit pb-2 border-b-2 border-gray-500">
      <tr className="flex w-full gap-2">
         {optionHeadExample.map((index, keys) => (
            <td className="w-full">
               <Button
                  key={keys}
                  text={index.text}
                  icon={index.click && <FaSortAmountDown />}
                  styleIcon="order-2"
                  styleButton="items-center gap-3 h-full text-lg font-montserrat font-bold text-gray-700 hover:text-gray-900"
               />
            </td>
         ))}
      </tr>
   </thead>
);

export const TableBody = () => (
   <tbody className="flex gap-2">
      <tr className="flex w-full gap-2">
         <td className="bg-red-200 w-full">Juan santiago</td>
         <td className="bg-red-200 w-full">iago</td>
         <td className="bg-red-200 w-full">iago</td>
         <td className="bg-red-200 w-full">iago</td>
         <td className="bg-red-200 w-full">iago</td>
         <td className="bg-red-200 w-full">iago</td>
         <td className="bg-red-200 w-full">iago</td>
      </tr>
   </tbody>
);
