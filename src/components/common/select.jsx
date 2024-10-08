import { Text } from "./texts";
import { Button } from "./button";

import { IoIosArrowDown } from "react-icons/io";

export const Select = ({
   placeholder,
   styleContent,
   styleButton,
   dropdownActive,
}) => (
   <section className="relative w-fit h-fit">
      <div
         className={`${styleContent} flex justify-between items-center rounded gap-2`}
      >
         <Text text={placeholder} style="text-gray-400" />
         <Button icon={<IoIosArrowDown />} styleButton={styleButton} />
      </div>
      {dropdownActive && (
         <div className="absolute top-full flex flex-col gap-2 mt-2 p-1 rounded w-full h-fit border border-gray-400 bg-white">
            <Button
               text="10"
               styleButton="w-full px-1 rounded text-2xl text-white g-amber-500"
            />
         </div>
      )}
   </section>
);
